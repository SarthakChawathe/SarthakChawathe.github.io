import React, { useState } from 'react';
import './services.css';
import { HiOutlineClipboardList, HiOutlineArrowSmRight, HiOutlineCheckCircle, HiX } from 'react-icons/hi';
import HackerRank from '../../assets/img2/Certifications/Certificate Images/HackerRank_logo.png';
import Google from '../../assets/img2/Certifications/Certificate Images/Google_logo.png';
import Microsoft from '../../assets/img2/Certifications/Certificate Images/Microsoft_logo.png';
import IBM from '../../assets/img2/Certifications/Certificate Images/IBM_logo.png';
import IUB from '../../assets/img2/Certifications/Certificate Images/IU_logo.jpeg';
import HC from '../../assets/img2/Certifications/Certificate Images/HC_logo.png';
import Internshala from '../../assets/img2/Certifications/Certificate Images/Internshala_logo.png';


const Services = () => {
    const [toggleState, setToggleState] = useState(0);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
    <section className="services section" id="services">
        <h2 className="section__title">Achievements</h2>
        <span className="section__subtitle">Personal Accomplishment</span>
    
        <div className="services__container container grid">

            <div className="services__content">
                <div>
                    {/* <HiOutlineClipboardList className="services__icon" /> */}
                    <img src={HackerRank} alt="Web + App Developer" className="services__img"/>
                    <h3 className="services__title">SQL <br />Intermediate</h3>
                </div>
                {/* <span className="services__button" onClick={() => toggleTab(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </span> */}
                <a href="https://www.hackerrank.com/certificates/f80b4e156b6c" className="services__button" target="_blank" rel="noopener noreferrer">
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </a>
                {/* <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                    <div className="services__modal-content">
                        <HiX onClick={() => toggleTab(0)} className="services__modal-close" />
                        <h3 className="services__modal-title">Developer</h3>
                        <p className="services__modal-description">
                            Over 3 years of experience in web development providing quality work.
                        </p>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Web page and app development
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Integrate creative colloboration
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Provide product mockups
                                </p>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </div>

            <div className="services__content">
                <div>
                    {/* <HiOutlineClipboardList className="services__icon" /> */}
                    <img src={HackerRank} alt="Web + App Developer" className="services__img"/>
                    <h3 className="services__title">SQL <br />Basic</h3>
                </div>
                {/* <span className="services__button" onClick={() => toggleTab(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </span> */}
                <a href="https://www.hackerrank.com/certificates/030cd46b2763" className="services__button" target="_blank" rel="noopener noreferrer">
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </a>
                {/* <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                    <div className="services__modal-content">
                        <HiX onClick={() => toggleTab(0)} className="services__modal-close" />
                        <h3 className="services__modal-title">Developer</h3>
                        <p className="services__modal-description">
                            Over 3 years of experience in web development providing quality work.
                        </p>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Web page and app development
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Integrate creative colloboration
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Provide product mockups
                                </p>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </div>

            <div className="services__content">
                <div>
                    {/* <HiOutlineClipboardList className="services__icon" /> */}
                    <img src={IUB} alt="Web + App Developer" className="services__img"/>
                    <h3 className="services__title">Luddy<br />Hackathon</h3>
                </div>
                {/* <span className="services__button" onClick={() => toggleTab(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </span> */}
                <a href="https://drive.google.com/file/d/1dXtndgxa0qz-QAsd3p1KFVHgDPunXxeO/view" className="services__button" target="_blank" rel="noopener noreferrer">
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </a>
                {/* <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                    <div className="services__modal-content">
                        <HiX onClick={() => toggleTab(0)} className="services__modal-close" />
                        <h3 className="services__modal-title">Developer</h3>
                        <p className="services__modal-description">
                            Over 3 years of experience in web development providing quality work.
                        </p>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Web page and app development
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Integrate creative colloboration
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Provide product mockups
                                </p>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </div>

            <div className="services__content">
                <div>
                    {/* <HiOutlineClipboardList className="services__icon" /> */}
                    <img src={HC} alt="Web + App Developer" className="services__img"/>
                    <h3 className="services__title">Sentiment<br />Analysis</h3>
                </div>
                {/* <span className="services__button" onClick={() => toggleTab(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </span> */}
                <a href="https://hicounselor.com/certificate/verify/MjI3MjAxNTE=?app_type=VFBT" className="services__button" target="_blank" rel="noopener noreferrer">
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </a>
                {/* <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                    <div className="services__modal-content">
                        <HiX onClick={() => toggleTab(0)} className="services__modal-close" />
                        <h3 className="services__modal-title">Developer</h3>
                        <p className="services__modal-description">
                            Over 3 years of experience in web development providing quality work.
                        </p>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Web page and app development
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Integrate creative colloboration
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Provide product mockups
                                </p>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </div>

            <div className="services__content">
                <div>
                    {/* <HiOutlineClipboardList className="services__icon" /> */}
                    <img src={Google} alt="Web + App Developer" className="services__img"/>
                    <h3 className="services__title">Google Data <br />Analytics</h3>
                </div>
                {/* <span className="services__button" onClick={() => toggleTab(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </span> */}
                <a href="https://www.coursera.org/account/accomplishments/professional-cert/X5NYS6HAMN5Q" className="services__button" target="_blank" rel="noopener noreferrer">
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </a>
                {/* <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                    <div className="services__modal-content">
                        <HiX onClick={() => toggleTab(0)} className="services__modal-close" />
                        <h3 className="services__modal-title">Developer</h3>
                        <p className="services__modal-description">
                            Over 3 years of experience in web development providing quality work.
                        </p>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Web page and app development
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Integrate creative colloboration
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Provide product mockups
                                </p>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </div>

            <div className="services__content">
                <div>
                    {/* <HiOutlineClipboardList className="services__icon" /> */}
                    <img src={IBM} alt="Web + App Developer" className="services__img"/>
                    <h3 className="services__title">IBM Data <br /> Science</h3>
                </div>
                {/* <span className="services__button" onClick={() => toggleTab(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </span> */}
                <a href="https://drive.google.com/file/d/1nSImEWf8oUjTUZtmi4RktJOtSVcjuG90/view" className="services__button" target="_blank" rel="noopener noreferrer">
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </a>
                {/* <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                    <div className="services__modal-content">
                        <HiX onClick={() => toggleTab(0)} className="services__modal-close" />
                        <h3 className="services__modal-title">Developer</h3>
                        <p className="services__modal-description">
                            Over 3 years of experience in web development providing quality work.
                        </p>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Web page and app development
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Integrate creative colloboration
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Provide product mockups
                                </p>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </div>            
            
            <div className="services__content">
                <div>
                    {/* <HiOutlineClipboardList className="services__icon" /> */}
                    <img src={Microsoft} alt="Web + App Developer" className="services__img"/>
                    <h3 className="services__title">Microsoft Technology <br /> Associate</h3>
                </div>
                {/* <span className="services__button" onClick={() => toggleTab(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </span> */}
                <a href="https://drive.google.com/file/d/1FTuVhSD7P7H5n3g7lcVr2XG34TJEpRRF/view" className="services__button" target="_blank" rel="noopener noreferrer">
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </a>
                {/* <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                    <div className="services__modal-content">
                        <HiX onClick={() => toggleTab(0)} className="services__modal-close" />
                        <h3 className="services__modal-title">Developer</h3>
                        <p className="services__modal-description">
                            Over 3 years of experience in web development providing quality work.
                        </p>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Web page and app development
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Integrate creative colloboration
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Provide product mockups
                                </p>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </div>   

            <div className="services__content">
                <div>
                    {/* <HiOutlineClipboardList className="services__icon" /> */}
                    <img src={Internshala} alt="Web + App Developer" className="services__img"/>
                    <h3 className="services__title">Programming with<br />Python</h3>
                </div>
                {/* <span className="services__button" onClick={() => toggleTab(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </span> */}
                <a href="https://drive.google.com/file/d/1aOC6Zn3AR-JacNDKA7A5JQvuT1ztZwM5/view" className="services__button" target="_blank" rel="noopener noreferrer">
                    View More
                    <HiOutlineArrowSmRight className="services__button-icon" />
                </a>
                {/* <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                    <div className="services__modal-content">
                        <HiX onClick={() => toggleTab(0)} className="services__modal-close" />
                        <h3 className="services__modal-title">Developer</h3>
                        <p className="services__modal-description">
                            Over 3 years of experience in web development providing quality work.
                        </p>
                        <ul className="services__modal-services grid">
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Web page and app development
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Integrate creative colloboration
                                </p>
                            </li>
                            <li className="services__modal-service">
                                <HiOutlineCheckCircle className="services__modal-icon" />
                                <p className="services__modal-info">
                                    Provide product mockups
                                </p>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </div>  


            
        </div>
        
    </section>
  );
}

export default Services;


// import React, { useState } from 'react';
// import './services.css';
// import { HiOutlineClipboardList, HiOutlineArrowSmRight, HiX } from 'react-icons/hi';
// import GoogleDataAnalytics from '../../assets/img2/Certifications/Certificate Images/Google Data Analytics_page-0001.jpg';

// const Services = () => {
//     const [toggleState, setToggleState] = useState(0);

//     const toggleTab = (index) => {
//         setToggleState(index);
//     };

//     return (
//     <section className="services section" id="services">
//         <h2 className="section__title">Achievements</h2>
//         <span className="section__subtitle">Personal Accomplishment</span>
    
//         <div className="services__container container grid">
//             <div className="services__content">
//                 <div>
//                     <img src={GoogleDataAnalytics} alt="Web + App Developer" className="services__img" />
//                 </div>
//                 <span className="services__button" onClick={() => toggleTab(1)}>
//                     View More
//                     <HiOutlineArrowSmRight className="services__button-icon" />
//                 </span>
//                 <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
//                     <div className="services__modal-content">
//                         <HiX onClick={() => toggleTab(0)} className="services__modal-close" />
//                         <img src="path_to_image_1.jpg" alt="Web + App Developer" className="services__modal-img" />
//                         <p className="services__modal-description">
//                             Over 3 years of experience in web development providing quality work.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className="services__content">
//                 <div>
//                     <img src="path_to_image_2.jpg" alt="UI/UX Designer" className="services__img" />
//                 </div>
//                 <span className="services__button" onClick={() => toggleTab(2)}>
//                     View More
//                     <HiOutlineArrowSmRight className="services__button-icon" />
//                 </span>
//                 <div className={toggleState === 2 ? "services__modal active-modal" : "services__modal"}>
//                     <div className="services__modal-content">
//                         <HiX onClick={() => toggleTab(0)} className="services__modal-close" />
//                         <img src="path_to_image_2.jpg" alt="UI/UX Designer" className="services__modal-img" />
//                         <p className="services__modal-description">
//                             Over 2 years of experience in UI/UX design providing quality work.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className="services__content">
//                 <div>
//                     <img src="path_to_image_3.jpg" alt="Digital Branding" className="services__img" />
//                 </div>
//                 <span className="services__button" onClick={() => toggleTab(3)}>
//                     View More
//                     <HiOutlineArrowSmRight className="services__button-icon" />
//                 </span>
//                 <div className={toggleState === 3 ? "services__modal active-modal" : "services__modal"}>
//                     <div className="services__modal-content">
//                         <HiX onClick={() => toggleTab(0)} className="services__modal-close" />
//                         <img src="path_to_image_3.jpg" alt="Digital Branding" className="services__modal-img" />
//                         <p className="services__modal-description">
//                             Over 3 years experience in branding providing quality work.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
        
//     </section>
//   );
// }

// export default Services;