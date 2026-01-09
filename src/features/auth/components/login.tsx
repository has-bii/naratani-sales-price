'use client'

import { Controller, useForm } from 'react-hook-form'
import { LoginDto, loginSchema } from '../validations/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { authClient, getErrorMessage } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader, LogIn } from 'lucide-react'

export default function LoginForm() {
  const router = useRouter()
  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (payload: LoginDto) => {
    if (isSubmitting) return

    try {
      const { error } = await authClient.signIn.email({ ...payload })

      if (error) {
        const message = getErrorMessage(error)
        toast.error(message)
        return
      }

      toast.success('Berhasil masuk')
      router.refresh()
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      form.reset()
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Masuk</CardTitle>
        <CardDescription>Masukkan email Anda untuk masuk</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="naratani@gmail.com"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Kata Sandi</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="password"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" disabled={isSubmitting}>
                <span>Masuk</span>
                {isSubmitting ? <Loader className="animate-spin" /> : <LogIn />}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
