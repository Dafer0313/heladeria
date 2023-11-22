import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        const result = await sql`
            CREATE TABLE IF NOT EXISTS Ventas (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            cantidad NUMERIC NOT NULL,
            producto VARCHAR NOT NULL,
            fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`;

        return Response.json({ result }, { status: 200 });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}

export async function POST(req) {
    const body = await req.json();

    const { producto, cantidad, fecha } = body;

    try {
        const { rows } = await sql`
            INSERT INTO Ventas (
                quantity,
                product,
                purchased_date
            ) VALUES (${producto}, ${cantidad}, ${fecha})`;

        return Response.json({ result: rows }, { status: 201 });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
