
import Login from "@/components/Login";
import Image from 'next/image';
import todoAppImage from '../public/todo-app.jpg';
import { SessionProvider } from 'next-auth/react';

const LandingPage = () => {

    return (
        <SessionProvider>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-1/2">
                    <Image src={todoAppImage} alt="Person showing to-do list" layout="responsive" width={600} height={900} />
                </div>
                <div className="w-1/2 p-8 flex flex-col items-center">
                    <h1 className="text-2xl mb-8 text-center">Welcome to My To-Do App!</h1>
                    <Login />
                </div>
            </div>
        </SessionProvider>
    );
};

export default LandingPage;
