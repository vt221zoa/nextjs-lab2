import { PrismaClient } from '@/generated/prisma/client';
const prisma = new PrismaClient();
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();
    const updated = await prisma.user.update({
        where: { id: parseInt(params.id) },
        data: {
            name: data.name,
            email: data.email,
        },
    });
    return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const deleted = await prisma.user.delete({
        where: { id: parseInt(params.id) },
    });
    return NextResponse.json(deleted);
}