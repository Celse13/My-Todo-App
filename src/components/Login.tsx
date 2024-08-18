import { signIn } from "next-auth/react"
import { Button } from '@/components/ui/button';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    return (

        <form
            action={ async () => {
                "use server"
                await signIn('google', { redirectTo: "/todos" })
            }}>
            <Button
                className='w-96'
            >
                Sign in with Google
            </Button>
        </form>

    );
};

export default Login;
