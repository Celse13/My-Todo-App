import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (email && password) {
            toast.success('Logged in successfully');
            setIsAuthenticated(true);
            router.push('/home');
        } else {
            toast.error('Please enter email and password');
        }
    };

    return (
        <>
            <Form className="login-form">
                <div className="form-item mb-4">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-96"
                    />
                </div>
                <div className="form-item mb-4">
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-96"
                    />
                </div>
                <Button onClick={handleLogin} className="submit-button">
                    Login
                </Button>
                <div className="separator">
                    <hr className="flex-1" />
                    <span className="mx-2">Or</span>
                    <hr className="flex-1" />
                </div>
                <GoogleLogin
                    className="w-96"
                    onSuccess={credentialResponse => {
                        toast.success('Logged in with Google');
                        setIsAuthenticated(true);
                        router.push('/home');
                    }}
                    onError={() => {
                        toast.error('Google login failed');
                    }}
                />
            </Form>
            <ToastContainer />
        </>
    );
};

export default Login;
