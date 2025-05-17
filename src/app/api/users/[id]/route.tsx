import { PrismaClient } from '@/generated/prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const id = parseInt(params.id);

        const user = await prisma.user.update({
            where: { id },
            data: { name: data.name, email: data.email },
        });
        return NextResponse.json(
            { status: 'success', message: 'Користувача оновлено', data: user },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { status: 'error', message: 'Помилка при оновленні користувача', error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);

        await prisma.user.delete({ where: { id } });
        return NextResponse.json(
            { status: 'success', message: 'Користувача видалено' },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { status: 'error', message: 'Помилка при видаленні користувача', error: error.message },
            { status: 500 }
        );
    }
}