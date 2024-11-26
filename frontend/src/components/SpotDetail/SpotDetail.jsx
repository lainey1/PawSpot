import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import { fetchReviews } from "../../store/reviews";
import Reviews from "../SpotReviews";
import "./SpotDetail.css";

function SpotDetail() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const reviews = useSelector((state) => state.reviews.Reviews);
  const [spot, setSpot] = useState(null);
  const currentSpot = useSelector((state) => state.spots);

  const [showAlert, setShowAlert] = useState(false);

  const handleReserveClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    const spot = dispatch(fetchSpot(spotId));
    setSpot(spot);
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  if (!spot) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-spot">
      <div>
        <h2>{currentSpot.name}</h2>
        <p className="location">
          Location: {currentSpot.city}, {currentSpot.state},{" "}
          {currentSpot.country}
        </p>
        <div className="images"></div>
        <span className="container-layer">
          <div className="details">
            <p className="host-info">
              Hosted by: {currentSpot?.Owner.firstName}{" "}
              {currentSpot?.Owner.lastName}
            </p>
            <p>{currentSpot.description}</p>
          </div>
          <div className="bookit-sidebar">
            <div className="price-rating">
              <div className="price-container">
                <span className="price-amount">${currentSpot.price}</span>
                <span className="price-per-night"> per night</span>
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
      <Reviews spot={spot} reviews={reviews} />
    </div>
  );
}

export default SpotDetail;
