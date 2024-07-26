import Image from "next/image";
import todoAppImage from "@/public/todo-app.jpg";


export default function LandingPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
            <div className="w-full max-w-2xl mb-8">
                <Image src={todoAppImage} alt="Person showing to-do list" layout="responsive" width={600} height={900}
                       className="rounded-lg shadow-md"/>
            </div>
            <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                Get Started
            </button>
        </main>
    )
}
