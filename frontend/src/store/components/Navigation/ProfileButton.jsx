//frontend/src/store/components/Navigation/ProfileButton.jsx

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={() => setShowMenu(!showMenu)} className="profile-button">
        <div style={{ color: "rgb(133, 46, 133)" }}>
          <FaUserCircle />
        </div>
      </button>
      <ul className={ulClassName}>
        <li className="nav-item">{user.username}</li>
        <li className="nav-item">
          {user.firstName} {user.lastName}
        </li>
        <li className="nav-item">{user.email}</li>
      </ul>
    </>
  );
}

export default ProfileButton;
