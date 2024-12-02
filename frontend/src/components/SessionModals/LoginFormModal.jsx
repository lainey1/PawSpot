import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import "./sessionForms.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      });
  };

  const isButtonDisabled = credential.length < 4 || password.length < 6;

  const loginAsDemoUser = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(
      sessionActions.login({
        credential: "Demo-lition",
        password: "password",
      })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div>
      <form className="session-form" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <input
          placeholder="Username or Email"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.credential && <p className="error">{errors.credential}</p>}

        <div>
          <button type="submit" disabled={isButtonDisabled}>
            Log In
          </button>
          <br />
          <br />
          <a href="#" onClick={loginAsDemoUser} className="demo-link">
            Log in as Demo User
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
