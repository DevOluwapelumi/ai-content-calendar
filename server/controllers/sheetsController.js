import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

export const saveToGoogleSheet = async (req, res) => {
  const { calendar } = req.body;
  if (!calendar) {
    return res.status(400).json({ error: 'Calendar content is required' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const sheetId = process.env.GOOGLE_SHEET_ID;

    const rows = calendar
      .split('\n')
      .filter(row => row.trim() !== '')
      .map(row => [row]);

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: rows,
      },
    });

    res.status(200).json({ success: true, message: 'Calendar saved to Google Sheets' });
  } catch (error) {
    console.error('Google Sheets API error:', error);
    res.status(500).json({ error: 'Failed to save to Google Sheets' });
  }
};
