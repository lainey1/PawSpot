import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SpotDetail.css";
import { GoStarFill } from "react-icons/go";

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
    <div className="outer-container">
      <div className="spot-detail-container">
        <div className="details-container">
          <h2>{spot.name}</h2>
          <p className="spot-location">
            Location: {spot.city}, {spot.state}, {spot.country}
          </p>

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
                <img
                  src={spot.SpotImages[1]?.url}
                  className="image-small"
                  alt="Small Image 1"
                />
                <img
                  src={spot.SpotImages[2]?.url}
                  className="image-small"
                  alt="Small Image 2"
                />
              </div>
              <div className="images-small-row">
                <img
                  src={spot.SpotImages[3]?.url}
                  className="image-small"
                  alt="Small Image 3"
                />
                <img
                  src={spot.SpotImages[4]?.url}
                  className="image-small"
                  alt="Small Image 4"
                />
              </div>
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
              <div className="price-rating">
                <div className="price-container">
                  <span className="price-amount">${spot.price}</span>
                  <span className="price-per-night"> per night</span>
                </div>
                <div className="rating-average">
                  {spot.avgStarRating ? (
                    <>
                      <GoStarFill /> {spot.avgStarRating.toFixed(1)} ·{" "}
                      {spot.numReviews} reviews
                    </>
                  ) : (
                    <span className="ratings-number">0 reviews</span>
                  )}
                </div>
              </div>

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
    </div>
  );
};

export default SpotDetail;
