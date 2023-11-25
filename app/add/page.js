import { redirect } from 'next/navigation';

import { Formulario } from '@/components/formulario';
import { auth } from '@/lib/auth';

const Add = async () => {
    const session = await auth();

    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <div className='flex min-h-[calc(100vh-104px)] flex-col items-center justify-around p-8'>
            <Formulario />
        </div>
    );
};
export default Add;
