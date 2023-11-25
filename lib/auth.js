import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { verify } from 'argon2';
import { sql } from '@vercel/postgres';

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Tu email',
                    value: '',
                },
                password: {
                    label: 'Contraseña',
                    type: 'password',
                    placeholder: 'Tu contraseña',
                    value: '',
                },
            },
            authorize: async (credentials) => {
                const { rows } =
                    await sql`SELECT * FROM usuarios WHERE email = ${credentials?.email}`;

                if (rows.length === 0) {
                    throw new Error('No se encontró el usuario');
                }

                const _hash = await verify(
                    rows[0].password,
                    credentials?.password
                );

                if (!_hash) {
                    throw new Error('Credenciales incorrectas');
                }

                return rows[0];
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
    },
});
