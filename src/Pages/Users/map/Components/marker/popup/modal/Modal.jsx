import React, { useRef, useState } from 'react';
import axios from 'axios';
import icon from '/src/assets/Icon.js';
import Slider from 'react-slick';
import styles from './Modal.module.scss';

import { motion, AnimatePresence } from 'framer-motion'
import icons from '../../../../../../../assets/for_landingPage/Icons.jsx';
import images from '../../../../../../../assets/for_landingPage/Images.jsx';

const Modal = ({ onClose, details, modalData }) => {
  const audioRef = useRef(new Audio()); // Create a reference for the audio element
  const [isPlaying, setIsPlaying] = useState(false); // State to track if audio is playing

  const [isInfo, setIsInfo] = useState(false); // set which info to display

  const onClickAudio = async (modalId) => {
    if (!modalId) {
      console.error('No modal ID provided');
      return;
    }

    try {
      let audio = [];
      const response = await axios.get(`http://localhost:5000/api/audio`);
      audio = response.data;
      const playAudio = audio.find(obj => obj._id === modalId);

      if (playAudio && playAudio.filePath) {
        if (isPlaying) { // If audio is already playing, do not play again
          console.log('Audio is already playing.');
          return; 
        }

        audioRef.current.src = `http://localhost:5000/${playAudio.filePath}`; // Set audio source
        audioRef.current.play(); // Play the audio
        setIsPlaying(true); // Set audio state to playing
        console.log('Playing Audio:', playAudio.filePath);

        audioRef.current.onended = () => {
          setIsPlaying(false); // Reset state when audio ends
        };
      } else {
        console.error('Audio file not found.');
      }
    } catch (error) {
      console.error('Error fetching audio data:', error);
    }
  };

  const handleClose = () => {
    audioRef.current.pause(); // Pause the audio
    audioRef.current.currentTime = 0; // Reset to the beginning
    setIsPlaying(false); // Reset playback state
    onClose(); // Call the original onClose function
  };

  const handleInfoBtn = () => {
    setIsInfo(!isInfo);
  }

  const settings = { // Carousel settings
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log('Modal Data:', modalData);

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose}>
          <img src={icons.close} alt="close" />
        </button>

        <div className = { styles.headerBg }>
          <span className = { styles.txtTitle }>{modalData.title}</span>
        </div>

        <div className = { styles.imageContainer }>
          <div className = { styles.featuredImage }>
            <img src={images.image1}/>
          </div>
          <div className = { styles.sideImages}>
            <img src={images.image2}/>
            <img src={images.image2}/>
            <img src={images.image2}/>
          </div>
        </div>
      
        <div className = { isInfo ? `${ styles.infoContainer } ${ styles.active }` : styles.infoContainer }>
          <AnimatePresence mode="wait">
            {!isInfo && (
              <motion.div 
                className = { styles.description }
                key = {"description"}
                initial = {{opacity: 0}}
                animate = {{opacity: 1, transition: {delay: 0.2}}}
                exit = {{opacity: 0}}
                transition = {{duration: 0.2,  ease: "easeInOut"}}
              >
                <p className = { styles.txtSubTitle }>{modalData.description}</p>
                
                <div className = { styles.line }></div>
              </motion.div>
            )}
            
            {isInfo && (
              <motion.div 
                className = { styles.technologies }
                key = {"technologies"}
                initial = {{opacity: 0}}
                animate = {{opacity: 1, transition: {delay: 0.2}}}
                exit = {{opacity: 0}}
                transition = {{duration: 0.2, ease: "easeInOut"}}
              >
                <p className ={ styles.txtSubTitle }>
                  {/* placeholder */}
                  1. Somebullshit Somebullshit Somebullshit <br />
                  2. Somebullshit Somebullshit Somebullshit <br />
                  3. Somebullshit Somebullshit Somebullshit <br />
                  4. Somebullshit Somebullshit Somebullshit <br />
                </p>  

                <div className = { styles.line }></div>
              </motion.div>
            )}
            
          </AnimatePresence>
        
          <div className = { styles.infoBtn }>
              <ul className = { styles.btns }>
                <li>
                  <span 
                    className = { styles.descBtn }
                    onClick = { isInfo ? handleInfoBtn : undefined }
                  >
                    DESCRIPTION
                  </span>
                </li>
                <li>
                  <span 
                    className = { styles.techBtn }
                    onClick = { !isInfo ? handleInfoBtn : undefined }
                  >
                      TECHNOLOGIES
                  </span>
                </li>
              </ul>

              <AnimatePresence mode="wait">
                {!isInfo && (
                  <motion.button 
                    className = { styles.speaker } 
                    onClick={() => onClickAudio(modalData.modal_id)} 
                    disabled={isPlaying}
                    initial = {{opacity: 0}}
                    animate = {{opacity: 1, transition: {delay: 0.4}}}
                    exit = {{opacity: 0}}
                    transition = {{duration: 0.2, ease: "easeInOut"}}
                  >
                    <img class= { styles.icon } src={icon.actions.speaker} alt="speaker" />
                    {isPlaying && <span> Playing...</span>} {/* Optional message */}
                  </motion.button>
                )} 
              </AnimatePresence>
              
          </div>
        </div>
        
        
        {/* Carousel for images */}
        {/* <div className={styles.imgCont}>
          {modalData.modalImages && modalData.modalImages.length > 0 ? (
            <div className={styles.imageCarousel}>
              <Slider {...settings}>
                {modalData.modalImages.map((image, index) => (
                  <div key={index} className="slickSlide">
                    <img 
                      src={`http://localhost:5000/uploads/modalImages/${image}`}
                      alt={`Image ${index}`} 
                      className="carouselImage"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <center><p>No images available.</p></center>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
