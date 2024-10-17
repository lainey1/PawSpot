//frontend/src/components/SpotsBrowser.jsx

// #1 IMPORT necessary hooks and components for building the browser interface
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getSpots } from "../store/spots";

// #2 DEFINE COMPONENT
const SpotsBrowser = () => {
  //* Hooks for State and Dispatch
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot.list); // SELECT SPOTS FROM STATE

  //* Effect Hook for Fetching Spots
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  // #3 RENDER METHOD
  //* Inside the <nav>, each spot is rendered as a NavLink. When clicked, it navigates to the individual spot's details page.
  return (
    <main>
      <nav></nav>
      <section>
        <h2>All Spots</h2>
        <div>
          {spots.length > 0 ? (
            spots.map((spot) => (
              <div key={spot.id}>
                <h3>{spot.name}</h3>
                <p>{spot.description}</p>
                <p>Price: ${spot.price}</p>
                <p>
                  {spot.city}, {spot.state}
                </p>
                {/* Add a NavLink to individual spot details if needed */}
              </div>
            ))
          ) : (
            <p>No spots available.</p>
          )}
        </div>
      </section>
      <Outlet />
    </main>
  );
};

// #4 EXPORT
export default SpotsBrowser;
