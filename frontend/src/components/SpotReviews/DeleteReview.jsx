import { useDispatch } from "react-redux";
import { deleteSpotThunk, fetchSpotsList } from "../../store/spots/thunks";
import { useModal } from "../../context/Modal";
import "./deleteSpot.css";

const DeleteSpot = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpotThunk(spotId))
      .then(() => dispatch(fetchSpotsList()))
      .then(() => closeModal());
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    closeModal(); // Close modal if user cancels
  };

  return (
    <div id="delete-spot-form">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot?</p>
      <button onClick={confirmDelete} className="confirm-delete">
        Yes (Delete Spot)
      </button>
      <button onClick={cancelDelete} className="cancel-delete">
        No (Keep Spot)
      </button>
    </div>
  );
};

export default DeleteSpot;
