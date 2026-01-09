import { TableSkeleton } from '@/components/table-skeleton'
import { Card, CardContent } from '@/components/ui/card'
import SalesPageServer from '@/features/sales/page/server'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main className="container mx-auto px-4 space-y-6 pt-12">
      <h1 className="text-4xl font-bold">Rekap Penjualan</h1>
      <Card className="w-full">
        <CardContent>
          <div className="flex flex-col gap-4 w-full">
            <Suspense fallback={<TableSkeleton />}>
              <SalesPageServer />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
