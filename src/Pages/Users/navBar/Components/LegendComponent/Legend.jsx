// For all menus, add a function where the menus will disappear when the user click outside

/* 
-- Files where UserDropdown is imported --
NavigationModule.jsx

*/

import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate, } from 'react-router-dom';
import { useAuth } from '/src/Pages/Admin/ACMfiles/authContext';

import icons from '../../../../../assets/for_landingPage/Icons.jsx';
import styles from './styles/legendStyles.module.scss';

export default function Legend() {
    
    return (
        <>
            <AnimatePresence>
                    <motion.div
                        className = { styles.compassLegendCont }
                        // initial = {window.innerWidth > 992 ? {opacity: 0, translateY: 70, translateX: -37} : {opacity: 0, translateY: 70, translateX: -10}}
                        // animate = {window.innerWidth > 992 ? {opacity: 1, translateY: 120} : {opacity: 1, translateY: 100}}
                        // exit = {{opacity: 0, translateY: 70}}
                        // transition = {{ duration: 0.3, ease: "easeInOut"}}
                    
                    >   
                        
                        <div className = { styles.content } >
                            <div className = { styles.compass }>
                                <img className = { `${styles.icon} ${styles.compass}` } src = { icons.compass } alt = "Compass"/>
                            </div>
                            <section className = { styles.legend }>
                                <div className = { styles.header }>
                                    <span className = { styles.txtTitle }>
                                        Map Legend
                                    </span> 
                                </div>
                                <ul className = { styles.legendList }>
                                    <li>
                                        <span className = { styles.text }>
                                            Fish/Prawn Culture
                                        </span>
                                        <img className = { `${styles.icon} ${styles.signin}` } src = {icons.location} alt = "Signin"/>
                                    </li>
                                    <li>
                                        <span className = { styles.text }>
                                            Feathered Place
                                        </span>
                                        <img className = { `${styles.icon} ${styles.signin}` } src = {icons.location} alt = "Signin"/>
                                    </li>
                                    <li>
                                        <span className = { styles.text }>
                                            Bahay Kubo
                                        </span>
                                        <img className = { `${styles.icon} ${styles.signin}` } src = {icons.location} alt = "Signin"/>
                                    </li>
                                    <li>
                                        <span className = { styles.text }>
                                            House of Greens
                                        </span>
                                        <img className = { `${styles.icon} ${styles.signin}` } src = {icons.location} alt = "Signin"/>
                                    </li>
                                    <li>
                                        <span className = { styles.text }>
                                            Urban Garden
                                        </span>
                                        <img className = { `${styles.icon} ${styles.signin}` } src = {icons.location} alt = "Signin"/>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </motion.div>
            </AnimatePresence>
        </>
    )
}