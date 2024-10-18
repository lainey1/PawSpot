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
