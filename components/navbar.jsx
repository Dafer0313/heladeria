'use client';

import Link from 'next/link';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, buttonVariants } from './ui/button';

export const Navbar = () => {
    const { status } = useSession();
    return (
        <nav className='flex w-full items-center justify-between bg-primary p-8 text-white'>
            <Link
                className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'
                href='/'
            >
                Heladería
            </Link>
            <ul className='flex items-center gap-x-8'>
                {status === 'authenticated' && (
                    <>
                        <li>
                            <Link
                                className='text-lg font-medium leading-7'
                                href='/add'
                            >
                                Agregar producto
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='text-lg font-medium leading-7'
                                href='/products'
                            >
                                Productos
                            </Link>
                        </li>
                    </>
                )}
                {status === 'unauthenticated' && (
                    <>
                        <li>
                            <Link
                                href='/register'
                                className={buttonVariants({ variant: 'ghost' })}
                            >
                                Registrarme
                            </Link>
                        </li>
                        <li>
                            <Button variant='ghost' onClick={() => signIn()}>
                                Iniciar sesión
                            </Button>
                        </li>
                    </>
                )}
                {status === 'authenticated' && (
                    <li>
                        <Button variant='destructive' onClick={() => signOut()}>
                            Cerrar sesión
                        </Button>
                    </li>
                )}
            </ul>
        </nav>
    );
};
