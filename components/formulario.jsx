'use client';

import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from './ui/calendar';
import { toast } from 'sonner';

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
    producto: z.string().min(2, {
        message: 'El producto debe tener al menos 2 caracteres',
    }),
    fecha: z.date({
        required_error: 'Debes elegir una fecha',
    }),
});

export function Formulario() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cantidad: 0,
            fecha: new Date().now,
            producto: '',
        },
    });

    async function onSubmit({ cantidad, fecha, producto }) {
        await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify({ cantidad, fecha, producto }),
        }).then((res) => res.json());
        toast.success('Producto creado correctamente');
        form.reset();
        form.clearErrors();
    }

    return (
        <Card className='w-96'>
            <CardHeader>
                <CardTitle>Agregar un producto</CardTitle>
                <CardDescription>Aquí puedes agregar productos</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full space-y-8'
                    >
                        <FormField
                            control={form.control}
                            name='producto'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Producto</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Producto vendido'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                ? 'Agregando producto...'
                                : 'Agregar producto'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
