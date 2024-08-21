import { signIn } from "../../auth";
import { Button } from '@/components/ui/button';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    return (
            <form
                className="w-72"
                action={async () => {
                    "use server";
                    await signIn('google', { redirectTo: "/todos" });
                }}
            >
                <Button
                    className='w-full flex items-center justify-center space-x-2 py-3 px-4 bg-transparent text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300'
                >
                    <FcGoogle className="text-2xl" />
                    <span>Sign up with Google</span>
                </Button>
            </form>
    );
};

export default Login;
