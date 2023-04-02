import React, { useEffect } from 'react'
import { useThemeContext } from '../../context/ThemProvider'
import ThemeSettings from '../Theme/ThemeSettings'
import './Footer.css'

const Footer = () => {
  // const { currentColor, currentMode, setMode, setColor, themeSettings, setThemeSettings } = useThemeContext()
  const { currentColor, setColor, setMode, themeSettings, setThemeSettings } = useThemeContext()


  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor) {
      setColor(currentThemeColor);
    } if (currentThemeMode) {
      setMode(currentThemeMode);
    }
  }, []);// eslint-disable-next-line 


  return (
    <>
      {/* <ThemeSettings open={themeSettings} onClose={() => setThemeSettings(false)} /> */}
      {themeSettings && <ThemeSettings />}
      <div className="footer">
        &#169; {new Date().getFullYear()} All rights reserved by ADG.com
      </div>


      <button
        style={{ background: currentColor }}
        onClick={() => setThemeSettings(true)}
        className="theme-settings-button d-flex-center">
        <span className="material-icons">
          settings
        </span>
      </button>

    </>
  )
}

export default Footer