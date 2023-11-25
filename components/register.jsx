'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

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

const formSchema = z
    .object({
        email: z
            .string()
            .min(6, 'El email debe tener al menos 6 caracteres.')
            .email({ message: 'Debes ingresar un email válido' }),
        password: z
            .string()
            .min(4, 'La contraseña debe ser de al menos 6 caracteres.'),
        confirmPassword: z
            .string()
            .min(4, 'La contraseña debe ser de al menos 6 caracteres.'),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: 'Las contraseñas deben coincidir',
        path: ['confirmPassword'],
    });

export const Register = () => {
    const { push } = useRouter();

    const { status } = useSession();

    if (status === 'authenticated') {
        push('/add');
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data) => {
        const res = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((res) => res.json());

        if (res.message === 'El usuario ya existe') {
            toast.error(res.message, {
                duration: 1250,
            });

            return;
        }

        toast.success('Usuario creado, ahora debes iniciar sesión', {
            duration: 1250,
        });
        push('/api/auth/signin');
    };

    return (
        <Card className='w-96'>
            <CardHeader>
                <CardTitle>Registrarme</CardTitle>
                <CardDescription>
                    Crea una cuenta y agrega productos
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={
                                                form.formState.isSubmitting
                                            }
                                            placeholder='Tu correo electronico'
                                            type='email'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={
                                                form.formState.isSubmitting
                                            }
                                            placeholder='*********'
                                            type='password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar contraseña</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='*********'
                                            type='password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className='w-full'
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? 'Registrando...'
                                : 'Registrarme'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
