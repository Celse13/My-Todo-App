// src/app/page.tsx
"use client"
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./styles.css";
import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import Home from "@/components/Home";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <GoogleOAuthProvider clientId="">
            {isAuthenticated ? (
                <Home />
            ) : (
                <LandingPage setIsAuthenticated={setIsAuthenticated} />
            )}
        </GoogleOAuthProvider>
    );
}
