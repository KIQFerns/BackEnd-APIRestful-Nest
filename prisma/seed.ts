import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const createAdmin = await prisma.user.create({
    data: {
      id: 'random-123', // Exemplo de propriedade que pode ser necessária dependendo do esquema
      name: 'sistematxai',
      password: await hash('123456789', 10),
      role: 'admin',
      email: 'admin@email.com',
      createdAt: new Date(), // Exemplo de propriedade de data que pode ser necessária
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
