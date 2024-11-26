import { GoStarFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/reviewUtils";
import "./SpotReviews.css";

function Reviews({ spot, reviews }) {
  const currentUser = useSelector((state) => state.session.user);

  // Check if the current user is the owner of the spot
  const isCurrentUserOwner = currentUser?.id === spot?.Owner?.id;

  // Check if the current user has already reviewed this spot
  const hasCurrentUserReviewed = reviews?.some(
    (review) => review.User?.id === currentUser?.id
  );

  // Allow review posting if the user is logged in, not the owner, and has not reviewed
  const canPostReview =
    currentUser && !isCurrentUserOwner && !hasCurrentUserReviewed;

  return (
    <>
      <div id="section-divider"></div>

      <div id="header">
        <GoStarFill />
        <h2>
          {spot?.avgStarRating ? spot?.avgStarRating.toFixed(1) : <p>New</p>}
        </h2>
        <h3 id="divider"> | </h3>
        <h3>
          <p>
            {spot?.numReviews === 0
              ? "No reviews"
              : `${spot?.numReviews} ${
                  spot?.numReviews === 1 ? "review" : "reviews"
                } `}
          </p>
        </h3>
      </div>

      {canPostReview && (
        <div>
          <button className="post-review-button">Post Your Review</button>
        </div>
      )}

      <div id="section">
        <ul className="list">
          {reviews?.map((review) => (
            <li key={review.id} className="item">
              <p>
                <strong>{review.User.firstName}</strong>
              </p>
              <p className="date">{formatDate(review.updatedAt)}</p>
              <p>{review.review}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Reviews;
