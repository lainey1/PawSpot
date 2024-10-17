// frontend/src/components/SpotDetail.jsx

// #1 IMPORT necessary hooks and components
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpots } from "../../store/spots";

// #2 DEFINE COMPONENT
const SpotDetail = () => {
  //* Hooks for State and Dispatch
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spot.list);
  const spot = spots.find((spot) => spot.id === Number(spotId));

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  if (!spot) return <div>Loading...</div>;

  // #3 RENDER METHOD
  return (
    <div className="spot-detail">
      <h1>{spot.name}</h1>
      <h2>
        {spot.city}, {spot.state}, {spot.country}
      </h2>
      <p>{spot.description}</p>
      <p className="price">${spot.price}night</p>
      <button>Reserve</button>
    </div>
  );
};

// #4 EXPORT
export default SpotDetail;
