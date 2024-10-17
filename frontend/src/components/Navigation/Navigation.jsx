//frontend/src/components/Navigation/Navigation.jsx //for react
import { NavLink } from "react-router-dom"; // NavLink component is used to create links that navigate to different routes in the app
import ProfileButton from "./ProfileButton"; // Handle user profile-related functionality
import "./Navigation.css";
import { IoPawOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function Navigation({ isLoaded }) {
  const user = useSelector((state) => state.session.user); // Ensure you are selecting the user from Redux state
  // accepts prop isLoaded to indicate whether the user profile data has been loaded
  const Paw = () => {
    // wrapper for the IoPawOutline icon.
    return (
      <div>
        <IoPawOutline />
      </div>
    );
  };

  return (
    <nav className="navigation">
      <div className="icon-container">
        <NavLink to="/" className="home-icon">
          {Paw()}
        </NavLink>
        {isLoaded && (
          <div className="profile-button">
            <ProfileButton user={user} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
