import React from 'react'
import MainCard from '../../components/MainCard/MainCard'
import UserBackground from '../../components/UserBackground/UserBackground'
import { useThemeContext } from '../../context/ThemProvider'
import './Home.css'
const Home = () => {
    const { currentMode, currentColor } = useThemeContext()
    return (
        <div
            // style={{"--colorValue":currentColor}}
            style={{ background: currentMode === "Dark" ? "black" : currentColor }}
            className="home">
            <UserBackground />
            <section
                className="subject-section-bg ">
                <div className="subject-section pdl">
                    <h2
                        style={{ color: currentMode === "Dark" ? currentColor : "white" }}
                        className='d-flex-center gaps'>
                        <span className="material-icons">
                            description
                        </span>
                        Subjects
                    </h2>
                    <div className="subjects  gapl">
                        <MainCard
                            subjectName="DAA"
                            present={13}
                            total={17}
                        />
                        <MainCard
                            subjectName="OS"
                            present={11}
                            total={12}
                        />
                        <MainCard
                            subjectName="Maths"
                            present={14}
                            total={20}
                        />
                        <MainCard
                            subjectName="CC"
                            present={10}
                            total={28}
                        />
                        <MainCard
                            subjectName="Python"
                            present={43}
                            total={48}
                        />
                        <MainCard
                            subjectName="Social Eng."
                            present={23}
                            total={28}
                        />
                        <MainCard
                            subjectName="SEPM"
                            present={24}
                            total={30}
                        />
                        <MainCard
                            subjectName="Critical"
                            present={10}
                            total={20}
                        />
                        <MainCard
                            subjectName="EVS"
                            present={13}
                            total={18}
                        />

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home