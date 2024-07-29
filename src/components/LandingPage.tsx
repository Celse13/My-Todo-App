// src/components/LandingPage.tsx
import { useState } from 'react';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Image from 'next/image';
import todoAppImage from '@/public/todo-app.jpg';
import '@/styles/landingPage.css'; // Ensure the CSS file is imported

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="landing-page">
            <div className="image-container">
                <Image src={todoAppImage} alt="Person showing to-do list" layout="responsive" width={600} height={900} />
            </div>
            <div className="auth-container">
                <h1 className="welcome-message text-2xl mb-4">Welcome to My To-Do App!</h1>
                {isLogin ? <Login /> : <Signup />}
                <div className="mt-4">
                    Don’t have an account?
                    <span
                        onClick={() => setIsLogin(false)}
                        className="text-blue-500 cursor-pointer text-highlight"
                    >
    Signup
</span>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
