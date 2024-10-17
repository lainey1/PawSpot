// frontend/src/components/SpotDetail.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SpotDetail.css";

const SpotDetail = () => {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchSpot = async () => {
      const response = await fetch(`/api/spots/${spotId}`);
      const data = await response.json();
      setSpot(data);
    };

    fetchSpot();
  }, [spotId]);

  if (!spot) return <div>Loading...</div>;

  const handleReserveClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="spot-detail-container">
      <div className="details-container">
        <h2>{spot.name}</h2>
        <p className="spot-location">
          Location: {spot.city}, {spot.state}, {spot.country}
        </p>

        <div className="images-container">
          <img
            className="large-image"
            src={spot.SpotImages[0]?.url}
            alt={spot.name}
          />
          <div className="small-images">
            {spot.SpotImages.slice(1, 5).map((image) => (
              <img
                key={image.id}
                className="small-image"
                src={image.url}
                alt={`Thumbnail`}
              />
            ))}
          </div>
        </div>

        <span className="third-layer">
          <div className="spot-double-click">
            <p className="host-info">
              Hosted by: {spot.Owner.firstName} {spot.Owner.lastName}
            </p>

            <p>{spot.description}</p>
          </div>

          <div className="bookit-sidebar">
            <p className="price">${spot.price} per night</p>
            <button className="reserve-button" onClick={handleReserveClick}>
              Reserve
            </button>
            {showAlert && (
              <span className="alert-message">Feature Coming Soon...</span>
            )}
          </div>
        </span>
      </div>
    </div>
  );
};

export default SpotDetail;
