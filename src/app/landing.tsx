// src/components/LandingPage.tsx
import { useState } from 'react';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Image from 'next/image';
import todoAppImage from '@/public/todo-app.jpg';

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="landing-page flex flex-col items-center justify-center min-h-screen">
            <div className="w-full ml-4">
                <Image src={todoAppImage} alt="Person showing to-do list" layout="responsive" width={600} height={900} />
            </div>
            <div className="auth-container mt-8">
                {isLogin ? <Login /> : <Signup />}
                <button onClick={() => setIsLogin(!isLogin)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    {isLogin ? 'Switch to Signup' : 'Switch to Login'}
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
