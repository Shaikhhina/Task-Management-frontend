import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the snackbar

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  // Validate username, email, and password
  const validate = () => {
    const newErrors = {};
    let isValid = true;

    // Username validation: should not be empty and should have a minimum length
    if (newUser.username.trim() === "") {
      newErrors.username = "Username is required.";
      isValid = false;
    } else if (newUser.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long.";
      isValid = false;
    }

    // Email validation: should be a valid email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (newUser.email.trim() === "") {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(newUser.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    // Password validation: should not be empty and should have a minimum length
    if (newUser.password.trim() === "") {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (newUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:4000/userSignUp",
          newUser
        );
        setNewUser({ username: "", email: "", password: "" });
        console.log(response);
        toast.success("Signup successful! Please login."); // Display success toast
      } catch (error) {
        toast.error("Error signing up! Please try again."); // Display error toast
      }
    }
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://img.freepik.com/premium-vector/hands-fill-registration-data_18660-3897.jpg?w=740)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-950">
                New User Registration
              </h1>
              <p className="text-[15px] text-blue-900 mt-1">
                Hey, enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-lg flex flex-col gap-4">
                {/* username Input */}
                <div>
                  <input
                    className={`w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border ${
                      errors.username ? "border-red-500" : "border-gray-200"
                    } placeholder-gray-500 text-lg focus:outline-none focus:border-gray-400 focus:bg-white`}
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={newUser.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <input
                    className={`w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } placeholder-gray-500 text-lg focus:outline-none focus:border-gray-400 focus:bg-white`}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={newUser.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <input
                    className={`w-full px-6 py-4 rounded-lg font-medium bg-gray-100 border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } placeholder-gray-500 text-lg focus:outline-none focus:border-gray-400 focus:bg-white`}
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    value={newUser.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="mt-5 tracking-wide font-semibold bg-blue-950 text-white w-full py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ToastContainer to render the toast messages */}
      <ToastContainer />
    </div>
  );
}
