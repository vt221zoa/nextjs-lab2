import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(
            { headers: 'Get users', status: 'success', message: 'Користувачі отримані успішно', data: users },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { status: 'error', message: 'Помилка при отриманні користувачів', error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        if (!data.name || !data.email) {
            return NextResponse.json(
                { status: 'error', message: 'Ім\'я та email обов\'язкові' },
                { status: 400 }
            );
        }
        const user = await prisma.user.create({
            data: { name: data.name, email: data.email },
        });
        return NextResponse.json(
            { status: 'success', message: 'Користувача створено', data: user },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { status: 'error', message: 'Помилка при створенні користувача', error: error.message },
            { status: 500 }
        );
    }
}