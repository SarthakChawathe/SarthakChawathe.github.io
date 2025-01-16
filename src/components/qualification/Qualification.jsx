import React, { useState } from "react";
import "./qualification.css";
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineCalendar, HiOutlineUserGroup } from "react-icons/hi";
import IUImage from "../../assets/IU.jpeg"; 
import KJImage from "../../assets/KJSIT_2.jpeg"; 
import ChimeraImage from "../../assets/Chimera.jpeg"; 
import HCImage from "../../assets/HC.png"; 
// import TCSImage from "../../assets/tcs.png"; 
import CSIImage from "../../assets/CSI_Blue.jpeg"; 
import BerkshireImage from "../../assets/BH.png"; 
import AplusImage from "../../assets/Aplus.png"; 

const Qualification = () => {
    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        setToggleState(index);
    };
  
    return (
    <section className="qualification section" id = "qualification">
        <h2 className="section__title">Qualification</h2>
        <span className="section__subtitle">My Journey</span>

        <div className="qualification__container container">
            <div className="qualification__tabs">
                <div className={toggleState === 1 ? "qualification__button button--flex qualification__active" 
                    : "qualification__button button--flex"} onClick={() => toggleTab(1)}>
                    <HiOutlineAcademicCap className="qualification__icon" />
                    Education
                </div>
                <div className={toggleState === 2 ? "qualification__button button--flex qualification__active" 
                    : "qualification__button button--flex"} onClick={() => toggleTab(2)}>
                    <HiOutlineBriefcase className="qualification__icon" />
                    Experience
                </div>
                <div className={toggleState === 3 ? "qualification__button button--flex qualification__active" 
                    : "qualification__button button--flex"} onClick={() => toggleTab(3)}>
                    <HiOutlineUserGroup className="qualification__icon" />
                    Volunteer
                </div>
            </div>

            <div className="qualification__sections">
                <div className={toggleState === 1 ? "qualification__content qualification__content-active"
                    : "qualification__content"}>
                    <div className="qualification__data">
                        <div>
                        <img src={IUImage} alt="IU Logo" width="50px" height="50px" />  
                            <h3 className="qualification__title">Master of Science, Data Science</h3>
                            <span className="qualification__subtitle">Indiana University Bloomington</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                Aug 2022 - May 2024
                            </div>
                        </div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>
                    <div className="qualification__data">
                        <div></div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                        <div>
                            <img src={KJImage} alt="IU Logo" width="50px" height="50px" />
                            <h3 className="qualification__title">Bachelor of Engineering, Computer Engineering</h3>
                            <span className="qualification__subtitle">KJ Somaiya Institute of Technology - India</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                Aug 2015 - May 2019
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className={toggleState === 2 ? "qualification__content qualification__content-active"
                    : "qualification__content"}>
                    <div className="qualification__data">
                        <div>
                            <img src={BerkshireImage} alt="IU Logo" width="50px" height="50px" />
                            <h3 className="qualification__title">Data Scientist</h3>
                            <span className="qualification__subtitle">Berkshire Hathaway</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                July 2024 - Present
                            </div>
                        </div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>

                    <div className="qualification__data">
                        <div>
                            <img src={ChimeraImage} alt="IU Logo" width="50px" height="50px" />
                            <h3 className="qualification__title">Founding Machine Learning Engineer and Data Analyst</h3>
                            <span className="qualification__subtitle">OneChimera - California</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                May 2024 - Oct 2024
                            </div>
                        </div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>

                    <div className="qualification__data">
                        <div></div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                        <div>
                            <img src={IUImage} alt="IU Logo" width="50px" height="50px" /> 
                            <h3 className="qualification__title">Graduate Teaching Assistant</h3>
                            <span className="qualification__subtitle">Indiana University Bloomington - Indiana</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                Aug 2023 - May 2024
                            </div>
                        </div>
                    </div>

                    <div className="qualification__data">
                        <div>
                            <img src={HCImage} alt="IU Logo" width="50px" height="50px" /> 
                            <h3 className="qualification__title">Data Analyst</h3>
                            <span className="qualification__subtitle">HiCounselor - California</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                May 2023 - Aug 2023
                            </div>
                        </div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>

                    <div className="qualification__data">
                        <div>
                            <img src={AplusImage} alt="IU Logo" width="50px" height="50px" /> 
                            <h3 className="qualification__title">Data Analyst</h3>
                            <span className="qualification__subtitle">Aplus Datalytics - India</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                Jan 2019 - Jul 2022
                            </div>
                        </div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>

                    {/* <div className="qualification__data">
                        <div></div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                        <div>
                            <img src={TCSImage} alt="IU Logo" width="50px" height="50px" /> 
                            <h3 className="qualification__title">Assistant Systems Engineer</h3>
                            <span className="qualification__subtitle">Tata Consultancy Services - India</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                Jul 2019 - Dec 2020
                            </div>
                        </div>
                    </div> */}
                </div>

                <div className={toggleState === 3 ? "qualification__content qualification__content-active"
                    : "qualification__content"}>
                    <div className="qualification__data">
                        <div>
                            <img src={IUImage} alt="IU Logo" width="50px" height="50px" />
                            <h3 className="qualification__title">IUB National Table Tennis Team Member</h3>
                            <span className="qualification__subtitle">Indiana University Bloomington - Indiana</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                Aug 2023 - Present
                            </div>
                        </div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>
                    <div className="qualification__data">
                        <div></div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                        <div>
                            <img src={IUImage} alt="IU Logo" width="50px" height="50px" />  
                            <h3 className="qualification__title">IU Dining Student Worker</h3>
                            <span className="qualification__subtitle">Indiana University Bloomington - Indiana</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                Aug 2022 - Aug 2023
                            </div>
                        </div>
                    </div>
                    <div className="qualification__data">
                        <div>
                            <img src={KJImage} alt="IU Logo" width="50px" height="50px" />  
                            <h3 className="qualification__title">Mentor (Machine Learning & Big Data Analytics)</h3>
                            <span className="qualification__subtitle">KJ Somaiya Institute of Technology - India</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                Aug 2021 - May 2022
                            </div>
                        </div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>
                    <div className="qualification__data">
                        <div></div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                        <div>
                            <img src={CSIImage} alt="IU Logo" width="50px" height="50px" />  
                            <h3 className="qualification__title">Technical Team Member</h3>
                            <span className="qualification__subtitle">Computer Society of India - India</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                Aug 2015 - May 2019
                            </div>
                        </div>
                    </div>
                    <div className="qualification__data">
                        <div>
                            <img src={KJImage} alt="IU Logo" width="50px" height="50px" />  
                            <h3 className="qualification__title">Joint Sports Head</h3>
                            <span className="qualification__subtitle">KJ Somaiya Institute of Technology - India</span>
                            <div className="qualification__calendar">
                                <HiOutlineCalendar className="qualification__calendar-icon" />
                                Aug 2017 - May 2018
                            </div>
                        </div>
                        <div>
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> 
  );
}

export default Qualification;