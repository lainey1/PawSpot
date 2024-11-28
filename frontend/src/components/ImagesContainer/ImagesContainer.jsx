import { useState } from "react";
import ImageViewer from "../ImageViewer";
import "./ImagesContainer.css";
import "../ImageViewer/ImageViewer.css";

const ImagesContainer = ({ spot }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
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

      {isModalOpen && <ImageViewer values={{ spot, setIsModalOpen }} />}
    </div>
  );
};

export default ImagesContainer;
