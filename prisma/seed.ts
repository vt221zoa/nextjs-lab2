import { PrismaClient, Prisma } from "@/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: "Alice",
        email: "alice@prisma.io"
    },
    {
        name: "Bob",
        email: "bob@prisma.io"
    },
];

async function main() {
    console.log("Починаємо наповнення бази даних...");

    for (const user of userData) {
        const createdUser = await prisma.user.create({ data: user });
        console.log(`Створено користувача: ${createdUser.name}`);
    }

    console.log("Наповнення завершено.");
}

main()
    .catch((e) => {
        console.error("Помилка при наповненні:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
