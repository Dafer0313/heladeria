'use client';

import { useRouter } from 'next/navigation';

import { CalendarIcon, PencilIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

const formSchema = z.object({
    cantidad: z.coerce
        .number()
        .positive('No se puede 0 o negativos')
        .nonnegative('No se pueden números negativos')
        .int('Deben ser números enteros')
        .gte(1, 'Debe ser mayor a 1')
        .refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: 'Ingresa un numero',
        }),
    fecha: z.date({
        required_error: 'Debes elegir una fecha',
    }),
});

export const EditButton = ({ producto }) => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cantidad: producto.cantidad,
            fecha: producto.fecha,
        },
    });

    const onSubmit = async (data) => {
        const res = await fetch('/api/products', {
            method: 'PATCH',
            body: JSON.stringify({
                id: producto.id,
                cantidad: data.cantidad,
                fecha: data.fecha,
            }),
        }).then((res) => res.json());

        toast.success('Producto actualizado con exito');
        router.refresh();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size='icon'>
                    <PencilIcon className='h-4 w-4' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar producto</DialogTitle>
                    <DialogDescription>
                        Podrás editar el producto
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full space-y-8'
                    >
                        <FormField
                            control={form.control}
                            name='cantidad'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cantidad</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='number'
                                            placeholder='5'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='fecha'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Fecha de compra</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-[240px] pl-3 text-left font-normal',
                                                        !field.value &&
                                                            'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            'PPP'
                                                        )
                                                    ) : (
                                                        <span>
                                                            Elige una fecha
                                                        </span>
                                                    )}
                                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className='w-auto p-0'
                                            align='start'
                                        >
                                            <Calendar
                                                mode='single'
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                        new Date('1900-01-01')
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className='w-full'
                            type='submit'
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? 'Actualizando producto...'
                                : 'Actualizar producto'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
