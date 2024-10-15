//frontend/src/store/components/Navigation/Navigation.jsx //for react
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import homeIcon from "../../../../public/paw-outline.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navigation">
      <ul>
        <li className="home-icon">
          <NavLink to="/">
            <img src={homeIcon} alt="Home" className="home-image" />
          </NavLink>
        </li>
        {isLoaded && (
          <li className="profile-button">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
