// React
import { createContext, useState, useContext, useEffect } from "react";

// Cookies
import { useCookies } from "react-cookie";

// Api
import { verifyToken } from "../api/user";

// Context
export const UserContext = createContext();

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(
            "El uso del contexto debe ser usado por un proveedor de usuario"
        );
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [cookies] = useCookies();

    useEffect(() => {
        async function checkLogin() {
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
                return;
            }

            try {
                const res = await verifyToken(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);

                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                loading,
                setLoading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
