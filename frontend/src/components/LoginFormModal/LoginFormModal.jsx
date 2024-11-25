import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

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
    <>
      <h1>Log In</h1>

      <form className="login-form" onSubmit={handleSubmit}>
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
        {errors.credential && <p>{errors.credential}</p>}

        <button type="submit">Log In</button>
      </form>

      <a href="#" onClick={loginAsDemoUser} className="demo-link">
        Log in as Demo User
      </a>
    </>
  );
}

export default LoginFormModal;
