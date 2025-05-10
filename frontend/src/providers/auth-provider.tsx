'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { loginLoginAccessToken, usersReadUserMe, UserPublic } from "@/client";
import { createSession } from "@/app/lib/auth/sessions";

type AuthContextType = {
    user: UserPublic | null;
    isLoading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }){
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<UserPublic | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/check-session");
                const data = await response.json();

                if (data.isAuthenticated) {
                    setUser(data.user);
                } else if (pathname !== "/auth/login") {
                    router.push("/auth/login");
                }
            } catch (err) {
                setError("Session verification failed");
            } finally {
                setIsLoading(false);
            }
        };

        if (pathname !== "/auth/login") {
            checkAuth();
        } else {
            setIsLoading(false);
        }
    }, [pathname, router]);

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        setError("");

        try {
            const tokenResponse = await loginLoginAccessToken({
                body: { username, password, grant_type: "password" }
            });

            if (!tokenResponse.data) throw new Error("Authentication failed");

            const userResponse = await usersReadUserMe({
                headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
            });

            if (userResponse.data) {
                const { session, expiresAt } = await createSession(
                    tokenResponse.data.access_token,
                    userResponse.data._id,
                    userResponse.data.is_superuser
                );

                await fetch("/api/set-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ session, expiresAt })
                });

                setUser({
                    _id: userResponse.data._id,
                    username: userResponse.data.username,
                    email: userResponse.data.email,
                    is_active: userResponse.data.is_active,
                    is_superuser: userResponse.data.is_superuser
                });

                router.push("/dashboard");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Authentication failed");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        await fetch("/api/delete-session", { method: "POST" });
        setUser(null);
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}