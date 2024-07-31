"use client";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import Home from "@/components/Home";
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.GOOGLE_CLIENT_ID as string;

const initialTodos: Todo[] = [];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SessionProvider>
      <GoogleOAuthProvider clientId={clientId}>
        {isAuthenticated ? (
          <Home initialTodos={initialTodos} />
        ) : (
          <LandingPage setIsAuthenticated={setIsAuthenticated} />
        )}
      </GoogleOAuthProvider>
    </SessionProvider>
  );
}
