// frontend/src/components/SpotsList/SpotsList.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";

const SpotsList = () => {
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spot);
  const spotsList = Object.values(spots);
  console.log(spotsList);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);
  return (
    <div>
      <h1>Spot List</h1>
      {spotsList?.map(({ id, name }) => (
        <p key={id}>{name}</p>
      ))}
    </div>
  );
};

export default SpotsList;
