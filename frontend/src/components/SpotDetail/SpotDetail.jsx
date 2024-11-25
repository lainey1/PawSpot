import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";

import "./SpotDetail.css";

function SpotDetail() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.currentSpot);

  useEffect(() => {
    dispatch(fetchSpot(spotId));
  }, [dispatch, spotId]);

  return (
    <div className="container-spot">
      <h2>{spot?.name}</h2>
      <p>
        {" "}
        {spot?.city}, {spot?.state}, {spot?.country}
      </p>

      <div className="container-images"></div>

      <div className="description">
        <h3>
          Hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}
        </h3>
        <p>{spot?.description}</p>

        <div className="reservation-launcher"></div>

        <div className="reviews"></div>
      </div>
    </div>
  );
}

export default SpotDetail;
