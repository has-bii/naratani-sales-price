'use client'

import { SalesRecord } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'
import { id } from 'date-fns/locale'

export const columns: ColumnDef<SalesRecord>[] = [
  {
    accessorKey: 'date',
    header: 'Tanggal',
    cell: ({ row }) => <span>{formatDate(row.original.date, 'PP', { locale: id })}</span>,
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
