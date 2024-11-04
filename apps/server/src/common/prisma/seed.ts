import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const superAdminEmail = 'superadmin@example.com' // Change this to your preferred email

  // Check if a super admin already exists
  const existingSuperAdmin = await prisma.user.findFirst({
    where: { role: 'SUPER_ADMIN' },
  })

  if (!existingSuperAdmin) {
    const password = await bcrypt.hash('supersecretpassword', 10) // Replace with secure password

    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: superAdminEmail,
        password,
        role: 'SUPER_ADMIN',
        tenant: {
          create: {
            name: 'SuperAdminTenant', // This can be any tenant name for the super admin
          },
        },
      },
    })

    console.log('Super admin user created')
  } else {
    console.log('Super admin user already exists')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
