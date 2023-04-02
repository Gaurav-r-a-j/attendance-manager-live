import React, { createContext, useContext, useState } from "react";


const ThemeContext = createContext()

// const intitalState = {
//     chat: false,
//     cart: false,
//     userProfile: false,
//     notification: false
// }

export const ThemeContextProvider = ({ children }) => {

    // const [activeMenu, setActiveMenu] = useState(true)
    // const [isClicked, setIsClicked] = useState(intitalState)
    const [currentColor, setCurrentColor] = useState("#03C9D7")
    const [currentMode, setCurrentMode] = useState("Light")
    const [themeSettings, setThemeSettings] = useState(false)

    const setMode = (mode) => {
        setCurrentMode(mode)
        localStorage.setItem('themeMode', mode)
        setThemeSettings(false)
        if (mode === "Dark")
            document.documentElement.style.setProperty('--main-color', "black");
        else
            document.documentElement.style.setProperty('--main-color', currentColor);



    }

    const setColor = (color) => {
        setCurrentColor(color)
        localStorage.setItem('colorMode', color)
        setThemeSettings(false)
        document.documentElement.style.setProperty('--main-color', color);

    }


    // const handleClick = (clicked) => {
    //     console.log(clicked)
    //     setIsClicked({ ...intitalState, [clicked]: true })
    // }

    return (
        <ThemeContext.Provider
            value={{
                // activeMenu,
                // setActiveMenu,
                // isClicked,
                // setIsClicked,
                // handleClick,
                // screenSize,
                // setScreenSize,
                currentColor,
                currentMode,
                setMode,
                setColor,
                themeSettings,
                setThemeSettings

            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext)