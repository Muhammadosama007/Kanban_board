import React, { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false); 
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    return (
        <TokenContext.Provider value={{ token, login, loading }}>
            {!loading && children}
        </TokenContext.Provider>
    );
};
