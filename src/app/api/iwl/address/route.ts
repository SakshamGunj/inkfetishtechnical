import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ORIG_CSV_PATH = path.join(process.cwd(), 'public', 'iwl certificate 599 - Sheet9 (1).csv');
const DUP_CSV_PATH = path.join(process.cwd(), 'public', 'iwl_certificate_599_addresses.csv');

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' && line[i + 1] === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function escapeCSVField(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/\r?\n/g, ' ').replace(/^"+|"+$/g, '').trim();
  if (str.length === 0) return '""';
  if (str.includes(',') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function ensureDuplicateCSVExists() {
  if (!fs.existsSync(DUP_CSV_PATH) && fs.existsSync(ORIG_CSV_PATH)) {
    const content = fs.readFileSync(ORIG_CSV_PATH, 'utf-8');
    const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const newLines = lines.map((line, idx) => {
      if (idx === 0) {
        return `${line},Full Address,City,State,Pincode,Address Status,Updated At`;
      }
      return `${line},"","","","","Pending",""`;
    });
    try {
      fs.writeFileSync(DUP_CSV_PATH, newLines.join('\n'), 'utf-8');
    } catch (e) {
      console.error('Could not write duplicate CSV on init:', e);
    }
  }
}

export interface AddressRecord {
  orderId: string;
  referenceId: string;
  name: string;
  phone: string; // e.g., 919437333467
  cleanPhone: string; // 10 digit
  email: string;
  amount: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: string; // 'Pending' | 'Completed'
  updatedAt: string;
}

function loadRecords(): AddressRecord[] {
  ensureDuplicateCSVExists();
  const targetPath = fs.existsSync(DUP_CSV_PATH) ? DUP_CSV_PATH : ORIG_CSV_PATH;
  const content = fs.readFileSync(targetPath, 'utf-8');
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);

  const records: AddressRecord[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 6) continue;
    const rawPhone = (cols[3] || '').replace(/\D/g, '');
    const cleanPhone = rawPhone.replace(/^91/, '').slice(-10);

    records.push({
      orderId: cols[0] || '',
      referenceId: cols[1] || '',
      name: cols[2] || '',
      phone: cols[3] || '',
      cleanPhone,
      email: cols[4] || '',
      amount: cols[5] || '599',
      address: cols[6] || '',
      city: cols[7] || '',
      state: cols[8] || '',
      pincode: cols[9] || '',
      status: cols[10] || 'Pending',
      updatedAt: cols[11] || '',
    });
  }
  return records;
}

function saveRecordsToCSV(records: AddressRecord[]) {
  const header =
    'Order Id,Reference Id,Customer Name,Customer Phone,Customer Email,Amount,Full Address,City,State,Pincode,Address Status,Updated At';
  const rows = records.map((r) =>
    [
      r.orderId,
      r.referenceId,
      r.name,
      r.phone,
      r.email,
      r.amount,
      escapeCSVField(r.address),
      escapeCSVField(r.city),
      escapeCSVField(r.state),
      escapeCSVField(r.pincode),
      escapeCSVField(r.status),
      escapeCSVField(r.updatedAt),
    ].join(',')
  );

  try {
    fs.writeFileSync(DUP_CSV_PATH, [header, ...rows].join('\n'), 'utf-8');
  } catch (err) {
    console.warn('Filesystem write warning:', err);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phoneParam = searchParams.get('phone');
    const action = searchParams.get('action');

    const records = loadRecords();

    if (action === 'download_csv') {
      const header =
        'Order Id,Reference Id,Customer Name,Customer Phone,Customer Email,Amount,Full Address,City,State,Pincode,Address Status,Updated At';
      const rows = records.map((r) =>
        [
          r.orderId,
          r.referenceId,
          r.name,
          r.phone,
          r.email,
          r.amount,
          escapeCSVField(r.address),
          escapeCSVField(r.city),
          escapeCSVField(r.state),
          escapeCSVField(r.pincode),
          escapeCSVField(r.status),
          escapeCSVField(r.updatedAt),
        ].join(',')
      );
      const csvContent = [header, ...rows].join('\n');
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="iwl_certificate_599_addresses.csv"',
        },
      });
    }

    if (action === 'all') {
      return NextResponse.json({ records });
    }

    if (!phoneParam) {
      return NextResponse.json({ error: 'Please provide a 10-digit phone number' }, { status: 400 });
    }

    const cleanInput = phoneParam.replace(/\D/g, '').replace(/^91/, '').slice(-10);
    if (cleanInput.length !== 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit phone number' }, { status: 400 });
    }

    const targetWith91 = `91${cleanInput}`;
    const found = records.find(
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

    const alreadySubmitted = Boolean(
      found.status === 'Completed' && found.address && found.address.trim().length > 0
    );

    return NextResponse.json({
      verified: true,
      alreadySubmitted,
      customer: {
        orderId: found.orderId,
        referenceId: found.referenceId,
        name: found.name,
        phone: cleanInput,
        fullPhone: found.phone,
        email: found.email,
        amount: found.amount,
        address: found.address,
        city: found.city,
        state: found.state,
        pincode: found.pincode,
        updatedAt: found.updatedAt,
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

    const cleanInput = String(phone).replace(/\D/g, '').replace(/^91/, '').slice(-10);
    const targetWith91 = `91${cleanInput}`;

    const records = loadRecords();
    const idx = records.findIndex(
      (r) => r.phone.replace(/\D/g, '') === targetWith91 || r.cleanPhone === cleanInput
    );

    if (idx === -1) {
      return NextResponse.json(
        { error: 'Phone number not found in verified order records.' },
        { status: 404 }
      );
    }

    const existing = records[idx];
    if (existing.status === 'Completed' && existing.address && existing.address.trim().length > 0) {
      return NextResponse.json(
        {
          error: 'Your shipping address has already been recorded and locked. Multiple submissions are not allowed.',
          alreadySubmitted: true,
          customer: {
            ...existing,
            phone: cleanInput,
            fullPhone: existing.phone,
          },
        },
        { status: 409 }
      );
    }

    const nowISO = new Date().toISOString();

    records[idx] = {
      ...existing,
      name: String(name).trim() || existing.name,
      address: String(address).trim(),
      city: String(city || '').trim(),
      state: String(state).trim(),
      pincode: String(pincode).trim(),
      status: 'Completed',
      updatedAt: nowISO,
    };

    // Save directly to duplicate CSV file in public/iwl_certificate_599_addresses.csv
    saveRecordsToCSV(records);

    return NextResponse.json({
      success: true,
      message: 'Your shipping address has been successfully recorded!',
      customer: {
        orderId: records[idx].orderId,
        referenceId: records[idx].referenceId,
        name: records[idx].name,
        phone: cleanInput,
        fullPhone: records[idx].phone,
        email: records[idx].email,
        amount: records[idx].amount,
        address: records[idx].address,
        city: records[idx].city,
        state: records[idx].state,
        pincode: records[idx].pincode,
        updatedAt: records[idx].updatedAt,
      },
    });
  } catch (error: any) {
    console.error('Error in POST /api/iwl/address:', error);
    return NextResponse.json({ error: 'Failed to save address. Please try again.' }, { status: 500 });
  }
}
