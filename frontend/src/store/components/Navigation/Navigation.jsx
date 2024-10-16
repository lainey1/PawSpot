//frontend/src/store/components/Navigation/Navigation.jsx //for react
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { IoPawOutline } from "react-icons/io5";

function Navigation({ isLoaded }) {
  const Paw = () => {
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
            <ProfileButton />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
