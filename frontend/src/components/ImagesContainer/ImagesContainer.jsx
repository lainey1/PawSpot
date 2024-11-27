import "./ImagesContainer.css";

const ImagesContainer = ({ spot }) => (
  <div className="images-container">
    <div className="image-large-container">
      <img
        className="image-large"
        src={spot.SpotImages[0]?.url}
        alt={spot.name}
      />
    </div>
    <div className="images-small-container">
      <div className="images-small-row">
        {spot.SpotImages.slice(1, 3).map((image, index) => (
          <img
            key={index}
            src={image?.url}
            className="image-small"
            alt={`Small Image ${index + 1}`}
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
          />
        ))}
      </div>
    </div>
  </div>
);

export default ImagesContainer;
