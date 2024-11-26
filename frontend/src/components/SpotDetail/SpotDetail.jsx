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
  const currSpot = useSelector((state) => state.spots);

  const [showAlert, setShowAlert] = useState(false);

  const handleReserveClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    dispatch(fetchSpot(spotId));
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  //! BUG FIX START! ********************************
  //  Wait for Redux State Updates: Use currSpot from the Redux store directly instead of relying on the local spot state
  if (!currSpot || !currSpot.Owner) {
    return <div>Loading...</div>;
  }
  //! BUG FIX END! ***********************************

  return (
    <div className="container-spot">
      <div>
        <h2>{currSpot.name}</h2>
        <p className="location">
          Location: {currSpot.city}, {currSpot.state}, {currSpot.country}
        </p>
        <div className="images"></div>
        <span className="container-layer">
          <div className="details">
            <p className="host-info">
              Hosted by: {currSpot.Owner.firstName} {currSpot.Owner.lastName}
            </p>
            <p>{currSpot.description}</p>
          </div>
          <div className="bookit-sidebar">
            <div className="price-rating">
              <div className="price-container">
                <span className="price-amount">${currSpot.price}</span>
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
      <Reviews spot={currSpot} reviews={reviews} />
    </div>
  );
}

export default SpotDetail;
