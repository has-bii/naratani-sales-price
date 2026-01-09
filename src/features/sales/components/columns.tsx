'use client'

import { SalesRecord } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<SalesRecord>[] = [
  {
    accessorKey: 'date',
    header: 'Tanggal',
  },
  {
    accessorKey: 'productName',
    header: 'Nama Produk',
  },
  {
    accessorKey: 'shopName',
    header: 'Toko',
  },
  {
    accessorKey: 'sellingPrice',
    header: 'Harga',
  },
]
