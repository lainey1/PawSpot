import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { createNewSpot } from "../../store/spots";

import "./CreateSpot.css";

const CreateSpot = () => {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // ? IS THIS THE BUG ?
    const newSpotData = {
      ...formData,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
      imageUrls: [formData.previewImageUrl, ...formData.imageUrls].filter(
        (url) => url
      ), // Combine
    };

    try {
      const newSpot = await dispatch(createNewSpot(newSpotData));
      console.log("New spot created:", newSpot); // Log to check what data you have
      navigate(`/spots/${newSpot.id}`); // Navigate to the new spot's detail page
    } catch (error) {
      console.log("goodbye");
      setErrors({ submit: error.message || "An unknown error occurred." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-spot-form">
      <h2>Create a New Spot</h2>

      <section id="location">
        <h3>Where&apos;s your place located?</h3>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>

        <h3>Where&apos;s your place located?</h3>
        <p>
          Guests will only get your exact address once they booked a
          reservation.
        </p>

        <select
          className="select-field"
          name="country"
          value={formData.country}
          onChange={handleChange}
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
          onChange={handleChange}
          placeholder="Street Address"
          required
        />
        <input
          className="input-field"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          className="input-field"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          required
        />
        <div id="lat-long">
          <input
            className="lat"
            type="number"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            placeholder="Latitude"
          />
          ,
          <input
            className="long"
            type="number"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            placeholder="Longitude"
          />{" "}
        </div>
        <div
          style={{
            fontSize: "0.8em",
            fontStyle: "italic",
            textAlign: "right",
            marginRight: "1em",
          }}
        >
          *Optional
        </div>
      </section>

      {/* Description Section */}
      <h3>Describe your place to guests</h3>
      <p>
        Mention the best features of your space, any special amenities like fast
        wifi or parking, and what you love about the neighborhood.
      </p>
      <textarea
        className="textarea-field"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Please write at least 30 characters"
      />
      {errors.description && (
        <p className="error-message">{errors.description}</p>
      )}

      {/* Title Section */}
      <h3>Create a title for your spot</h3>
      <p>
        Catch guests&apos; attention with a spot title that highlights what
        makes your place special.
      </p>
      <input
        className="input-field"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name of your spot"
      />
      {errors.name && <p className="error-message">{errors.name}</p>}

      {/* Price Section */}
      <h3>Set a base price for your spot</h3>
      <p>
        Competitive pricing can help your listing stand out and rank higher in
        search results.
      </p>
      <input
        className="input-field"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price per night (USD)"
      />
      {errors.price && <p className="error-message">{errors.price}</p>}

      {/* Image Section */}
      <h3>Liven up your spot with photos</h3>
      <p>Submit a link to at least one photo to publish your spot.</p>

      <div className="image-url-container">
        <input
          className="input-field"
          name="previewImageUrl"
          value={formData.previewImageUrl}
          onChange={handleChange}
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

      <button type="submit">Create Spot</button>
    </form>
  );
};

export default CreateSpot;
