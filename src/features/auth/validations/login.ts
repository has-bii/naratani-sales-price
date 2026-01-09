import { email, password } from '@/validations'
import z4 from 'zod/v4'

export const loginSchema = z4.object({
  email,
  password,
})

export type LoginDto = z4.infer<typeof loginSchema>
