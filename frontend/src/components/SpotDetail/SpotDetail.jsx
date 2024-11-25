import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SpotDetail() {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    const fetchSpot = async () => {
      const response = await fetch(`/api/spots/${spotId}`);
      const data = await response.json();
      setSpot(data);
    };
    fetchSpot();
  }, [spotId]);

  return (
    <div className="container-spot">
      <h2>{spot?.name}</h2>
      <p>
        {" "}
        Location: {spot?.city}, {spot?.state}, {spot?.country}
      </p>

      <div className="container-images"></div>

      <div className="description">
        <h3>
          Hosted by {spot?.firstName} {spot?.lastName}
        </h3>
        <p>{spot?.description}</p>

        <div className="reservation-launcher"></div>

        <div className="reviews"></div>
      </div>
    </div>
  );
}

export default SpotDetail;
