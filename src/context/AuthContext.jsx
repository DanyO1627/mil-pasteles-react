import { createContext, useContext, useEffect, useState } from "react";
import { loginUsuario } from "../services/usuariosApi";

// contexto que almacena al usuario logeado
const AuthContext = createContext();

// el use para usar después en todods lados
export const useAuth = () => useContext(AuthContext);

// provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // info del usuario
    const [token, setToken] = useState(null); // JWT
    const [isAdmin, setIsAdmin] = useState(false); // rol admin?
    const [loading, setLoading] = useState(true); // para evitar flashes raros

    // carga el usuario al iniciar la app (lo saca del local)
    useEffect(() => {
        const data = localStorage.getItem("usuarioActivo");
        if (data) {
            const parsed = JSON.parse(data);
            setUser(parsed);
            setToken(parsed.token);
            setIsAdmin(parsed.rol === "admin");
        }
        setLoading(false);
    }, []);

    // el login guarda usuario + token
    const login = async (email, clave) => {
        const data = await loginUsuario({ email, clave });

        localStorage.setItem("usuarioActivo", JSON.stringify(data));

        setUser(data);
        setToken(data.token);
        setIsAdmin(data.rol === "admin");
        return data;
    };

    // borra todo // CERRAR SESIÓN
    const logout = () => {
        localStorage.removeItem("usuarioActivo");
        setUser(null);
        setToken(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAdmin,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};