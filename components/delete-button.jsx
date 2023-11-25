'use client';

import { useRouter } from 'next/navigation';

import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from './ui/button';

export const DeleteButton = ({ id }) => {
    const router = useRouter();

    async function borrarProducto(id) {
        await fetch('/api/products', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        }).then((res) => res.json());

        toast.success('Producto borrado con exito');

        router.refresh();
    }

    return (
        <Button
            size='icon'
            variant='destructive'
            onClick={() => borrarProducto(id)}
        >
            <Trash2Icon className='h-4 w-4' />
        </Button>
    );
};
