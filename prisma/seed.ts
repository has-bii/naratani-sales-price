import { PrismaClient } from '@/generated/prisma/client'
import { hashPassword } from '@/utils/password'
import { PrismaPg } from '@prisma/adapter-pg'
import { uuidv7 } from 'uuidv7'

const pool = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter: pool })

async function main() {
  console.log('🌱 Starting database seeding...\n')

  const email = process.env.SEED_EMAIL
  const password = process.env.SEED_PASSWORD

  if (!password || !email) {
    throw new Error('email and password are not detected in env file')
  }

  const isExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (isExists) throw new Error('User already exists')

  const hashedPassword = await hashPassword(password)

  const id = uuidv7()

  //   Create user
  const user = await prisma.user.create({
    data: {
      id,
      name: 'Admin',
      email,
      emailVerified: true,
      accounts: {
        create: {
          accountId: id,
          providerId: 'credential',
          password: hashedPassword,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
    },
  })

  console.log('✅ User created:')
  console.log(`   - Name: ${user.name}`)
  console.log(`   - Email: ${user.email}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
