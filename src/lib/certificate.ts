import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface CertificateData {
  orderId: string;
  referenceId: string;
  name: string;
  customerPhone: string;
  customerEmail: string;
  amount: string;
  transactionTime: string;
  certificateId: string;
  paymentMode: string;
  transactionStatus: string;
}

/**
 * Reads the Transaction Report CSV file and returns the certificate details
 * matching the given CertificateID.
 */
export async function getCertificateData(id: string): Promise<CertificateData | null> {
  try {
    const csvPath = path.join(
      process.cwd(),
      'public',
      'Transaction Report 01 May 2026 - 31 May 2026 - Sheet2.csv'
    );

    if (!fs.existsSync(csvPath)) {
      console.error('Certificate database CSV not found at:', csvPath);
      return null;
    }

    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    // Parse using csv-parse/sync
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // Find the record matching the CertificateID
    const record = records.find((r: any) => r.CertificateID === id);

    if (!record) {
      return null;
    }

    return {
      orderId: record['Order Id'] || '',
      referenceId: record['Reference Id'] || '',
      name: record['Name'] || '',
      customerPhone: record['Customer Phone'] || '',
      customerEmail: record['Customer Email'] || '',
      amount: record['Amount'] || '',
      transactionTime: record['Transaction Time'] || '',
      certificateId: record['CertificateID'] || '',
      paymentMode: record['Payment Mode'] || '',
      transactionStatus: record['Transaction Status'] || '',
    };
  } catch (error) {
    console.error('Error fetching certificate data:', error);
    return null;
  }
}
