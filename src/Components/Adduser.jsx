import * as yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// form validation

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  mobile: yup
    .string()
    .required("Mobile is required")
    .matches(/^\d{10}$/, "Mobile No should be 10 digits"),
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
      .catch((error) =>
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }))
      );
  };

  const go_back = () => {
    navigate("/");
  };

  const handle_submit = async (event) => {
    event.preventDefault();

    try {
      // Validate the entire form before submitting
      await validationSchema.validate(input, { abortEarly: false });
      await axios.post(API_URL, input);
   
      setinput({ name: "", address: "", mobile: "" });
      navigate("/view");
    } catch (error) {
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
    <div className="flex flex-col items-center justify-center w-full h-screen p-3 bg-slate-700">
      <h1 className="text-3xl text-center text-white">Add User</h1>
      <div className="flex flex-col p-5 mt-5 rounded-lg sm:w-full md:w-1/2 bg-slate-500">
        <form>
          <input
            type="text"
            placeholder="name"
            autoComplete="off"
            className="w-full p-3 mt-1 text-white placeholder-white bg-transparent border-2 border-white rounded-md outline-none"
            name="name"
            value={input.name}
            onChange={input_value}
          />
          {errors.name && (
            <div className="mb-2 text-red-500">{errors.name}</div>
          )}
          <input
            type="text"
            placeholder="Location "
            autoComplete=""
            className="w-full p-3 mt-3 text-white placeholder-white bg-transparent border-2 border-white rounded-md outline-none"
            name="address"
            value={input.address}
            onChange={input_value}
          />
          {errors.address && (
            <div className="mb-2 text-red-500">{errors.address}</div>
          )}
          <input
            placeholder="Enter Mobile Number"
            autoComplete="new-password"
            className="w-full p-3 mt-3 text-white placeholder-white bg-transparent border-2 border-white rounded-md outline-none mb-"
            type="text"
            name="mobile"
            value={input.mobile}
            onChange={input_value}
          />
          {errors.mobile && (
            <div className="mb-2 text-red-500">{errors.mobile}</div>
          )}

<div className="flex flex-col justify-between w-full mt-3 sm:flex-row">
      <button
        onClick={handle_submit}
        className="w-full px-8 py-2 mb-3 bg-white border border-white rounded sm:mb-0 sm:w-1/3 text-slate-900 hover:border-transparent"
      >
        Add New
      </button>
      <button
        onClick={go_back}
        className="w-full px-8 py-2 bg-white border border-white rounded sm:w-1/3 sm:mt-0 text-slate-900 hover:border-transparent"
      >
        Go Back
      </button>
    </div>
        </form>
      </div>
    </div>
  );
};

export default Adduser;
