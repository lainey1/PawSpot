// import { useEffect } from "react";
import "./Reviews.css";
import { GoStarFill } from "react-icons/go";

function Reviews({ spot }) {
  return (
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
  );
}

export default Reviews;
