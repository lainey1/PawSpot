// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from "react"; // Allows us to add state to a functional component
import { useDispatch } from "react-redux"; //hooks for dispatching actions and accessing state from the redux store
import * as sessionActions from "../../../store/session"; //imports all actions related to the session
// import { Navigate } from "react-router-dom"; //allows for programmatic navigation
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";
// import "./Test.css";

function LoginFormModal() {
  //State management
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // //User session handling
  // if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        // if (data?.errors) setErrors(data.errors);
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  //FORM RENDERING
  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
