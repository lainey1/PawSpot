//frontend/src/components/SpotDetail/SpotDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SpotDetail.css";
import ImagesContainer from "../ImagesContainer/ImagesContainer";
import ReviewsSection from "../ReviewsSection/ReviewsSection";

const SpotDetail = () => {
  const { spotId } = useParams();
  const [spot, setSpot] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchSpot = async () => {
      const response = await fetch(`/api/spots/${spotId}`);
      const data = await response.json();
      setSpot(data);
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
          <ImagesContainer spot={spot} />
          <span className="third-layer">
            <div className="spot-double-click">
              <p className="host-info">
                Hosted by: {spot.Owner.firstName} {spot.Owner.lastName}
              </p>
              <p>{spot.description}</p>
            </div>
            <div className="bookit-sidebar">
              <div className="price-rating">
                <div className="price-container">
                  <span className="price-amount">${spot.price}</span>
                  <span className="price-per-night"> per night</span>
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
        <ReviewsSection
          spot={spot}
          currentReviews={currentReviews}
          formatDate={formatDate}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default SpotDetail;
