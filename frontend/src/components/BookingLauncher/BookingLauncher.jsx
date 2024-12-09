import { useEffect } from "react";
import "./bookingLauncher.css";

import { GoStarFill } from "react-icons/go";

function BookingLauncher({ spot, onReserveClick }) {
  useEffect(() => {}, [spot]);

  return (
    <div id="booking-launcher">
      <div id="booking-header">
        <div>
          <span className="price-amount">${Number(spot.price).toFixed(2)}</span>
          <span> night</span>
        </div>

        <div>
          <GoStarFill style={{ paddingRight: ".25em" }} />
          {spot?.avgStarRating > 0 ? (
            <span>{Number(spot?.avgStarRating).toFixed(1)}</span>
          ) : (
            <span>New</span>
          )}

          {spot?.numReviews > 0 && (
            <>
              <span style={{ padding: "0 0.5em" }}>•</span>
              <span>
                {spot.numReviews} {spot.numReviews === 1 ? "Review" : "Reviews"}
              </span>
            </>
          )}
        </div>
      </div>
      <button className="reserve-button" onClick={onReserveClick}>
        Reserve
      </button>
    </div>
  );
}

export default BookingLauncher;
