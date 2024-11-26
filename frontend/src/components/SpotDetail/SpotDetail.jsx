import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import Reviews from "../SpotReviews";
import "./SpotDetail.css";

function SpotDetail() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const [loading, setLoading] = useState(true);
  const spot = useSelector((state) => state.spots.currentSpot);

  const [showAlert, setShowAlert] = useState(false);

  const handleReserveClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    setLoading(true); // Set loading to true when starting fetch
    dispatch(fetchSpot(spotId))
      .then(() => setLoading(false)) // Set loading to false on successful fetch
      .catch(() => setLoading(false)); // Also handle failure
  }, [dispatch, spotId]);

  if (loading) return <div>Loading...</div>;
  if (!spot) return <div>Spot not found.</div>;

  return (
    // <>
    //   <h2>{spot?.name}</h2>
    //   <Reviews spot={spot} />
    // </>

    <div className="container-spot">
      <div>
        <h2>{spot.name}</h2>
        <p className="location">
          {spot.city}, {spot.state}, {spot.country}
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
      <Reviews spot={spot} />
    </div>
  );
}

export default SpotDetail;
