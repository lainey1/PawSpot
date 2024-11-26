import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../store/reviews";
import Reviews from "../SpotReviews";
import "./SpotDetail.css";

function SpotDetail() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.Reviews);
  const [spot, setSpot] = useState(null);

  const [showAlert, setShowAlert] = useState(false);

  const handleReserveClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    const fetchSpot = async () => {
      const response = await fetch(`/api/spots/${spotId}`);
      const data = await response.json();
      setSpot(data);
    };

    fetchSpot();
  }, [spotId]);

  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <div>Loading...</div>;

  return (
    <div className="container-spot">
      <div>
        <h2>{spot.name}</h2>
        <p className="location">
          Location: {spot.city}, {spot.state}, {spot.country}
        </p>
        <div className="images"></div>
        <span className="container-layer">
          <div className="details">
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
