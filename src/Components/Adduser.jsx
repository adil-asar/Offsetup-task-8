
import * as yup from "yup"; 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// form validation 

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  mobile: yup.string().required("Mobile is required").matches(/^\d{10}$/, "Invalid mobile number"),
});

const Adduser = () => {
  const [input, setinput] = useState({ name: "", address: "", mobile: "" });
  const [errors, setErrors] = useState({ name: "", address: "", mobile: "" });
  // api url
  const API_URL = "https://656dc64dbcc5618d3c23ec70.mockapi.io/v1/users";

  const navigate = useNavigate();
  const input_value = (event) => {
    const { name, value } = event.target;
    setinput((values) => ({
      ...values,
      [name]: value,
    }));

    // Validate the field and set errors
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })))
      .catch((error) => setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message })));

  };

  const handle_submit = async (event) => {
    event.preventDefault();

    try {
      // Validate the entire form before submitting
      await validationSchema.validate(input, { abortEarly: false });
      await axios.post(API_URL, input);
      alert("Data sent successfully");
      setinput({ name: "", address: "", mobile: "" });
      navigate("/view");
    } catch (error) {
      console.error("Error adding user", error);
      alert("Error sending data. Please try again later.");
      if (error.name === "ValidationError") {
        // Handle validation errors
        const fieldErrors = {};
        error.inner.forEach((e) => {
          fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
      } else {
        // Handle other errors
        console.error("Error adding user", error);
        alert("Error sending data. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-700">
      <h1 className="text-3xl text-center text-yellow-600">Add User</h1>
      <div className="flex flex-col w-1/2 p-8 mt-5 rounded-lg bg-slate-500">
        <form>
          <input
            type="text"
            placeholder="name"
            autoComplete="off"
            className="w-full p-3 text-yellow-600 placeholder-yellow-600 bg-transparent border-2 border-yellow-600 rounded-md outline-none"
            name="name"
            value={input.name}
            onChange={input_value}
          />
           {errors.name && <div className="mb-5 text-red-500">{errors.name}</div>}
          <input
            type="text"
            placeholder="Location "
            autoComplete=""
            className="w-full p-3 text-yellow-600 placeholder-yellow-600 bg-transparent border-2 border-yellow-600 rounded-md outline-none"
            name="address"
            value={input.address}
            onChange={input_value}
          />
 {errors.address && <div className="mb-5 text-red-500">{errors.address}</div>}
          <input
            placeholder="Enter Mobile Number"
            autoComplete="new-password"
            className="w-full p-3 text-yellow-600 placeholder-yellow-600 bg-transparent border-2 border-yellow-600 rounded-md outline-none mb-"
            type="text"
            name="mobile"
            value={input.mobile}
            onChange={input_value}
          />
           {errors.mobile && <div className="mb-5 text-red-500">{errors.mobile}</div>}
          <button
            onClick={handle_submit}
            className="w-1/2 px-8 py-2 text-white bg-yellow-600 border border-yellow-600 rounded hover:text-white hover:border-transparent"
          >
            Add New
          </button>
        </form>
      </div>
    </div>
  );
};

export default Adduser;
