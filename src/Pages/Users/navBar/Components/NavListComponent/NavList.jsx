/* 
-- Files where NavList is imported --
NavigationModule.jsx

*/

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '/src/Pages/Admin/ACMfiles/authContext';
import { useLocation, useNavigate } from 'react-router-dom';

import icons from '../../../../../assets/for_landingPage/Icons.jsx';
import styles from './styles/navListStyles.module.scss';

export default function NavList ({ handleClickOutside, isHamClicked, isNavListClosed, handleModalClick, captureNavListClick }) {

    const location = useLocation();
    const { user: authUser } = useAuth();
    const user = location.state?.user || authUser;

    // closes the dropdown if the user clicked outside (anywhere in the screen except the dropdown)
    useEffect(function() {
        if (!isNavListClosed) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNavListClosed]);

    return (
        <>
        <AnimatePresence>
            {isHamClicked && (
                <motion.section 
                    id = "navigationList" 
                    className = { styles.navBarList }
                    initial = {(window.innerHeight > 800 && window.innerWidth > 992) ? {translateY: 120, translateX: 20, opacity: 0} : {translateY: 80, translateX: 20, opacity: 0}}
                    animate = {{opacity: 1,}}
                    exit = {{
                        opacity: 0, 
                        translateX: 20, 
                        transition: {
                            duration: 0.21, 
                            delay: user?.role === "staff" 
                                ? 1.26
                                : user?.role === "admin" 
                                ? 1.44
                                : 0.72, 
                            ease: "easeInOut"
                        }}
                    }
                    transition = {{duration: 0.4, ease: "easeInOut"}}
                >
                    {/* <div class = "minimize">min</div> [add it after main nav list is done] */}
                    <ul className = { styles.navList }> 
                        {/* Might not be neccessary. Consider removing */}
                        {/* {isHamClicked && (
                            <motion.li
                                key = {1}
                                initial = {{opacity: 0, translateY: -50}}
                                animate = {{opacity: 1, translateY: !isHamClicked ? -50 : 0}}
                                exit = {{opacity: 0, translateY: -50, transition: {duration: 0.2, delay: 0.18 * 4, ease: "easeInOut"}}}
                                transition = {{duration: 0.2, ease: "easeInOut"}}
                                
                            >
                                <img className = { `${styles.icon} ${styles.map}` } src = { icons.map } alt = "Map" />
                                <span className = { styles.text }>Map</span>
                            </motion.li>
                        )} */}
                        {isHamClicked && (
                            <motion.li 
                                key = {'newsAndEvents'}
                                onClick = { function() { handleModalClick(); captureNavListClick('newsAndEvents'); } }
                                initial = {{opacity: 0, translateY: -80}}
                                animate = {{opacity: 1, translateY: !isHamClicked ? -80 : 0}}//-80
                                exit = {{
                                    opacity: 0, 
                                    translateY: -80, 
                                    transition: {
                                        duration: 0.2, 
                                        delay: user?.role === "staff" 
                                            ? 0.18 * 6 
                                            : user?.role === "admin" 
                                            ? 0.18 * 7
                                            : 0.18 * 3, 
                                        ease: "easeInOut",
                                    }
                                }}
                                transition = {{duration: 0.2, delay: 0.18 * 1, ease: "easeInOut"}}
                            >
                                <img className = { `${styles.icon} ${styles.calendar}` } src = { icons.calendar } alt = "News and Events" />
                                <span className = { styles.text }>News and Events</span>
                            </motion.li>
                        )}
                        {isHamClicked && (
                            <motion.li 
                                key = {'aboutUs'}
                                onClick = { function() { handleModalClick(); captureNavListClick('aboutUs'); } }
                                initial = {{opacity: 0, translateY: -80}}
                                animate = {{opacity: 1, translateY: !isHamClicked ? -80 : 0}}
                                exit = {{
                                    opacity: 0, 
                                    translateY: -80, 
                                    transition: {
                                        duration: 0.2, 
                                        delay: user?.role === "staff" 
                                            ? 0.18 * 5 
                                            : user?.role === "admin" 
                                            ? 0.18 * 6
                                            : 0.18 * 2, 
                                        ease: "easeInOut",
                                    }
                                }}
                                transition = {{duration: 0.2, delay: 0.18 * 2, ease: "easeInOut"}}    
                            >
                                <img className = { `${styles.icon} ${styles.info}` } src = { icons.info } alt = "About Us" />
                                <span className = { styles.text }>About Us</span>
                            </motion.li>
                        )}
                        {isHamClicked && (
                            <motion.li 
                                key = {'contactUs'}
                                onClick = { function() { handleModalClick(); captureNavListClick('contactUs'); } }
                                initial = {{opacity: 0, translateY: -80}}
                                animate = {{opacity: 1, translateY: !isHamClicked ? -80 : 0}}
                                exit = {{
                                    opacity: 0, 
                                    translateY: -80, 
                                    transition: {
                                        duration: 0.2, 
                                        delay: user?.role === "staff" 
                                            ? 0.18 * 4 
                                            : user?.role === "admin" 
                                            ? 0.18 * 5
                                            : 0.18, 
                                        ease: "easeInOut",
                                    }
                                }}
                                transition = {{duration: 0.2, delay: 0.18 * 3, ease: "easeInOut"}}
                            >
                                <img className = { `${styles.icon} ${styles.contact}` } src = { icons.contact } alt = "Contact Us" />
                                <span className = { styles.text }>Contact Us</span>
                            </motion.li>
                        )}
                        {isHamClicked && (
                            <motion.li 
                                key = {'submitFeedback'}
                                onClick = { function() { handleModalClick(); captureNavListClick('submitFeedback'); } }
                                initial = {{opacity: 0, translateY: -80}}
                                animate = {{opacity: 1, translateY: !isHamClicked ? -80 : 0}}
                                exit = {{
                                    opacity: 0, 
                                    translateY: -80, 
                                    transition: {
                                        duration: 0.2, 
                                        delay: user?.role === "staff" 
                                            ? 0.18 * 3 
                                            : user?.role === "admin" 
                                            ? 0.18 * 4
                                            : 0, 
                                        ease: "easeInOut",
                                    }
                                }}
                                transition = {{duration: 0.2, delay: 0.18 * 4, ease: "easeInOut"}}
                            >
                                <img className = { `${styles.icon} ${styles.feedback}` } src = { icons.feedback } alt = "Submit Feedback" />
                                <span className = { styles.text }>Submit Feedback</span>
                            </motion.li>
                        )}
                        {/* Staff additional navigation options */}
                        {(user?.role === "staff" || user?.role === "admin") && (
                            <> {/* !IMPORTANT */}
                                {isHamClicked && (
                                    <motion.li 
                                        key = {'editCards'}
                                        onClick = {() => window.location.href = "/cards"}
                                        // onClick = { function() { handleModalClick(); captureNavListClick('submitFeedback'); } } //will not need modal onclick
                                        initial = {{opacity: 0, translateY: -80}}
                                        animate = {{opacity: 1, translateY: !isHamClicked ? -80 : 0}}
                                        exit = {{
                                            opacity: 0, 
                                            translateY: -80, 
                                            transition: {
                                                duration: 0.18, 
                                                delay: user?.role === "staff" ? 0.18 * 2 : 0.18 * 3,
                                                ease: "easeInOut"
                                            }}
                                        }
                                        transition = {{duration: 0.2, delay: 0.18 * 5, ease: "easeInOut"}}
                                    >
                                        <img className = { `${styles.icon} ${styles.feedback}` } src = { icons.card } alt = "Submit Feedback" />
                                        <span className = { styles.text }>Edit Cards</span>
                                    </motion.li>
                                )}
                                {isHamClicked && (
                                    <motion.li 
                                        key = {'Edit Modal'}
                                        onClick = {() => window.location.href = "/modal"}
                                        // onClick = { function() { handleModalClick(); captureNavListClick('submitFeedback'); } } //will not need modal onclick
                                        initial = {{opacity: 0, translateY: -80}}
                                        animate = {{opacity: 1, translateY: !isHamClicked ? -80 : 0}}
                                        exit = {{
                                            opacity: 0, 
                                            translateY: -80, 
                                            transition: {
                                                duration: 0.18, 
                                                delay: user?.role === "staff" ? 0.18 : 0.18 * 2,
                                                ease: "easeInOut"
                                            }}
                                        }
                                        transition = {{duration: 0.2, delay: 0.18 * 6, ease: "easeInOut"}}
                                    >
                                        <img className = { `${styles.icon} ${styles.feedback}` } src = { icons.edit } alt = "Submit Feedback" />
                                        <span className = { styles.text }>Edit Modal</span>
                                    </motion.li>
                                )}
                                {isHamClicked && (
                                    <motion.li 
                                        key = {'editAudio'}
                                        onClick = {() => window.location.href = "/audio"}
                                        // onClick = { function() { handleModalClick(); captureNavListClick('submitFeedback'); } } //will not need modal onclick
                                        initial = {{opacity: 0, translateY: -80}}
                                        animate = {{opacity: 1, translateY: !isHamClicked ? -80 : 0}}
                                        exit = {{
                                            opacity: 0, 
                                            translateY: -80, 
                                            transition: {
                                                duration: 0.18, 
                                                delay: user?.role === "staff" ? 0 : 0.18,
                                                ease: "easeInOut"
                                            }}
                                        }
                                        transition = {{duration: 0.2, delay: 0.18 * 7, ease: "easeInOut"}}
                                    >
                                        <img className = { `${styles.icon} ${styles.feedback}` } src = { icons.upload } alt = "Submit Feedback" />
                                        <span className = { styles.text }>Edit Audio</span>
                                    </motion.li>
                                )}
                            </>
                        )}
                        
                        {/* Admin additional navigation options */}
                        {user?.role === "admin" && (
                            <> {/* !IMPORTANT */}
                                {isHamClicked && (
                                    <motion.li 
                                        key = {'userManagement'}
                                        onClick = {() => window.location.href = "/usermanage"}
                                        // onClick = { function() { handleModalClick(); captureNavListClick('submitFeedback'); } } //will not need modal onclick
                                        initial = {{opacity: 0, translateY: -80}}
                                        animate = {{opacity: 1, translateY: !isHamClicked ? -80 : 0}}
                                        exit = {{
                                            opacity: 0, 
                                            translateY: -80, 
                                            transition: {
                                                duration: 0.18, 
                                                ease: "easeInOut"
                                            }}
                                        }
                                        transition = {{duration: 0.2, delay: 0.18 * 8, ease: "easeInOut"}}
                                    >
                                        <img className = { `${styles.icon} ${styles.feedback}` } src = { icons.profile } alt = "Submit Feedback" />
                                        <span className = { styles.text }>User Management</span>
                                    </motion.li>
                                )}
                            </>
                        )}
                        
                    </ul>
            </motion.section>
            )}
        </AnimatePresence>
        </>
    )
}