//frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
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

  const closeMenu = () => {
    setShowMenu(false);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then(() => {
      window.location.href = "/"; // Redirect to home page
    });
    closeMenu();
  };

  const ulClassName = `profile-dropdown ${showMenu ? "" : "hidden"}`;

  return (
    <>
      <button onClick={toggleMenu}>
        <span className="icon-container">
          <GiHamburgerMenu className="hamburger-icon" />
          <FaUserCircle className="user-icon" />
        </span>
      </button>
      <p className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p className="left-padding">Hello, {user.username}.</p>
            <p className="left-padding">{user.email}</p>
            <p className="left-padding">
              <button className="logout-button" onClick={logout}>
                Log Out
              </button>
            </p>
          </>
        ) : (
          <>
            {/* Log user when logged in */}
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </p>
    </>
  );
}

export default ProfileButton;
