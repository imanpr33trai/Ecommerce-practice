import { PrismaClient, OrderStatus,PaymentStatus} from './generated/client';

import { Decimal } from '@prisma/client/runtime/library';




// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // --- 1. CLEAN UP DATABASE ---
  // Delete records in an order that respects foreign key constraints
  console.log('Cleaning up database...');
  await prisma.review.deleteMany();
  await prisma.wish.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany(); // Note: User-related tables like Account, Session are not seeded here but would also need cleanup

  // --- 2. CREATE USERS ---
  console.log('Creating users...');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        id: 'user_1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        id: 'user_2',
        name: 'Bob Williams',
        email: 'bob@example.com',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        id: 'user_3',
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        id: 'user_4',
        name: 'Diana Miller',
        email: 'diana@example.com',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.user.create({
      data: {
        id: 'user_5',
        name: 'Ethan Davis',
        email: 'ethan@example.com',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  // --- 3. CREATE CATEGORIES ---
  console.log('Creating categories...');
  const electronicsCategory = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Gadgets and devices',
    },
  });

  const apparelCategory = await prisma.category.create({
    data: {
      name: 'Apparel',
      slug: 'apparel',
      description: 'Clothing and fashion',
    },
  });

  const booksCategory = await prisma.category.create({
    data: {
        name: 'Books',
        slug: 'books',
        description: 'Printed and digital books',
    }
  });

  // --- 4. CREATE PRODUCTS & IMAGES ---
  console.log('Creating products and images...');
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Quantum Laptop',
        slug: 'quantum-laptop',
        description: 'A high-performance laptop for professionals.',
        price: new Decimal('1299.99'),
        stock: 50,
        sku: 'ELEC-LP-001',
        isActive: true,
        categoryId: electronicsCategory.id,
        images: {
          create: [
            { url: 'https://placehold.co/600x400/blue/white?text=Laptop+1', altText: 'Front view of the Quantum Laptop', isPrimary: true },
            { url: 'https://placehold.co/600x400/blue/white?text=Laptop+2', altText: 'Side view of the Quantum Laptop' },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Photon Smartphone',
        slug: 'photon-smartphone',
        description: 'Latest generation smartphone with a stunning camera.',
        price: new Decimal('799.50'),
        stock: 150,
        sku: 'ELEC-SP-002',
        isActive: true,
        categoryId: electronicsCategory.id,
        images: {
          create: [{ url: 'https://placehold.co/600x400/green/white?text=Phone', altText: 'Photon Smartphone', isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Classic Cotton T-Shirt',
        slug: 'classic-cotton-t-shirt',
        description: 'A comfortable and stylish 100% cotton t-shirt.',
        price: new Decimal('25.00'),
        stock: 300,
        sku: 'APP-TS-001',
        isActive: true,
        categoryId: apparelCategory.id,
        images: {
          create: [{ url: 'https://placehold.co/600x400/red/white?text=T-Shirt', altText: 'Classic Cotton T-Shirt', isPrimary: true }],
        },
      },
    }),
    prisma.product.create({
        data: {
          name: 'Designer Denim Jeans',
          slug: 'designer-denim-jeans',
          description: 'Premium quality denim jeans for all occasions.',
          price: new Decimal('89.99'),
          stock: 120,
          sku: 'APP-JN-002',
          isActive: true,
          categoryId: apparelCategory.id,
          images: {
            create: [{ url: 'https://placehold.co/600x400/black/white?text=Jeans', altText: 'Designer Denim Jeans', isPrimary: true }],
          },
        },
      }),
      prisma.product.create({
        data: {
          name: 'The Art of Programming',
          slug: 'the-art-of-programming',
          description: 'A comprehensive guide to modern software development.',
          price: new Decimal('49.95'),
          stock: 200,
          sku: 'BOOK-CS-001',
          isActive: true,
          categoryId: booksCategory.id,
          images: {
            create: [{ url: 'https://placehold.co/600x400/orange/white?text=Book', altText: 'The Art of Programming Book Cover', isPrimary: true }],
          },
        },
      }),
  ]);
  
  // --- 5. CREATE REVIEWS ---
  console.log('Creating reviews...');
  await prisma.review.createMany({
    data: [
        { productId: products[0].id, userId: users[0].id, rating: 5, comment: "Absolutely fantastic laptop! Fast and reliable." },
        { productId: products[0].id, userId: users[1].id, rating: 4, comment: "Great value, but the battery life could be better." },
        { productId: products[2].id, userId: users[2].id, rating: 5, comment: "So soft and fits perfectly. I'm buying more!" },
        { productId: products[4].id, userId: users[3].id, rating: 4, comment: "A must-read for any aspiring developer." },
        { productId: products[1].id, userId: users[4].id, rating: 5, comment: "The camera on this phone is unbelievable." },
    ],
  });

  // --- 6. CREATE ORDERS, ORDER ITEMS & PAYMENTS ---
  console.log('Creating orders...');
  const order1 = await prisma.order.create({
    data: {
        userId: users[0].id,
        totalAmount: 1324.99, // Laptop + T-shirt
        status: OrderStatus.DELIVERED,
        paymentStatus: PaymentStatus.SUCCESS,
        items: {
            create: [
                { productId: products[0].id, quantity: 1 },
                { productId: products[2].id, quantity: 1 },
            ],
        },
        payment: {
            create: { amount: new Decimal('1324.99'), provider: 'Stripe', status: PaymentStatus.SUCCESS, transactionId: 'txn_1' }
        }
    },
  });

  const order2 = await prisma.order.create({
    data: {
        userId: users[1].id,
        totalAmount: 179.98, // 2x Jeans
        status: OrderStatus.SHIPPED,
        paymentStatus: PaymentStatus.SUCCESS,
        items: {
            create: [
                { productId: products[3].id, quantity: 2 },
            ],
        },
        payment: {
            create: { amount: new Decimal('179.98'), provider: 'PayPal', status: PaymentStatus.SUCCESS, transactionId: 'txn_2' }
        }
    },
  });

  const order3 = await prisma.order.create({
    data: {
        userId: users[2].id,
        totalAmount: 799.50, // Smartphone
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        items: { create: [{ productId: products[1].id, quantity: 1 }] },
    },
  });

  // --- 7. CREATE CARTS & CART ITEMS ---
  console.log('Creating carts...');
  await prisma.cart.create({
    data: {
        userId: users[3].id,
        items: {
            create: [
                { productId: products[4].id, quantity: 1 }, // Book
                { productId: products[2].id, quantity: 2 }, // T-shirts
            ],
        },
    },
  });

  await prisma.cart.create({
    data: {
        userId: users[4].id,
        items: {
            create: { productId: products[0].id, quantity: 1 } // Laptop
        }
    }
  });

  // --- 8. CREATE WISHLISTS ---
  console.log('Creating wishlists...');
  await prisma.wish.createMany({
    data: [
        { userId: users[0].id, productId: products[1].id }, // Alice wants the phone
        { userId: users[1].id, productId: products[0].id }, // Bob wants the laptop
        { userId: users[2].id, productId: products[4].id }, // Charlie wants the book
        { userId: users[3].id, productId: products[3].id }, // Diana wants the jeans
        { userId: users[0].id, productId: products[4].id }, // Alice also wants the book
    ],
  });

  console.log('Seeding finished.');
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  });