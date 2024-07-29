import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Home from '@/components/Home';
import "@/styles/dashboard.css";

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        const isAuthenticated = true;
        if (!isAuthenticated) {
            router.push('/');
        }
    }, [router]);

    return (
        <Home />
    );
};

export default Dashboard;
