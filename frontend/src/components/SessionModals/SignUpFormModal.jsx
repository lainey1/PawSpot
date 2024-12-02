import { useState } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";

import "./sessionForms.css";

function SignUpFormModal() {
  const dispatch = useDispatch();

  // State hooks
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // Validation helper functions
  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "email":
        if (!value.includes("@")) error = "Email must include '@'.";
        break;
      case "username":
        if (value.length < 4) error = "Username must be at least 4 characters.";
        break;
      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters.";
        break;
      case "confirmPassword":
        if (value !== password) error = "Passwords must match.";
        break;

      default:
        break;
    }
    return error;
  };

  // Handle input changes and validate immediately after input
  const handleInputChange = (setter, fieldName, value) => {
    setter(value);
    const error = validateField(fieldName, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  // Func to check if all required fields are filled and valid
  const isFormValid = () => {
    return (
      email &&
      username &&
      firstName &&
      lastName &&
      password &&
      confirmPassword &&
      password === confirmPassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalErrors = validateAllFields();
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    // Make the API call to sign up
    return dispatch(
      sessionActions.signup({
        email,
        username,
        firstName,
        lastName,
        password,
      })
    )
      .then(() => {
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  // Validate all form fields before API call
  const validateAllFields = () => {
    const finalErrors = {};
    [
      "email",
      "username",
      "firstName",
      "lastName",
      "password",
      "confirmPassword",
    ].forEach((field) => {
      const error = validateField(field, eval(field));
      if (error) finalErrors[field] = error;
    });
    return finalErrors;
  };

  // Collect all error messages into an array for display
  const errorMessages = Object.values(errors);

  return (
    <div>
      <form className="session-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input
          placeholder="First Name"
          type="text"
          value={firstName}
          onBlur={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              firstName: validateField("firstName", firstName),
            }))
          }
          onChange={(e) =>
            handleInputChange(setFirstName, "firstName", e.target.value)
          }
          required
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <input
          placeholder="Last Name"
          type="text"
          value={lastName}
          onBlur={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              lastName: validateField("lastName", lastName),
            }))
          }
          onChange={(e) =>
            handleInputChange(setLastName, "lastName", e.target.value)
          }
          required
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <input
          placeholder="Email"
          type="text"
          value={email}
          onBlur={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: validateField("email", email),
            }))
          }
          onChange={(e) => handleInputChange(setEmail, "email", e.target.value)}
          required
        />

        <input
          placeholder="Username"
          type="text"
          value={username}
          onBlur={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              username: validateField("username", username),
            }))
          }
          onChange={(e) =>
            handleInputChange(setUsername, "username", e.target.value)
          }
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onBlur={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              password: validateField("password", password),
            }))
          }
          onChange={(e) =>
            handleInputChange(setPassword, "password", e.target.value)
          }
          required
        />

        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onBlur={() =>
            setErrors((prevErrors) => ({
              ...prevErrors,
              confirmPassword: validateField(
                "confirmPassword",
                confirmPassword
              ),
            }))
          }
          onChange={(e) =>
            handleInputChange(
              setConfirmPassword,
              "confirmPassword",
              e.target.value
            )
          }
          required
        />

        <button type="submit" disabled={!isFormValid()}>
          Sign Up
        </button>
      </form>

      <div id="errors-container">
        {!isFormValid() && (
          <p className="required-message">All fields are required.</p>
        )}

        {errorMessages.length > 0 && (
          <div className="error-messages">
            {errorMessages.map((error, index) => (
              <p key={index} className="error">
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUpFormModal;
