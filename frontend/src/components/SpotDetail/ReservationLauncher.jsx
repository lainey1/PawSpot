import { useState } from "react";

function ReservationLauncher({ spot }) {
  // State for loading reservation feature alert
  const [isReserveAlertVisible, setIsReserveAlertVisible] = useState(false);

  // Handler for "Reserve" button click
  const handleReserveClick = () => {
    setIsReserveAlertVisible(true);
    setTimeout(() => setIsReserveAlertVisible(false), 3000);
  };

  return (
    <>
      <div className="bookit-sidebar">
        <div className="price-rating">
          <div className="price-container">
            <span className="price-amount">${spot?.price}</span>
            <span className="price-per-night"> per night</span>
          </div>
        </div>
        <button className="reserve-button" onClick={handleReserveClick}>
          Reserve
        </button>
        {isReserveAlertVisible && (
          <span className="alert-message">Feature Coming Soon...</span>
        )}
      </div>
    </>
  );
}

export default ReservationLauncher;
