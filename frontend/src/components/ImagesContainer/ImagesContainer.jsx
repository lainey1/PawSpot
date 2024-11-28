import { useState } from "react";
import "./ImagesContainer.css";

const ImagesContainer = ({ spot }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

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
    <div className="images-container">
      <div className="image-large-container">
        <img
          className="image-large"
          src={spot.SpotImages[0]?.url}
          alt={spot.name}
          onClick={() => openModal(0)}
        />
      </div>
      {spot.SpotImages.length >= 5 && (
        <div className="images-small-container">
          <div className="images-small-row">
            {spot.SpotImages.slice(1, 3).map((image, index) => (
              <img
                key={index}
                src={image?.url}
                className="image-small"
                alt={`Small Image ${index + 1}`}
                onClick={() => openModal(index + 1)}
              />
            ))}
          </div>
          <div className="images-small-row">
            {spot.SpotImages.slice(3, 5).map((image, index) => (
              <img
                key={index}
                src={image?.url}
                className="image-small"
                alt={`Small Image ${index + 3}`}
                onClick={() => openModal(index + 3)}
              />
            ))}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="image-viewer-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="image-count">
              {currentIndex + 1}/{spot.SpotImages.length}
            </div>
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
      )}
    </div>
  );
};

export default ImagesContainer;
