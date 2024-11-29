import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createNewSpot } from "../../store/spots";

import "./CreateSpot.css";

const CreateSpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State hooks
  const [formData, setFormData] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
    name: "",
    description: "",
    price: "",
    previewImageUrl: "",
    imageUrls: ["", "", "", ""],
  });
  const [errors, setErrors] = useState({});

  // Validation helper functions
  // const validateField = (fieldName, value) => {
  //   let error = "";

  //   switch (fieldName) {
  //     case "description":
  //       if (value.length < 30)
  //         error = "Description must be at least 30 characters.";
  //       break;
  //     default:
  //       break;
  //   }
  //   return error;
  // };

  // Handle input changes and validate immediately after input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = value;
    setFormData((prev) => ({
      ...prev,
      imageUrls: newImageUrls,
    }));
  };

  // Func to check if all required fiels are filled and valid
  const validateForm = () => {
    const newErrors = {};
    if (!formData.previewImageUrl)
      newErrors.previewImageUrl = "Preview Image URL is required";
    if (formData.description.length < 30)
      newErrors.description = "Description needs 30 or more characters";
    if (!formData.name) newErrors.name = "Name of your spot is required";
    if (!formData.price) newErrors.price = "Price per night is required";
    return newErrors;
  };

  const newSpotData = {
    ...formData,
    lat: parseFloat(formData.lat),
    lng: parseFloat(formData.lng),
    imageUrls: [formData.previewImageUrl, ...formData.imageUrls].filter(
      (url) => url
    ),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalErrors = validateForm();
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      return;
    }

    const newSpot = dispatch(createNewSpot(newSpotData));
    console.log(newSpot);

    return;
    // newSpot.then(navigate(`/spots/${newSpot.id}`));
  };

  // const validateAllFields = () => {
  //   const finalErrors = {};
  //   if (!formData.previewImageUrl)
  //     finalErrors.previewImageUrl = "Preview Image URL is required";
  //   if (formData.description.length < 30)
  //     finalErrors.description = "Description needs 30 or more characters";
  //   if (!formData.name) finalErrors.name = "Name of your spot is required";
  //   if (!formData.price) finalErrors.price = "Price per night is required";
  //   return finalErrors;
  // };

  // Collect all error messages into an array for display
  const errorMessages = Object.values(errors);

  return (
    <div id="create-spot-container">
      <form onSubmit={handleSubmit} className="create-spot-form">
        <h1>Create a New Spot</h1>

        <section>
          <h2>Where&apos;s your place located?</h2>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>

          <select
            className="select-field"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
            required
          >
            <option value="" disabled>
              Select a Country
            </option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Australia">Australia</option>
            <option value="Japan">Japan</option>
            <option value="Mexico">Mexico</option>
            <option value="Italy">Italy</option>
            <option value="Spain">Spain</option>
          </select>
          <input
            className="input-field"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Street Address"
            required
          />
          <input
            className="input-field"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
            required
          />
          <input
            className="input-field"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="State"
            required
          />
          <div id="lat-long">
            <input
              className="lat"
              type="number"
              name="lat"
              value={formData.lat}
              onChange={handleInputChange}
              placeholder="Latitude"
            />
            ,
            <input
              className="long"
              type="number"
              name="lng"
              value={formData.lng}
              onChange={handleInputChange}
              placeholder="Longitude"
            />{" "}
          </div>
          <div
            style={{
              fontSize: "0.8em",
              fontStyle: "italic",
              textAlign: "right",
              marginRight: "1em",
              paddingBottom: "1em",
            }}
          >
            *Optional
          </div>
        </section>

        <section>
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            className="textarea-field"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Please write at least 30 characters"
            required
          />
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </section>

        <section>
          <h2>Create a title for your spot</h2>
          <p>
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
          <input
            className="input-field"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name of your spot"
            required
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </section>

        <section>
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <input
            className="input-field"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price per night (USD)"
            required
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </section>

        <section>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>

          <div className="image-url-container">
            <input
              className="input-field"
              name="previewImageUrl"
              value={formData.previewImageUrl}
              onChange={handleInputChange}
              placeholder="Required: Preview Image URL"
            />

            {errors.previewImageUrl && (
              <p className="error-message">{errors.previewImageUrl}</p>
            )}
            {formData.imageUrls.map((url, index) => (
              <input
                key={index}
                className="input-field"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="Image URL"
              />
            ))}
          </div>
        </section>

        <button type="submit">Create Spot</button>
      </form>

      <div id="errors-container">
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
};

export default CreateSpot;

// try {
//   const newSpot = await dispatch(createNewSpot(newSpotData));
//   console.log("New spot created:", newSpot);
//   navigate(`/spots/${newSpot.id}`);
// } catch (error) {
//   setErrors({ submit: error.message || "An unknown error occurred." });
// }
