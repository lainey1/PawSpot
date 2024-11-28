import { useState } from "react";
import "./ImagesContainer.css";
import "../ImageViewer/ImageViewer.css";

const ImageViewer = ({ spot, setIsModalOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentIndex(0);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? spot.SpotImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === spot.SpotImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-viewer-modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="nav-button prev-button" onClick={goToPrevious}>
          &#8249;
        </button>
        <img
          src={spot.SpotImages[currentIndex]?.url}
          alt={`Image ${currentIndex + 1}`}
          className="modal-image"
        />
        <button className="nav-button next-button" onClick={goToNext}>
          &#8250;
        </button>
        <button className="close-button" onClick={closeModal}>
          &times; Close
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;
