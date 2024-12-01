import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots/thunks";
import { useParams, useNavigate } from "react-router-dom";

const DeleteSpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { spotId } = useParams();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spotId));
    navigate("/spots/manage");
  };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot?</p>
      <button onClick={confirmDelete}>Yes (Delete Spot)</button>
      <button>No (Keep Spot)</button>
    </div>
  );
};

export default DeleteSpot;
