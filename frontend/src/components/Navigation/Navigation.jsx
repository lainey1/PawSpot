//frontend/src/components/Navigation/Navigation.jsx
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { IoPawOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function Navigation({ isLoaded }) {
  const user = useSelector((state) => state.session.user);

  const Paw = () => {
    return <IoPawOutline className="paw-purple" />;
  };

  return (
    <nav className="navigation">
      <div className="icon-container">
        <NavLink to="/" className="home-icon">
          <div className="logo-container hover-effect">
            <Paw />
            <span className="site-name paw-purple">PawSpots</span>
          </div>
        </NavLink>
      </div>

      <div className="profile-actions">
        {isLoaded && user && (
          <NavLink to="/create-spot" className="create-spot-link">
            Create a Spot
          </NavLink>
        )}
        <div className="profile-button">
          <ProfileButton user={user} />
        </div>

        {isLoaded && (
          <div className="nav-links">
            <div className="profile-button">
              <ProfileButton user={user} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
