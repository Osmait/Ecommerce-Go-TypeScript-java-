import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
const baseDate = new Date(); // Puedes ajustar esta fecha base según tus necesidades

export const usersData = Array.from({ length: 10 }, (_, index) => ({
  createdAt: new Date(baseDate.getTime() + index * 1000),
  updatedAt: new Date(baseDate.getTime() + index * 1000),
  id: uuidv4(),
  email: `user${index + 1}@example.com`,
  name: `User ${index + 1}`,
  lastName: `Lastname ${index + 1}`,
  password: 'hashedpassword',
}));

export const categoriesData = Array.from({ length: 10 }, (_, index) => ({
  id: uuidv4(),
  name: `Category ${index + 1}`,
  description: `Category ${index + 1} description`,
  createdAt: new Date(baseDate.getTime() + index * 1000),
  updatedAt: new Date(baseDate.getTime() + index * 1000),
}));

export const productsData = Array.from({ length: 10 }, (_, index) => ({
  id: uuidv4(),
  name: `Product ${index + 1}`,
  description: `Product ${index + 1} description`,
  price: 100 * (index + 1),
  stock: 50,
  imagen: `product${index + 1}.jpg`,
  createdAt: new Date(baseDate.getTime() + index * 1000),
  updatedAt: new Date(baseDate.getTime() + index * 1000),
  categoryId: categoriesData[0].id, // Asigna la categoría correspondiente
}));

export const ordersData = Array.from({ length: 10 }, (_, index) => ({
  id: uuidv4(),
  createdAt: new Date(baseDate.getTime() + index * 1000),
  updatedAt: new Date(baseDate.getTime() + index * 1000),
}));

export const orderItemsData = Array.from({ length: 10 }, (_, index) => ({
  id: uuidv4(),
  quantity: index + 1,
  createdAt: new Date(baseDate.getTime() + index * 1000),
  updatedAt: new Date(baseDate.getTime() + index * 1000),
  productId: productsData[0].id, // Asigna el producto correspondiente
  orderId: ordersData[0].id, // Asigna el pedido correspondiente
}));

export const addressesData = Array.from({ length: 10 }, (_, index) => ({
  id: uuidv4(),
  street: `Street ${index + 1}`,
  city: `City ${index + 1}`,
  zipCode: `1234${index + 1}`,
  country: 'Countryland',
  createdAt: new Date(baseDate.getTime() + index * 1000),
  updatedAt: new Date(baseDate.getTime() + index * 1000),
  userId: usersData[0].id, // Asigna el usuario correspondiente
}));

const prisma = new PrismaClient();

async function main() {
  // Insertar datos para cada modelo
  for (let i = 0; i < 10; i++) {
    await prisma.user.create({ data: usersData[i] });

    await prisma.category.create({ data: categoriesData[i] });
    await prisma.product.create({ data: productsData[i] });
    console.log('Datos insertados correctamente.');
  }
}

// Llamar a la función para insertar datos
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
