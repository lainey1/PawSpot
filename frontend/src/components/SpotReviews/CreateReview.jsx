import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewReview, fetchReviews } from "../../store/reviews/thunks";
import { fetchSpot } from "../../store/spots/thunks";
import { useModal } from "../../context/Modal";
import "./createReview.css";

const CreateReview = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const formRef = useRef(null); // Reference to the form

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState("");

  const userId = useSelector((state) => state.session.user.id);
  const reviews = useSelector((state) => state.reviews.Reviews);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    const existingReview = reviews?.find(
      (rev) => rev.userId === userId && rev.spotId === Number(spotId)
    );
    if (existingReview) {
      setErrors("Review already exists for this spot.");
    } else {
      setErrors("");
    }
  }, [reviews, userId, spotId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting review:", { userId, spotId, review, stars });

    if (!errors) {
      try {
        await dispatch(createNewReview(userId, Number(spotId), review, stars));
        await dispatch(fetchSpot(spotId));
        await dispatch(fetchReviews(spotId));
        closeModal();
      } catch (error) {
        console.error("Failed to update spot:", error);
      }
    }
  };

  useEffect(() => {
    let errorMessage = "";
    if (review.length < 10)
      errorMessage = "Review must be at least 10 characters.";
    if (stars === 0) {
      errorMessage = errorMessage
        ? `${errorMessage} Please select a star rating.`
        : "Please select a star rating.";
    }
    setErrors(errorMessage);
  }, [review, stars]);

  // Close the modal when clicking outside the form
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <form id="create-review-form" onSubmit={handleSubmit}>
      <h1>How was your stay?</h1>
      {errors && (
        <p className="error-message" style={{ color: "red" }}>
          {errors}
        </p>
      )}
      <textarea
        className="textarea-field"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Leave a review here..."
        required
      />
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hoverRating || stars) ? "filled" : ""}`}
            onClick={() => setStars(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            ★
          </span>
        ))}
      </div>
      <button type="submit" disabled={review.length < 10 || stars === 0}>
        Submit Your Review
      </button>
    </form>
  );
};

export default CreateReview;
