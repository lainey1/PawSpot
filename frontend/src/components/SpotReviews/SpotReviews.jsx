import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateReview from "../SpotReviews/CreateReview";
import { fetchReviews } from "../../store/reviews/thunks";
import { useReviewPermissions } from "../../hooks/useReviewPermissions";

import {
  formatDate,
  sortReviewsByDate,
  getReviewHeader,
  renderReviewList,
  getEmptyReviewMessage,
} from "../../utils/reviewUtils";

import { GoStarFill } from "react-icons/go";
import "./SpotReviews.css";

function Reviews({ spot }) {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const [loading, setLoading] = useState(true);
  const reviews = useSelector((state) => state.reviews.Reviews);
  const currentUser = useSelector((state) => state.session.user);

  const { isCurrentUserOwner, canPostReview } = useReviewPermissions(
    reviews,
    currentUser,
    spot
  );

  useEffect(() => {
    setLoading(true);
    dispatch(fetchReviews(spotId))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, spotId]);

  if (loading) return <div>Loading...</div>;
  if (!reviews) return <div>Review not found.</div>;

  const sortedReviews = sortReviewsByDate(reviews);

  return (
    <>
      <div id="section-divider"></div>

      <div id="header">
        <GoStarFill style={{ fontSize: "1.5em", paddingRight: ".25em" }} />
        {getReviewHeader(spot?.avgStarRating, spot?.numReviews)}
      </div>

      {canPostReview && (
        <div>
          <OpenModalButton
            buttonText={"Post Your Review"}
            modalComponent={<CreateReview spotId={spotId} />}
            className="post-review-button"
          />
        </div>
      )}

      <div id="section">
        {spot?.numReviews === 0 ? (
          getEmptyReviewMessage(
            spot?.numReviews,
            isCurrentUserOwner,
            canPostReview
          )
        ) : (
          <ul className="list">
            {renderReviewList(sortedReviews, formatDate)}
          </ul>
        )}
      </div>
    </>
  );
}

export default Reviews;
