"use client";

import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "@/components/Spinner";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { status } = useSession();

    // if (status === 'loading') {
    //     return <Spinner />;
    // }

    if (status === 'authenticated') {
        router.push('/todos');
    }

    const handleLoginWithGoogle = () => {
        signIn();
    };

    return (

        <>
                <Button onClick={handleLoginWithGoogle}>
                    Sign in with Google
                </Button>
            <ToastContainer/>
        </>

    );
};

// export default Login;
