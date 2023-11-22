import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav className='flex w-full items-center justify-evenly bg-primary p-8 text-white'>
            <Link
                className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'
                href='/'
            >
                Heladería
            </Link>
            <ul className='flex items-center gap-x-8'>
                <li>
                    <Link
                        className='text-lg font-medium leading-7'
                        href='/products'
                    >
                        Productos
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
