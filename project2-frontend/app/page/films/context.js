'use client'
import { createContext, useState } from "react";

export const FilmContext = createContext();
export const FilmContextProvider = ({ children }) => {
    const [yearActive, setYearActive] = useState(0);

    return (
        <FilmContext.Provider value={{ yearActive, setYearActive }}>
            {children}
        </FilmContext.Provider>
    );
};