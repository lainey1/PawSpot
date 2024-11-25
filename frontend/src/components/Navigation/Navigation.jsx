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
    <nav className="navigation">
      <NavLink to="/" className="container-home">
        <Paw />
        <span className="site-name paw-purple">pawspot</span>
      </NavLink>

      <div className="container-profile">
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
