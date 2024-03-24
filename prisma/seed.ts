import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const createAdmin = await prisma.user.create({
    data: {
      id: randomUUID(),
      name: 'sistematxai',
      password: await hash('123456789', 10),
      role: 'admin',
      email: 'admin@email.com',
      createdAt: new Date(),
    },
  });
  console.log({ createAdmin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
