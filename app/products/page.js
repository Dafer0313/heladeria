import { sql } from '@vercel/postgres';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DeleteButton } from '@/components/delete-button';

export const dynamic = 'force-dynamic'

const Productos = async () => {
    const { rows } = await sql`SELECT * FROM ventas`; 

    return (
        <div className='flex min-h-[calc(100vh-104px)] flex-col items-center justify-around p-8'>
            <Table className='max-w-2xl mx-auto'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'>Id</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead className='text-right'>Fecha de compra</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows && rows.map((venta) => (
                        <TableRow key={venta.id}>
                            <TableCell className='font-medium'>
                                {venta.id}
                            </TableCell>
                            <TableCell>{venta.producto}</TableCell>
                            <TableCell>{venta.cantidad}</TableCell>
                            <TableCell className='text-right'>
                                {new Date(venta.fecha).toLocaleDateString('es-ES')}
                            </TableCell>
                            <TableCell className='text-right'>
                                <DeleteButton id={venta.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
export default Productos;
