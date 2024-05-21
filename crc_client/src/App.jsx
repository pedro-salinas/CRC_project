// React
import { useEffect } from "react";

// Navegacion
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Index
import { Index } from "./pages/index/Index";
import { Attention } from "./pages/index/Attention";

//Admin
import { Login } from "./pages/admin/Login";
import { Users } from "./pages/admin/Users";
import { Kines } from "./pages/admin/Kines";
import { Clients } from "./pages/admin/Clients";
import { Programs } from "./pages/admin/Programs";
import { Attentions } from "./pages/admin/Attentions";
import { AttentionsTablePage } from "./pages/admin/AttentionsTablePage";

// Utilidad
import { ConfirmEmail } from "./pages/extra/ConfirmEmail";

// Contexto
import { UserProvider } from "./context/userContext";

import "./App.css";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
    useEffect(() => {
        if (window.location.hostname === "wwww.crckinesiologia.cl") {
            window.location.href =
                "https://crckinesiologia.cl" + window.location.pathname;
        }
    }, []);
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    {/* Ruta que no exista dirige a index */}
                    <Route path="*" element={<Navigate to="index" />} />
                    {/* Ruta por defecto vacia dirige a index */}
                    <Route path="/" element={<Navigate to="index" />} />
                    <Route path="/index" element={<Index />} />
                    {/* <Route path="/attention" element={<Attention />} /> */}
                    <Route path="/confirm" element={<ConfirmEmail />} />

                    <Route path="/admin/login" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/admin" element={<Attentions />} />
                        <Route
                            path="/admin/*"
                            element={<Navigate to="/admin" />}
                        />
                        <Route path="/admin/users" element={<Users />} />
                        <Route path="/admin/kines" element={<Kines />} />
                        <Route path="/admin/clients" element={<Clients />} />
                        <Route path="/admin/programs" element={<Programs />} />
                        <Route
                            path="/admin/attentions"
                            element={<Attentions />}
                        />
                        <Route
                            path="/admin/attentionstable"
                            element={<AttentionsTablePage />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
