import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import "./SpotDetail.css";

function SpotDetail() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const spot = useSelector((state) => state.spots.currentSpot);

  const handleReserveClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId]);

  return (
    <div className="container-spot">
      <div>
        <h2>{spot?.name}</h2>
        <p className="location">
          Location: {spot?.city}, {spot?.state}, {spot?.country}
        </p>
        <div className="images"></div>
        <span className="container-layer">
          <div className="details">
            <p className="host-info">
              Hosted by: {spot?.Owner.firstName} {spot?.Owner.lastName}
            </p>
            <p>{spot?.description}</p>
          </div>
          <div className="bookit-sidebar">
            <div className="price-rating">
              <div className="price-container">
                <span className="price-amount">${spot?.price}</span>
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

      <div className="reviews"></div>
    </div>
  );
}

export default SpotDetail;
