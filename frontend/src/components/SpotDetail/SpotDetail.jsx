// frontend/src/components/SpotDetail.jsx

// #1 IMPORT necessary hooks and components
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpots } from "../../store/spots";
import "./SpotDetail.css";

// #2 DEFINE COMPONENT
const SpotDetail = () => {
  //* Hooks for State and Dispatch
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spot.list);
  const spot = spots.find((spot) => spot.id === Number(spotId));

  // Replace the traditional alert with a custom alert component
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  if (!spot) return <div>Loading...</div>;

  //* CLICK HANDLER for the Reserve button

  const handleReserveClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // #3 RENDER METHOD
  return (
    <div className="spot-detail-container">
      <div className="spot-detail">
        <h2>{spot.name}</h2>
        <p className="spot-location">
          {spot.city}, {spot.state}, {spot.country}
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
    </div>
  );
};

// #4 EXPORT
export default SpotDetail;
