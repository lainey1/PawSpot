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
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  // FORM RENDERING

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
