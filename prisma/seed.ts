import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const positionAdmin = await prisma.position.create({
    data: {
      id: 'random-123', // Exemplo de propriedade que pode ser necessária dependendo do esquema
      name: 'Administrator',
      createdAt: new Date(), // Exemplo de propriedade de data que pode ser necessária
    },
  });

  console.log({ positionAdmin });
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
