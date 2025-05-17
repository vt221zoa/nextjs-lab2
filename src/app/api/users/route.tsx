import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma/client';
const prisma = new PrismaClient();


export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const data = await req.json();
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
        },
    });
    return NextResponse.json(user);
}