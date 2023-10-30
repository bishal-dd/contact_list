import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // For displaying toasts
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Construct your GraphQL query
    const query = `
        mutation SignUp($user_name: String!, $email: String!, $password: String!) {
          createUser(user_name: $user_name, email: $email, password: $password) {
            user_name
          }
        }
    `;

    const variables = {
      user_name: formData.user_name,
      email: formData.email,
      password: formData.password,
    };
    try {
      await axios.post(`${process.env.REACT_APP_GRAPHQL_URL}`, {
        query,
        variables,
      });

      //
      toast.success("Sign up successful!");
      navigate("/sign_in");
    } catch (error) {
      // Handle the error here
      console.error("Sign up error:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg border  border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form autoComplete="off" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 font-medium">
              Name
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Your Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Your Email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
