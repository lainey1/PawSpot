import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoStarFill } from "react-icons/go";
import { fetchSpots } from "../../store/spots";
import "./SpotsList.css";

const SpotsList = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.Spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="spots-grid">
      {spots?.map((spot) => (
        <div key={spot.id} className="spot-tile">
          <Link to={`/spots/${spot.id}`} className="spot-link">
            <div className="spot-image-container">
              {spot.previewImage ? (
                <img
                  src={spot.previewImage}
                  alt={spot.name}
                  className="spot-image"
                />
              ) : (
                <div>No Image Available</div>
              )}
            </div>
          </Link>
          <div className="spot-details">
            <h3 className="spot-name">{spot.name}</h3>
            <div className="spot-location-rating">
              <p className="spot-location">
                {spot.city}, {spot.state}
              </p>
              <span className="average-rating">
                {spot.avgRating ? (
                  <>
                    <GoStarFill /> {spot.avgRating}
                  </>
                ) : (
                  <span className="no-ratings">New</span>
                )}
              </span>
            </div>
            <p style={{ textAlign: "left" }}>
              <strong>${spot.price.toFixed(2)}</strong> night
            </p>
          </div>
          <span id="manage-buttons">
            <button>Update</button>
            <button>Delete</button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default SpotsList;
