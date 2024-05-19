import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useUserContext } from "./context/userContext";

export function ProtectedRoute() {
    const { isAuthenticated, loading } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/admin/login", { replace: true });
        }
    }, [loading, isAuthenticated, navigate]);

    // if (loading) {
    //     // Puedes mostrar un indicador de carga mientras se verifica la autenticación
    //     return <div>Cargando...</div>;
    // }

    if (!isAuthenticated) {
        // No está autenticado, no renderizar nada hasta después de la redirección
        return null;
    }

    // Usuario autenticado, renderizar Outlet para mostrar los componentes protegidos
    return <Outlet />;
}
