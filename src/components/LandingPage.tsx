"use client";

import { useState } from 'react';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Image from 'next/image';
import todoAppImage from '@/public/todo-app.jpg';

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-1/2">
                <Image src={todoAppImage} alt="Person showing to-do list" layout="responsive" width={600} height={900} />
            </div>
            <div className="w-1/2 p-8 flex flex-col items-center">
                <h1 className="text-2xl mb-8 text-center">Welcome to My To-Do App!</h1>
                {isLogin ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Signup />}
                <div className="mt-4">
                    Don’t have an account?
                    <span
                        onClick={() => setIsLogin(false)}
                        className="text-blue-500 cursor-pointer ml-1"
                    >
                        Signup
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
