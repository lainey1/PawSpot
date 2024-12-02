import { useDispatch } from "react-redux";
import { deleteReview, fetchReviews } from "../../store/reviews/thunks";
import { fetchSpot } from "../../store/spots/thunks";
import { useModal } from "../../context/Modal";
import "./deleteReview.css";

const DeleteReview = ({ reviewId, spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(reviewId))
      .then(() => {
        dispatch(fetchReviews(spotId)); // Re-fetch reviews after deletion
        dispatch(fetchSpot(spotId)); // Re-fetch the spot details
      })
      .then(() => closeModal());
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div id="delete-review-form">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={confirmDelete} className="confirm-delete">
        Yes (Delete Review)
      </button>
      <button onClick={cancelDelete} className="cancel-delete">
        No (Keep Review)
      </button>
    </div>
  );
};

export default DeleteReview;
