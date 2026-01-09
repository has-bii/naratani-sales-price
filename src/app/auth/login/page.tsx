'use client'

import PageLoader from '@/components/page-loader'
import LoginForm from '@/features/auth/components/login'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const { data, isPending } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (isPending) return

    if (data) router.push('/')
  }, [isPending, data, router])

  if (isPending) {
    return <PageLoader />
  }

  return <LoginForm />
}
