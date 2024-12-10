export function getReviewHeader(avgStarRating, numReviews) {
  return (
    <>
      {avgStarRating > 0 ? (
        <span>{Number(avgStarRating).toFixed(1)}</span>
      ) : (
        <span>New</span>
      )}
      {numReviews > 0 && (
        <p>
          <span style={{ padding: "0 0.5em" }}>•</span>
          <span>
            {numReviews} {numReviews === 1 ? "Review" : "Reviews"}
          </span>
        </p>
      )}
    </>
  );
}

export function renderReviewList(reviews, formatDate) {
  return reviews.map((review) => (
    <div key={review.id} className="item">
      <p>
        <strong>{review.User.firstName}</strong>
      </p>
      <p className="date">{formatDate(review.updatedAt)}</p>
      <p>{review.review}</p>
    </div>
  ));
}

export function sortReviewsByDate(reviews) {
  return [...reviews].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
}

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export function getEmptyReviewMessage(
  numReviews,
  isCurrentUserOwner,
  canPostReview
) {
  if (numReviews === 0 && !isCurrentUserOwner && canPostReview) {
    return <p>Be the first to post a review!</p>;
  }
  return null;
}
