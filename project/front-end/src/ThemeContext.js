import React, { useState, createContext } from 'react'

export const ThemeContext= createContext();

const ThemeContextProvider = (props) => {
    const [theme, setTheme] = useState(true)

    const toggleTheme = () => {
        setTheme("dark")
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
