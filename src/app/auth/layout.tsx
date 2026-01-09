import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function AuthLayout({ children }: Props) {
  return <main className="flex items-center justify-center h-dvh">{children}</main>
}
