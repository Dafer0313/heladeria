import { Register as RegisterForm } from '@/components/register';

export default function Register() {
    return (
        <main className='flex min-h-[calc(100vh-104px)] flex-col items-center justify-around p-8'>
            <RegisterForm />
        </main>
    );
}
