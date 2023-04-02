import React, {  } from 'react'
import { useThemeContext } from '../../context/ThemProvider'
import { useUserContext } from '../../context/UserContext'
import './ProgressBar.css'

const ProgressBar = ({ percentage = 75, requiredValue = 75 }) => {
    const { currentColor } = useThemeContext()
    const { user } = useUserContext();

    // console.log(percentage)


    return (

        <div role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
                "--value": percentage,
                "--size": "100px",
                // "--primary": value >= requiredValue ? "#06C270" : "#d90000",
                "--primary": percentage >= user?.percentage_required ? currentColor !== "#181818" ? currentColor : "#06C270" : "red",
                "--secondary": "#333"
            }} />
    )
}

export default ProgressBar