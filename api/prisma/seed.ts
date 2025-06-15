import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Broca Aço Rápido 10mm',
        code: 'BR-10',
        quantity: 150,
      },
      {
        name: 'Disco de Corte 115mm',
        code: 'DC-115',
        quantity: 200,
      },
      {
        name: 'Parafuso Allen M8',
        code: 'PA-M8',
        quantity: 1000,
      },
      {
        name: 'Chave de Fenda Phillips Média',
        code: 'CFP-M',
        quantity: 75,
      },
      {
        name: 'Luva de Segurança Tricotada',
        code: 'LS-TC',
        quantity: 300,
      },
      {
        name: 'Máscara de Solda Automática',
        code: 'MSA-01',
        quantity: 25,
      },
      {
        name: 'Eletrodo Revestido 3.25mm',
        code: 'ER-325',
        quantity: 500,
      },
      {
        name: 'Disco de Desbaste 180mm',
        code: 'DD-180',
        quantity: 150,
      },
      {
        name: 'Graxa Industrial Azul 1kg',
        code: 'GIA-1KG',
        quantity: 60,
      },
      {
        name: 'Chave Combinada 17mm',
        code: 'CC-17',
        quantity: 90,
      },
    ],
  });

  console.log('Produtos do almoxarifado cadastrados com sucesso!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
