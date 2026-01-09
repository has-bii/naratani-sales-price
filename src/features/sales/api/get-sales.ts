import { google } from 'googleapis'
import { JWT } from 'google-auth-library'
import { SalesRecord } from '@/types'
import { cacheLife, cacheTag } from 'next/cache'

const spreadsheetId = process.env.SPREADSHEET_ID!
const sheetName = process.env.SHEET_NAME!
const range = `'${sheetName}'!B3:V`

export async function getSales(): Promise<{ data: SalesRecord[]; date: number }> {
  'use cache'
  cacheTag('sales')
  cacheLife('hours')

  const auth = new JWT({
    email: process.env.EMAIL,
    key: process.env.SECRET_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
  const sheets = google.sheets({ version: 'v4', auth })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  })

  const rows = response.data.values

  if (!rows || rows.length === 0) {
    throw new Error('❌ No data found in the specified sheet.')
  }

  // 1. Identify header indexes
  const headers = rows[0]
  const date = headers?.indexOf('Tanggal') || 0
  const productName = headers?.indexOf('Produk')
  const shopName = headers?.indexOf('Nama Toko')
  const sellingPrice = headers?.indexOf('Harga Jual')

  // 2. Map and Clean
  const cleanedData = rows
    .slice(1)
    .filter((row) => row[date]) // Remove empty rows
    .map((row) => ({
      date: row[date] as string,
      productName: (row[productName!] || 'N/A') as string,
      shopName: (row[shopName!] || 'N/A') as string,
      sellingPrice: (row[sellingPrice!] || 'N/A') as string,
    }))
    .reverse()

  const fetchedDate = Date.now()

  return { data: cleanedData, date: fetchedDate }
}
