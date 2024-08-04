
import {authenticateType} from "@/types/authenticate";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import { useRouter } from 'next/navigation';
import {ChangeEvent} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "react-toastify";


const Login = ({setIsAuthenticated}: authenticateType) => {
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (email && password) {
            toast.success('Logged in successfully');
            setIsAuthenticated(true);
            router.push('/todos');
        } else {
            toast.error('Please enter email and password');
        }
    }

    return (
        <>
            <form>
                <div className="form-item mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-96"
                    />
                </div>
                <div className="form-item mb-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder="Password"
                        className="w-96"
                    />
                </div>
                <Button
                    onClick={handleLogin}
                    className="submit-button"
                />
            </form>
        </>
    )
}

export default Login;
