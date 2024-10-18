import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SpotDetail.css";
import { GoStarFill } from "react-icons/go";

const SpotDetail = () => {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; // Number of reviews per page

  useEffect(() => {
    const fetchSpot = async () => {
      const response = await fetch(`/api/spots/${spotId}`);
      const data = await response.json();
      setSpot(data);
      // console.log("Fetched Spot Data =======>:", data);
    };

    const fetchReviews = async () => {
      const response = await fetch(`/api/spots/${spotId}/reviews`);
      const data = await response.json();
      setReviews(data.Reviews);
    };

    fetchSpot();
    fetchReviews();
  }, [spotId]);

  if (!spot) return <div>Loading...</div>;

  const handleReserveClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Pagination Logic
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div className="outer-container">
      <div className="spot-detail-container">
        <div className="details-container">
          <h2>{spot.name}</h2>
          <p className="spot-location">
            Location: {spot.city}, {spot.state}, {spot.country}
          </p>

          {/* IMAGES CONTAINER */}
          <div className="images-container">
            <div className="image-large-container">
              <img
                className="image-large"
                src={spot.SpotImages[0]?.url}
                alt={spot.name}
              />
            </div>

            <div className="images-small-container">
              <div className="images-small-row">
                <img
                  src={spot.SpotImages[1]?.url}
                  className="image-small"
                  alt="Small Image 1"
                />
                <img
                  src={spot.SpotImages[2]?.url}
                  className="image-small"
                  alt="Small Image 2"
                />
              </div>
              <div className="images-small-row">
                <img
                  src={spot.SpotImages[3]?.url}
                  className="image-small"
                  alt="Small Image 3"
                />
                <img
                  src={spot.SpotImages[4]?.url}
                  className="image-small"
                  alt="Small Image 4"
                />
              </div>
            </div>
          </div>

          {/* HOST AND SPOT DESCRIPTION */}
          <span className="third-layer">
            <div className="spot-double-click">
              <p className="host-info">
                Hosted by: {spot.Owner.firstName} {spot.Owner.lastName}
              </p>
              <p>{spot.description}</p>
            </div>

            {/*BOOK IT SIDE BAR SECTION */}
            <div className="bookit-sidebar">
              <div className="price-rating">
                <div className="price-container">
                  <span className="price-amount">${spot.price}</span>
                  <span className="price-per-night"> per night</span>
                </div>
                <div className="rating-average">
                  {spot.avgStarRating ? (
                    <>
                      <GoStarFill /> {spot.avgStarRating.toFixed(1)} ·{" "}
                      {spot.numReviews} reviews
                    </>
                  ) : (
                    <span className="ratings-number">0 reviews</span>
                  )}
                </div>
              </div>

              <button className="reserve-button" onClick={handleReserveClick}>
                Reserve
              </button>
              {showAlert && (
                <span className="alert-message">Feature Coming Soon...</span>
              )}
            </div>
          </span>
        </div>

        {/* REVIEWS SECTION*/}
        <div className="reviews-section">
          <div className="reviews-rating">
            {spot.avgStarRating ? (
              <>
                <GoStarFill /> {spot.avgStarRating.toFixed(1)} ·{" "}
                {spot.numReviews} reviews
              </>
            ) : (
              <span className="ratings-number">0 reviews</span>
            )}
          </div>
          <ul className="reviews-list">
            {currentReviews.map((review) => (
              <li key={review.id} className="review-item">
                <p>
                  <strong>
                    {review.User.firstName} {review.User.lastName}
                  </strong>
                </p>
                <p className="review-date">{formatDate(review.updatedAt)}</p>
                <p>{review.review}</p>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;
