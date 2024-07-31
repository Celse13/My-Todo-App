import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = () => {
        if (!email || !password || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Save user data to local storage
        toast.success('Signed up successfully');
    };

    const handleGoogleSignup = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            localStorage.setItem('user', JSON.stringify(tokenResponse));
            toast.success('Signed up with Google');
        },
        onError: () => {
            toast.error('Google signup failed');
        },
    });

    return (
        <>
            <Form className="signup-form">
                <div className="form-item">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input-field"
                    />
                </div>
                <div className="form-item">
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="input-field"
                    />
                </div>
                <div className="form-item">
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="input-field"
                    />
                </div>
                <Button onClick={handleSignup} className="submit-button">
                    Signup
                </Button>
                <Button onClick={handleGoogleSignup} className="google-button">
                    Signup with Google
                </Button>
                <Button onClick={handleGitHubSignup} className="github-button">
                    Signup with GitHub
                </Button>
            </Form>
            <ToastContainer />
        </>
    );
};

export default Signup;
