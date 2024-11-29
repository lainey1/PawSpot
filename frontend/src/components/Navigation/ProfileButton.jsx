import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "../OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormPage/SignUpFormModal";

import "./Navigation.css";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate("/");
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <button onClick={toggleMenu} id="profile-dropdown-button">
        <span className="container-profile">
          <GiHamburgerMenu />
          <FaUserCircle className="icon-user" />
        </span>
      </button>

      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profile-text">
            <p>Hello, {user.username}</p>
            <p>{user.email}</p>
            <NavLink to="/manage-spots" className="nav-link">
              Manage Spots
            </NavLink>

            <button className="button-logout" onClick={logout}>
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignUpFormModal />}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
