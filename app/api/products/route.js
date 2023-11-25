import { sql } from '@vercel/postgres';

export async function POST(req) {
    const body = await req.json();

    const { producto, cantidad, fecha } = body;

    try {
        const { rows } = await sql`
            INSERT INTO ventas (id, producto, cantidad, fecha)
            VALUES (${Math.floor(
                Math.random() * 1000000 + 1
            )}, ${producto}, ${cantidad}, ${fecha});
        `;

        return Response.json({ result: rows }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}

export async function PATCH(req) {
    const body = await req.json();

    const { id, cantidad, fecha } = body;

    console.log({ id, cantidad, fecha });

    try {
        const { rows } = await sql`
            UPDATE ventas
            SET cantidad = ${cantidad}, fecha = ${fecha}
            WHERE id = ${id}
        `;

        console.log(rows);

        return Response.json({ result: rows }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}

export async function DELETE(req) {
    const body = await req.json();

    const { id } = body;

    try {
        const { rows } = await sql`DELETE FROM ventas WHERE id = ${id}`;

        return Response.json({ result: rows }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error }, { status: 500 });
    }
}
