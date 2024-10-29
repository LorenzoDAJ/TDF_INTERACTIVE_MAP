import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import ArrowIcon from '../../../assets/actions/Arrow_icon.png';
import styles from '/src/Pages/Admin/edit/styles/ModalsEdit.module.scss'; // Ensure you have proper CSS

import { motion, AnimatePresence } from 'framer-motion'
import images from '../../../assets/for_landingPage/Images';
import NavBar from './navBar/NavBar';
import AccessBtn from '/src/Pages/Users/landing/signInModule/AccessBtn'; // Import the new AccessBtn component
import '/src/Pages/Users/landing/signInModule/AccessBtn.module.scss';

const Modal = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [modals, setModals] = useState([]); // Store all modals
  const [currentModal, setCurrentModal] = useState(null); // Store selected modal for editing
  const [description, setDescription] = useState('');
  const [originalModalImages, setOriginalModalImages] = useState([]); // To store original images
  const [modalImages, setModalImages] = useState([]);
  const [modalImagePreviews, setModalImagePreviews] = useState([]);

  // Fetch all modals on component mount
  useEffect(() => {
    const fetchModals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/modal');
        setModals(response.data); // Set the fetched modals
      } catch (error) {
        console.error('Error fetching modals:', error);
      }
    };
    fetchModals();
  }, []);

// Handle file changes
const handleModalFileChange = (e) => {
  const fileArray = Array.from(e.target.files);

  // Allowed image types
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  // Check for unsupported files
  const unsupportedFiles = fileArray.filter(file => !allowedTypes.includes(file.type));

  if (unsupportedFiles.length > 0) {
    alert('Unsupported file format. Only JPG, JPEG, and PNG images are allowed.');
    return; // Prevent the reload, just return
  }

  // Check if selected files are within the range
  if (fileArray.length < 3 || fileArray.length > 5) {
    alert('Please upload between 3 to 5 images.');
    return; // Prevent the reload, just return
  }

  // Update state with valid files and their preview URLs
  setModalImages(fileArray); // Store actual files for submission
  setModalImagePreviews(fileArray.map(file => URL.createObjectURL(file))); // Generate preview URLs

};
  // Function to handle the close modal action
  const closeModal = () => {
    setCurrentModal(null); // Close the modal by clearing the current modal
  };

  const handleEditClick = (modal) => {
    setCurrentModal(modal);
    setDescription(modal.description);

    // Fetch and set image previews
    const imagePreviews = modal.modalImages
      ? modal.modalImages.map((img) => `http://localhost:5000/uploads/modalImages/${img}`)
      : [];

    setModalImagePreviews(imagePreviews);
  };

// Working handle submit prevents saving if teheres no changes in desc. or images of Modal
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    if (!currentModal) {
      alert('No modal is currently selected for editing.');
      return;
    }
    const originalModal = currentModal; // Get the original modal data
    let changesMade = false; // Flag to track if any changes are made
  
    // Check if there are changes in the description
    const descriptionChanged = description !== originalModal.description;
  
    // Extract image names from the original image URLs
    const currentImageSet = modalImages.map(file => file.name); // Get the current file names
    const originalImageSet = originalModalImages; // Get the original image names

    // Check if any images have changed
    const imagesChanged = currentImageSet.length !== originalImageSet.length ||
                          currentImageSet.some((img, index) => img !== originalImageSet[index]);

    console.log("Original Image Set:", originalImageSet);
    console.log("Current Image Set:", currentImageSet);
    console.log("Changes made:", imagesChanged);
    
    // Set changesMade to true if any changes are detected
    if (descriptionChanged || imagesChanged) {
      changesMade = true;
    }
    // Show debug information
    console.log('Changes made:', changesMade);
    console.log('Description changed:', descriptionChanged);
    console.log('Images changed:', imagesChanged);
  
    if (changesMade) {
      try {
        const formData = new FormData();
        formData.append('title', originalModal.title); // Keep the fixed title
        formData.append('description', description); // Update the description
  
        // Append the new modal images to the FormData
        modalImages.forEach((image) => {
          if (image) {
            formData.append('modalImages', image); // Include each image file
          }
        });
        // Send the PUT request to update the modal data
        const response = await axios.put(`http://localhost:5000/api/modal/${currentModal._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          alert('Modal data saved successfully!');
          window.location.reload(); // Reload the page after successful save
        } else {
          throw new Error('Failed to update modal data');
        }
      } catch (error) {
        console.error('Error updating modal data:', error);
        alert('Error saving data. Please try again.');
      }
    } else {
      alert('No changes detected in modal data'); // Show message if no changes were detected
    }
  };
  
  const navigate = useNavigate();
  const handleBackClick  = () => {
    navigate(`/map`); // Navigate to the specific card display page
  };
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  // Get the root ID and and apply className 
  useEffect(() => {
    const rootDiv = document.getElementById("root");

    // Add or remove className based on current page

    if (location.pathname === "/modal") {
      rootDiv.classList.add(styles.rootDiv);
    } else {
      rootDiv.classList.remove(styles.rootDiv);
    }
  }, [location])

  // resize textarea based on content
    const descriptionRef = useRef(null);
    const technologiesRef = useRef(null);
  
    const adjustHeight = (ref) => {
      if (ref && ref.current) {
        ref.current.style.height = 'auto'; // Reset height
        ref.current.style.height = `${ref.current.scrollHeight}px`; // Set height to scroll height
      }
    };

    // switch description or technologies
    const [isInfo, setIsInfo] = useState(false);

    const handleInfoBtn = () => {
      setIsInfo(!isInfo);
    }

    //for description
    useEffect(() => {
      if (!isInfo) {
        adjustHeight(descriptionRef);
      }
      
    }, [isInfo, description]);

    //for technologies
    useEffect(() => {
      if (isInfo) {
        adjustHeight(technologiesRef);
      }
    }, [isInfo, description]);

  return (
  <>
    <NavBar />  
  
    <div className = { styles.modalContainer }>
      <div className = { styles.header }>
        <span className = { styles.txtTitle }>EDIT MODAL</span>
      </div>

      <span className = { `${ styles.txtTitle} ${ styles.listHeader }` }>Select Modal</span>
      <div className={styles.modalsList}>
        {modals.map((modal) => (
          <div className = { styles.infoContainer } key={modal._id}>
            <span className = { styles.txtTitle }>{modal.title}</span>
            <button onClick={() => handleEditClick(modal)}>Edit</button>
          </div>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {currentModal && (
          <motion.div 
            className={styles.modalEditingSection}
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit = {{opacity: 0}}
            transition = {{duration: 0.2, ease: "easeInOut"}}
          >
            <div className={styles.modal}>
              <label className = { styles.headerBg }>
                <span className = { styles.txtTitle }>{currentModal.title}</span>
              </label>

              {/* image container */}
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

              {/* Description and technologies */}
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
                      onAnimationComplete={() => adjustHeight(descriptionRef)}
                    >
                      <textarea 
                        ref = {descriptionRef}
                        row = "1"
                        className = { styles.txtSubTitle } 
                        value = {description}
                        onInput={() => adjustHeight(descriptionRef)}
                        onChange={(e) => setDescription(e.target.value)}
                        required  
                      />
                      
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
                      onAnimationComplete={() => adjustHeight(technologiesRef)}
                    >
                      <textarea 
                        ref = {technologiesRef}
                        row = "1"
                        className ={ styles.txtSubTitle }
                        value = {description}
                        onInput={() => adjustHeight(technologiesRef)}
                        onChange={(e) => setDescription(e.target.value)}
                        required 
                      />

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
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  </div>

      {/* <div className={styles.modalBackdrop}>
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
                  {/* placeholder 
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
                    {isPlaying && <span> Playing...</span>} {/* Optional message
                  </motion.button>
                )} 
              </AnimatePresence>
              
          </div>
        </div> */}
  </>
  );
};

export default Modal;
