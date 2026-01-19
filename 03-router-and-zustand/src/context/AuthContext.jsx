import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const handleLogin = () => setIsLoggedIn(true);
    const handleLogOut = () => setIsLoggedIn(false);

    const value = {
        isLoggedIn,
        handleLogin,
        handleLogOut
    }

    return <AuthContext value={value}>
                {children}
            </AuthContext>
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider')
    }

    return context;
}