//frontend/src/store/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent click from bubbling up to the document
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {/* <button onClick={() => setShowMenu(!showMenu)} className="profile-button"> */}
      <button onClick={toggleMenu}>
        <div style={{ color: "rgb(133, 46, 133)" }}>
          <FaUserCircle />
        </div>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li className="nav-item">{user.username}</li>
        <li className="nav-item">
          {user.firstName} {user.lastName}
        </li>
        <li className="nav-item">{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
