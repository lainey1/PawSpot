// frontend/src/components/LoginFormModal/LoginFormModal.jsx
import { useState } from "react"; // allows us manage state in a functional component.
import { useDispatch } from "react-redux"; // allows us to dispatch actions to the Redux store.
import * as sessionActions from "../../store/session"; // imports all session-related actions from the session store module, allowing us to perform actions like login or logout
import { useModal } from "../../context/Modal"; //allowing  component to access modal-related functionalities (like closing the modal).
import "./LoginForm.css";
// import { Navigate } from "react-router-dom"; //allows for programmatic navigation, which can redirect users after actions like logging in.

function LoginFormModal() {
  // Define function component
  const dispatch = useDispatch(); // initializes the dispatch function to send actions to the Redux store
  // const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState(""); // initializes a state variable for storing the user's username or email with corresponding setter function
  const [password, setPassword] = useState(""); // initializes a state variable for storing the user's password with corresponding setter function
  const [errors, setErrors] = useState({}); // initializes a state variable to store any validation or submission errors that may occur, and starts as an empty object
  const { closeModal } = useModal(); // uses the useModal context to extract the closeModal function

  // //User session handling
  // if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault(); // allows custom handling of the submit event.
    setErrors({}); // resets any existing errors to prepare for a new submission
    return dispatch(sessionActions.login({ credential, password })) // dispatch login action from session actions
      .then(closeModal) // IF SUCCESS, close modal
      .catch(async (res) => {
        // IF FAIL, catch error response and define async function to handle it
        const data = await res.json();
        // if (data?.errors) setErrors(data.errors);
        if (data && data.errors) {
          // IF ERROR data exists, it updates the state with the new error messages.
          setErrors(data.errors);
        }
      });
  };

  //FORM RENDERING
  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)} // updates the state on change
          required
          placeholder="Username or Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // updates the state on change
          required
          placeholder="Password"
        />
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
