import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchSpot } from "../../store/spots";

import SpotHeader from "./SpotHeader";
import ImagesContainer from "../ImagesContainer";
import Reviews from "../SpotReviews";

import "./SpotDetail.css";
import ReservationLauncher from "./ReservationLauncher";

//* Component to display detailed info about a specific spot
function SpotDetail() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  // State for loading indicator
  const [loading, setLoading] = useState(true);

  // Selector to access the current spot data from Redux store
  const spot = useSelector((state) => state.spots.currentSpot);

  // Fetch spot data on component mount or what spotId changes
  useEffect(() => {
    setLoading(true);
    dispatch(fetchSpot(spotId))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, spotId]);

  // Display loading message while fetching data
  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-spot">
      <div>
        <SpotHeader spot={spot} />
        <ImagesContainer spot={spot} />
        <span className="container-layer">
          <div className="details">
            <p className="host-info">
              Hosted by: {spot?.Owner?.firstName} {spot?.Owner?.lastName}
            </p>
            <p>{spot?.description}</p>
          </div>
          <ReservationLauncher spot={spot} />
        </span>
      </div>
      <Reviews spot={spot} />
    </div>
  );
}

export default SpotDetail;
