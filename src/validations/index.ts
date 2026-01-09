import z4 from 'zod/v4'

export const email = z4.email('Email tidak valid!')
export const password = z4.string().min(8, 'Minimal 8 karakter').max(32, 'Maksimal 32 karakter')
