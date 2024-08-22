
import Login from "@/components/Login";
import Image from 'next/image';
import todoAppImage from '../public/todo-app.jpg';
import { SessionProvider } from 'next-auth/react';
import HeaderAnimation from "@/components/HeaderAnimation";

const LandingPage = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center min-h-screen bg-gray-100">
            <div className="w-full md:w-1/2">
                <Image src={todoAppImage} alt="Person showing to-do list" layout="responsive" width={600} height={900} />
            </div>
            <div className="w-full md:w-1/2 p-4 flex flex-col items-center relative">
                <HeaderAnimation />
                <Login />
            </div>
        </div>
    );
};

export default LandingPage;
