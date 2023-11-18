import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // revisar si existe un token en el localstorage

    // Login function
    const login = (userData) => {
        // creat userstorage,...
        setUser(userData);
    };

    // Logout function
    const logout = () => {
        // borrar userstorage
        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
