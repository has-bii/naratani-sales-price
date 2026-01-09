import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient()

type ErrorTypes = Partial<Record<keyof typeof authClient.$ERROR_CODES, string>>
const errorCodes = {
  INVALID_EMAIL_OR_PASSWORD: 'Email atau password salah',
} satisfies ErrorTypes

type Params = {
  code?: string | undefined
  message?: string | undefined
  status: number
  statusText: string
}

export const getErrorMessage = ({ code, statusText }: Params) => {
  if (code! in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes]
  }
  return statusText
}
