import "./ImagesContainer.css";

const ImagesContainer = ({ spot }) => (
  <div id="images-container">
    <div id="image-large-container">
      <img
        className="image-large"
        src={spot.SpotImages[0]?.url}
        alt={spot.name}
      />
    </div>
    {spot.SpotImages.length >= 5 && (
      <div id="images-small-container">
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
    )}
  </div>
);

export default ImagesContainer;
