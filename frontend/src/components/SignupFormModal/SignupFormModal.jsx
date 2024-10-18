// frontend/src/components/SignupFormPage/SignupFormPage.jsx

import { useState } from "react"; // ALLOWS us to manage state in functional component
import { useDispatch } from "react-redux"; // ALLOWS us to dispatch action to REDUX store
import { useModal } from "../../context/Modal"; //ALLOWS componenent to access modal-related functions from Modal context
import * as sessionActions from "../../store/session"; // section actions from SESSION store like login/logout
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);

  // ? WHAT STATE VARIABLES DO WE NEED TO INIITIATE AND DEFINE CORRESPONDING SETTER FUNCTION ?
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault(); // ! allow custom handling of form submission
    if (password === confirmPassword) {
      setErrors({}); // ! remember to reset existing errors to prep for new submission
      return dispatch(
        sessionActions.signup({
          // dispatch action defined in SESSION STORE
          firstName,
          lastName,
          email,
          username,
          password,
        })
      )
        .then(closeModal) // IF SUCCESS close modal
        .catch(async (res) => {
          // IF FAIL, error handling
          const data = await res.json(); // thru async func
          if (data?.errors) {
            setErrors(data.errors); // parse from error data
          }
        });
    }
    return setErrors({
      confirmPassword: "Passwords must match. Please try again.",
    });
  };

  // FORM RENDERING
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First Name"
        />
        {errors.firstName && (
          <p className="error-message">{errors.firstName}</p>
        )}
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Last Name"
        />
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
        <button
          type="submit"
          disabled={
            !firstName ||
            !lastName ||
            !email ||
            !username ||
            !password ||
            !confirmPassword
          }
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
