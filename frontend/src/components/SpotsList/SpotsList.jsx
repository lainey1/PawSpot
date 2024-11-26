import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSpots } from "../../store/spots";

import { GoStarFill } from "react-icons/go";
import "./SpotsList.css";

const SpotsList = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.Spots);

  // const spots = useSelector((state) => state.spots.spots);
  // const spotsList = Object.values(spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="spots-grid">
      {spots?.map((spot) => (
        <div key={spot.id} className="spot-tile">
          <Link to={`/spots/${spot.id}`} className="spot-link">
            {spot.previewImage && (
              <img
                src={spot.previewImage}
                alt={spot.name}
                className="spot-image"
              />
            )}
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
            <p>
              <strong>${spot.price}</strong> night
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SpotsList;
