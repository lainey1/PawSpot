import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchSpot } from "../../store/spots";

import SpotHeader from "./SpotHeader";
import ImagesContainer from "../ImagesContainer/ImagesContainer";
import BookingLauncher from "../BookingLauncher/BookingLauncher";
import Reviews from "../SpotReviews/SpotReviews";

function SpotDetail() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const [loading, setLoading] = useState(true);
  const spot = useSelector((state) => state.spots.currentSpot);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchSpot(spotId))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, spotId]);

  const handleReserveClick = () => {
    alert("Feature coming soon...");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="spot-page">
      <div>
        <SpotHeader spot={spot} />
        <ImagesContainer spot={spot} />
        <span id="description-reservation-launcher">
          <div className="details">
            <p className="host-info">
              Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
            </p>
            <p>{spot?.description}</p>
          </div>
          <BookingLauncher spot={spot} onReserveClick={handleReserveClick} />
        </span>
      </div>
      <Reviews spot={spot} />
    </div>
  );
}

export default SpotDetail;
