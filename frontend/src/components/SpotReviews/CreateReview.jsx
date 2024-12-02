import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewReview } from "../../store/reviews/thunks";
import { useNavigate, useParams } from "react-router-dom";
import "./createReview.css";

const CreateReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState("");
  const userId = useSelector((state) => state.session.user.id);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Proceed with submission only if there are no errors
    if (!errors) {
      console.log("Submitting review:", { userId, spotId, review, stars });
      dispatch(createNewReview({ userId, spotId, review, stars }))
        .then(() => {
          navigate(`/spots/${spotId}`);
        })
        .catch((error) => {
          console.error("Error creating review:", error);
          // Optional: Show an error message to the user
        });
    }
  };

  // Real-time form validation on review or star change
  useEffect(() => {
    let errorMessage = "";

    // Validate review length and star selection
    if (review.length < 10)
      errorMessage = "Review must be at least 10 characters.";
    if (stars === 0) {
      errorMessage = errorMessage
        ? `${errorMessage} Please select a star rating.`
        : "Please select a star rating.";
    }

    setErrors(errorMessage);
  }, [review, stars]); // Trigger validation whenever review or stars change

  return (
    <form id="create-review-form" onSubmit={handleSubmit}>
      <h1>How was your stay?</h1>

      {/* Show a combined error message at the top if any */}
      {errors && (
        <p className="error-message" style={{ color: "red" }}>
          {errors}
        </p>
      )}

      <textarea
        className="textarea-field"
        name="review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Leave a review here..."
        required
      />

      <div className="star-rating">
        <label>Stars</label>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${
                star <= (hoverRating || stars) ? "filled" : ""
              }`}
              onClick={() => setStars(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <button type="submit" disabled={review.length < 10 || stars === 0}>
        Submit Your Review
      </button>
    </form>
  );
};

export default CreateReview;
