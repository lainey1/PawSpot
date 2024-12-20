import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { GoStarFill } from "react-icons/go";

import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpot from "./DeleteSpot";
import { fetchSpotsList } from "../../store/spots/thunks";

import "./ManageSpots.css";

function ManageSpots() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spots.Spots);
  const currentUser = useSelector((state) => state.session.user);
  const [loading, setLoading] = useState(true);

  const userSpots = spots?.filter((spot) => spot.ownerId === currentUser.id);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchSpotsList())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <div>You must be logged in to manage spots.</div>;

  return (
    <div className="manage-spots-page">
      <div className="header">
        <h1>Manage Your Spots</h1>
        <p>
          Click a spot&apos;s image to view its public listing, or use the
          buttons below to update or delete the spot.
        </p>
      </div>

      {!userSpots.length ? (
        <button
          id="create-spot-button"
          onClick={() => {
            navigate("/spots/new");
          }}
        >
          Create a New Spot
        </button>
      ) : (
        <div className="spots-grid">
          {userSpots?.map((spot) => (
            <div key={spot.id} className="spot-tile">
              <Link to={`/spots/${spot.id}`} className="spot-link">
                <div className="spot-image-container">
                  {spot.previewImage ? (
                    <img
                      src={spot.previewImage}
                      alt={spot.name}
                      className="spot-image"
                    />
                  ) : (
                    <div>No Image Available</div>
                  )}
                </div>
                <div className="spot-details">
                  <h3 className="spot-name">{spot.name}</h3>
                  <div className="spot-location-rating">
                    <p className="spot-location">
                      {spot.city}, {spot.state}
                    </p>
                    <span className="average-rating">
                      {spot.avgRating ? (
                        <>
                          <GoStarFill /> {spot.avgRating}
                        </>
                      ) : (
                        <span className="no-ratings">New</span>
                      )}
                    </span>
                  </div>
                  <p style={{ textAlign: "left" }}>
                    <strong>${spot.price.toFixed(2)}</strong> night
                  </p>
                </div>
              </Link>

              <span className="button-wrapper">
                <button
                  className="update-button"
                  onClick={() => {
                    navigate(`/spots/${spot.id}/edit`);
                  }}
                >
                  Update
                </button>
                <OpenModalButton
                  buttonText={"Delete"}
                  modalComponent={<DeleteSpot spotId={spot.id} />}
                  className="delete-button"
                />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageSpots;
