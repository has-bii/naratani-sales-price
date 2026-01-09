import { getSales } from '../api/get-sales'
import { columns } from '../components/columns'
import { DataTable } from '../components/data-table'

export default async function SalesPageServer() {
  const { data, date } = await getSales()

  return <DataTable columns={columns} data={data} fetchedDate={date} />
}
