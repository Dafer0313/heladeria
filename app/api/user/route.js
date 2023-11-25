import { NextResponse } from 'next/server';

import { sql } from '@vercel/postgres';
import { hash } from 'argon2';

export const POST = async (req) => {
    const body = await req.json();

    const { email, password } = body;

    const encriptada = await hash(password);

    try {
        const { rows: usuario } = await sql`
            SELECT * FROM usuarios WHERE email = ${email}
        `;

        if (usuario.length > 0) {
            return NextResponse.json(
                { message: 'El usuario ya existe' },
                { status: 400 }
            );
        }

        const { rows } = await sql`
            INSERT INTO usuarios (id, email, password)
            VALUES (${Math.floor(
                Math.random() * 1000000 + 1
            )}, ${email}, ${encriptada})`;

        return NextResponse.json({ rows }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ e }, { status: 500 });
    }
};
