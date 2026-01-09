import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from './ui/skeleton'
import { Input } from './ui/input'
import { Button } from './ui/button'

export function TableSkeleton() {
  return (
    <div>
      <div className="flex items-center gap-4 py-4">
        <Input placeholder="Cari produk..." className="max-w-sm" disabled />
        <Input placeholder="Cari toko..." className="max-w-sm" disabled />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="w-full h-6" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-full h-6" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" disabled>
          Kembali
        </Button>
        <Button variant="outline" size="sm" disabled>
          Selanjutnya
        </Button>
      </div>
    </div>
  )
}
