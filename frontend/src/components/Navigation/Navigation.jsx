import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { IoPawOutline } from "react-icons/io5";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const Paw = () => {
    return <IoPawOutline className="paw-purple" />;
  };

  return (
    <nav id="site-banner">
      <NavLink to="/" id="logo-banner">
        <Paw />
        <span className="site-name">pawspot</span>
      </NavLink>

      <div id="actions-container">
        {sessionUser && (
          <NavLink to="/create-spot" className="nav-link">
            Create Spot
          </NavLink>
        )}
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
