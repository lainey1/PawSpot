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

  // Access the spot and reviews from Redux state
  const spot = useSelector((state) => state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews.Reviews);

  const [showAlert, setShowAlert] = useState(false);

  const handleReserveClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    // Fetch the spot details and reviews
    dispatch(fetchSpot(spotId));
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  if (!spot) {
    // Render a loading message while fetching data
    return <div>Loading...</div>;
  }

  return (
    <div className="container-spot">
      <div>
        <h2>{spot?.name}</h2>
        <p className="location">
          Location: {spot.city}, {spot.state}, {spot.country}
        </p>
        <div className="images"></div>
        <span className="container-layer">
          <div className="details">
            <p className="host-info">
              Hosted by: {spot.Owner.firstName} {spot.Owner.lastName}
            </p>
            <p>{spot?.description}</p>
          </div>
          <div className="bookit-sidebar">
            <div className="price-rating">
              <div className="price-container">
                <span className="price-amount">${spot.price}</span>
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
