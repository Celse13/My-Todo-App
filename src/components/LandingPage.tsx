"use client";

import { useState } from 'react';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import { signIn, useSession } from "next-auth/react";
import Image from 'next/image';
import todoAppImage from '@/public/todo-app.jpg';

import { useRouter } from 'next/navigation';

const LandingPage = ({ setIsAuthenticated }) => {
    const { data: session } = useSession();
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signIn('google', { redirect: false });
            if (result?.ok) {
                setIsAuthenticated(true);
                router.push('/home');
            } else {
                toast.error('Google login failed');
            }
        } catch (error) {
            toast.error('An error occurred during Google login');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-1/2">
                <Image src={todoAppImage} alt="Person showing to-do list" layout="responsive" width={600} height={900} />
            </div>
            <div className="w-1/2 p-8 flex flex-col items-center">
                <h1 className="text-2xl mb-8 text-center">Welcome to My To-Do App!</h1>
                {session ? (
                    <div>
                        <p>Welcome, {session.user?.name}</p>
                        <button onClick={() => signOut()}>Sign Out</button>
                    </div>
                ) : (
                    isLogin ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Signup />
                )}
                <div className="mt-4">
                    Don’t have an account?
                    <span
                        onClick={() => setIsLogin(false)}
                        className="text-blue-500 cursor-pointer ml-1"
                    >
                        Signup
                    </span>
                </div>
                <div className="mt-4">
                    <button onClick={handleGoogleSignIn} className="text-blue-500 cursor-pointer ml-1">
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
