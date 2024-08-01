"use client"
import { GoogleOAuthProvider } from '@react-oauth/google';

import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import Home from "@/components/Home";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        < Home initialTodos={[]} />

        // <GoogleOAuthProvider clientId="">
        //     {isAuthenticated ? (
        //         <Home />
        //     ) : (
        //         <LandingPage setIsAuthenticated={setIsAuthenticated} />
        //     )}
        // </GoogleOAuthProvider>
    );
}
