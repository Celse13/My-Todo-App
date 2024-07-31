import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Separator from '@/components/Separator';

interface SignupFormInputs {
    email: string;
    password: string;
    confirmPassword: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
        resolver: yupResolver(schema),
    });

    const handleSignup: SubmitHandler<SignupFormInputs> = (data) => {
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

    const handleGitHubSignup = () => {
        // Implement GitHub signup logic here
        toast.success('Signed up with GitHub');
    };

    return (
        <>
            <Form className="signup-form" onSubmit={handleSubmit(handleSignup)}>
                <div className="form-item mb-2">
                    <Input
                        type="email"
                        {...register('email')}
                        placeholder="Email"
                        className="input-field w-96 mb-2"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    <Input
                        type="password"
                        {...register('password')}
                        placeholder="Password"
                        className="input-field w-96 mb-2"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    <Input
                        type="password"
                        {...register('confirmPassword')}
                        placeholder="Confirm Password"
                        className="input-field w-96 mb-2"
                    />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                </div>
                <Button type="submit" className="submit-button w-96 mb-2">
                    Signup
                </Button>
                <Separator />
                <Button onClick={handleGoogleSignup} className="google-button w-96 mb-2">
                    Signup with Google
                </Button>
                <Button onClick={handleGitHubSignup} className="github-button w-96 mb-2">
                    Signup with GitHub
                </Button>
            </Form>
            <ToastContainer />
        </>
    );
};

export default Signup;
