/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface InquiryRowData {
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  weddingDate: string; // Formatted date
  location: string;
  budget: string;
  notes: string;
}

/**
 * Extracts a spreadsheet ID from a raw ID or standard Google Sheets URL
 */
export function extractSpreadsheetId(input: string): string {
  const trimmed = input.trim();
  // Matches https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/...
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}

/**
 * Creates a dedicated "Forever Frames — Wedding Inquiries" Google Sheet with formatted columns
 */
export async function createInquiriesSpreadsheet(
  accessToken: string,
  title: string = 'Forever Frames — Wedding Inquiries'
): Promise<{ id: string; url: string; title: string }> {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: 'Wedding Inquiries',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Timestamp' } },
                    { userEnteredValue: { stringValue: 'Reference Code' } },
                    { userEnteredValue: { stringValue: 'Full Name' } },
                    { userEnteredValue: { stringValue: 'Phone / WhatsApp' } },
                    { userEnteredValue: { stringValue: 'Email Address' } },
                    { userEnteredValue: { stringValue: 'Wedding Date' } },
                    { userEnteredValue: { stringValue: 'Wedding Location / City' } },
                    { userEnteredValue: { stringValue: 'Estimated Budget' } },
                    { userEnteredValue: { stringValue: 'Couple Notes & Vision' } },
                    { userEnteredValue: { stringValue: 'Status' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Failed to create Google Sheet: HTTP ${response.status}`
    );
  }

  const data = await response.json();
  const id = data.spreadsheetId;
  const url = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${id}/edit`;

  return { id, url, title };
}

/**
 * Verifies access and fetches the title of a Google Sheet
 */
export async function getSpreadsheetDetails(
  accessToken: string,
  spreadsheetId: string
): Promise<{ title: string; sheets: string[] }> {
  const cleanId = extractSpreadsheetId(spreadsheetId);
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${cleanId}?fields=properties.title,sheets.properties.title`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Spreadsheet not found or access denied (HTTP ${response.status})`
    );
  }

  const data = await response.json();
  const title = data.properties?.title || 'Google Sheet';
  const sheets = (data.sheets || []).map((s: any) => s.properties?.title as string);

  return { title, sheets };
}

/**
 * Appends a new inquiry entry into the connected Google Sheet
 */
export async function appendInquiryRow(
  accessToken: string,
  spreadsheetId: string,
  inquiry: InquiryRowData,
  sheetTabName?: string
): Promise<{ updatedRows: number }> {
  const cleanId = extractSpreadsheetId(spreadsheetId);
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const rowValues = [
    timestamp,
    inquiry.referenceId,
    inquiry.fullName,
    inquiry.phone,
    inquiry.email || '—',
    inquiry.weddingDate,
    inquiry.location,
    inquiry.budget,
    inquiry.notes || '—',
    'New Inquiry',
  ];

  // If a tab name is known, target it; otherwise use default range A1
  const targetRange = sheetTabName ? `'${sheetTabName}'!A1` : 'A1';

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${cleanId}/values/${encodeURIComponent(
      targetRange
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Failed to record row in Google Sheet (HTTP ${response.status})`
    );
  }

  const result = await response.json();
  return { updatedRows: result.updates?.updatedRows || 1 };
}
