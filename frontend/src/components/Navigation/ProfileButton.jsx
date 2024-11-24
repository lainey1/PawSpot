// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "../OpenModalMenuItem/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormPage/SignUpFormModal";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
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
      <button onClick={toggleMenu}>
        <span className="container-profile">
          <GiHamburgerMenu className="icon-hamburger" />
          <FaUserCircle className="icon-user" />
        </span>
      </button>

      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.username}.</li>
            <li>{user.email}</li>
            <p>
              <button className="button-logout" onClick={logout}>
                Log Out
              </button>
            </p>
          </>
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
