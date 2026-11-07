import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { doc, getDoc, setDoc, getDocs, collection, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const IWL_ADDRESS_COLLECTION = 'iwl_certificate_addresses';
export const IWL_SUBMISSIONS_MIRROR = 'iwl_submissions';
const ORIG_CSV_PATH = path.join(process.cwd(), 'public', 'iwl certificate 599 - Sheet9 (1).csv');

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Operation timed out')), ms)
    ),
  ]);
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function cleanField(val: string | undefined): string {
  if (!val) return '';
  return val.replace(/^"+|"+$/g, '').trim();
}

export interface CsvCustomerRecord {
  orderId: string;
  referenceId: string;
  name: string;
  phone: string; // e.g., 919437333467
  cleanPhone: string; // 10 digit
  email: string;
  amount: string;
}

function loadCsvCustomers(): CsvCustomerRecord[] {
  if (!fs.existsSync(ORIG_CSV_PATH)) {
    return [];
  }
  const content = fs.readFileSync(ORIG_CSV_PATH, 'utf-8');
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);

  const records: CsvCustomerRecord[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 6) continue;
    const rawPhone = cleanField(cols[3]).replace(/\D/g, '');
    const cleanPhone = rawPhone.replace(/^91/, '').slice(-10);

    records.push({
      orderId: cleanField(cols[0]),
      referenceId: cleanField(cols[1]),
      name: cleanField(cols[2]),
      phone: cleanField(cols[3]),
      cleanPhone,
      email: cleanField(cols[4]),
      amount: cleanField(cols[5]) || '599',
    });
  }
  return records;
}

async function fetchSavedAddressFromFirebase(cleanPhone: string): Promise<any | null> {
  const mirrorDocId = `iwl599_addr_${cleanPhone}`;
  // Check both iwl_certificate_addresses and iwl_submissions mirror concurrently
  const [resPrimary, resMirror] = await Promise.allSettled([
    withTimeout(getDoc(doc(db, IWL_ADDRESS_COLLECTION, cleanInputSafe(cleanPhone))), 2500),
    withTimeout(getDoc(doc(db, IWL_SUBMISSIONS_MIRROR, mirrorDocId)), 2500),
  ]);

  if (resPrimary.status === 'fulfilled' && resPrimary.value.exists()) {
    return resPrimary.value.data();
  }
  if (resMirror.status === 'fulfilled' && resMirror.value.exists()) {
    return resMirror.value.data();
  }
  return null;
}

function cleanInputSafe(val: string): string {
  return String(val).replace(/\D/g, '').replace(/^91/, '').slice(-10);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phoneParam = searchParams.get('phone');
    const action = searchParams.get('action');

    const csvRecords = loadCsvCustomers();

    // Admin helper to view all saved Firebase documents merged with the CSV
    if (action === 'all') {
      const firebaseRecords: Record<string, any> = {};
      const [snapPrimary, snapMirror] = await Promise.allSettled([
        withTimeout(getDocs(collection(db, IWL_ADDRESS_COLLECTION)), 3500),
        withTimeout(
          getDocs(
            query(
              collection(db, IWL_SUBMISSIONS_MIRROR),
              where('type', '==', 'iwl_599_certificate_address')
            )
          ),
          3500
        ),
      ]);

      if (snapMirror.status === 'fulfilled') {
        snapMirror.value.forEach((d) => {
          const data = d.data();
          if (data.phone) firebaseRecords[data.phone] = data;
        });
      }
      if (snapPrimary.status === 'fulfilled') {
        snapPrimary.value.forEach((d) => {
          const data = d.data();
          firebaseRecords[d.id] = data;
        });
      }

      const merged = csvRecords.map((r) => {
        const saved = firebaseRecords[r.cleanPhone];
        return {
          ...r,
          address: saved?.address || '',
          city: saved?.city || '',
          state: saved?.state || '',
          pincode: saved?.pincode || '',
          status: saved?.status || 'Pending',
          updatedAt: saved?.updatedAt || '',
        };
      });
      return NextResponse.json({
        collection: IWL_ADDRESS_COLLECTION,
        totalOrders: merged.length,
        submittedCount: merged.filter((m) => m.status === 'Completed').length,
        records: merged,
      });
    }

    if (!phoneParam) {
      return NextResponse.json({ error: 'Please provide a 10-digit phone number' }, { status: 400 });
    }

    const cleanInput = cleanInputSafe(phoneParam);
    if (cleanInput.length !== 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit phone number' }, { status: 400 });
    }

    // Verify against the CSV file (adding 91 prefix)
    const targetWith91 = `91${cleanInput}`;
    const found = csvRecords.find(
      (r) => r.phone.replace(/\D/g, '') === targetWith91 || r.cleanPhone === cleanInput
    );

    if (!found) {
      return NextResponse.json(
        {
          verified: false,
          error: `No ₹599 IWL Certificate order found linked to +91 ${cleanInput}.`,
        },
        { status: 404 }
      );
    }

    // Check if already saved in Firebase
    const savedDoc = await fetchSavedAddressFromFirebase(cleanInput);
    const alreadySubmitted = Boolean(
      savedDoc && savedDoc.address && String(savedDoc.address).trim().length > 0
    );

    return NextResponse.json({
      verified: true,
      alreadySubmitted,
      customer: {
        orderId: found.orderId,
        referenceId: found.referenceId,
        name: savedDoc?.name || found.name,
        phone: cleanInput,
        fullPhone: found.phone,
        email: found.email,
        amount: found.amount,
        address: savedDoc?.address || '',
        city: savedDoc?.city || '',
        state: savedDoc?.state || '',
        pincode: savedDoc?.pincode || '',
        updatedAt: savedDoc?.updatedAt || '',
      },
    });
  } catch (error: any) {
    console.error('Error in GET /api/iwl/address:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, name, address, city, state, pincode } = body;

    if (!phone || !name || !address || !state || !pincode) {
      return NextResponse.json(
        { error: 'All address fields (Name, Phone, Address, State, Pincode) are required.' },
        { status: 400 }
      );
    }

    const cleanInput = cleanInputSafe(phone);
    const targetWith91 = `91${cleanInput}`;

    // Verify customer exists in the CSV file
    const csvRecords = loadCsvCustomers();
    const found = csvRecords.find(
      (r) => r.phone.replace(/\D/g, '') === targetWith91 || r.cleanPhone === cleanInput
    );

    if (!found) {
      return NextResponse.json(
        { error: 'Phone number not found in verified order records.' },
        { status: 404 }
      );
    }

    // Check if already submitted in Firebase
    const existingData = await fetchSavedAddressFromFirebase(cleanInput);
    if (existingData && existingData.address && String(existingData.address).trim().length > 0) {
      return NextResponse.json(
        {
          error: 'Your shipping address has already been recorded and locked. Multiple submissions are not allowed.',
          alreadySubmitted: true,
          customer: existingData,
        },
        { status: 409 }
      );
    }

    const nowISO = new Date().toISOString();
    const mirrorDocId = `iwl599_addr_${cleanInput}`;

    const payload = {
      orderId: found.orderId,
      referenceId: found.referenceId,
      name: String(name).trim() || found.name,
      originalCsvName: found.name,
      phone: cleanInput,
      fullPhone: found.phone,
      email: found.email,
      amount: Number(found.amount) || 599,
      address: String(address).trim(),
      city: String(city || '').trim(),
      state: String(state).trim(),
      pincode: String(pincode).trim(),
      status: 'Completed',
      type: 'iwl_599_certificate_address',
      updatedAt: nowISO,
      submittedAt: serverTimestamp(),
    };

    // Save to both `iwl_certificate_addresses` and mirror to `iwl_submissions` (`iwl599_addr_<phone>`)
    const results = await Promise.allSettled([
      withTimeout(setDoc(doc(db, IWL_ADDRESS_COLLECTION, cleanInput), payload), 3000),
      withTimeout(setDoc(doc(db, IWL_SUBMISSIONS_MIRROR, mirrorDocId), payload), 3000),
    ]);

    const anySucceeded = results.some((r) => r.status === 'fulfilled');
    if (!anySucceeded) {
      throw new Error('Could not write to Firebase Firestore.');
    }

    return NextResponse.json({
      success: true,
      collection: IWL_ADDRESS_COLLECTION,
      message: 'Your shipping address has been successfully saved to Firebase!',
      customer: {
        orderId: payload.orderId,
        referenceId: payload.referenceId,
        name: payload.name,
        phone: payload.phone,
        fullPhone: payload.fullPhone,
        email: payload.email,
        amount: String(payload.amount),
        address: payload.address,
        city: payload.city,
        state: payload.state,
        pincode: payload.pincode,
        updatedAt: payload.updatedAt,
      },
    });
  } catch (error: any) {
    console.error('Error in POST /api/iwl/address:', error);
    return NextResponse.json({ error: 'Failed to save address to Firebase. Please try again.' }, { status: 500 });
  }
}
