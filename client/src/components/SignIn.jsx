import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // For displaying toasts
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../state/atoms/userState";
import { decodeToken } from "react-jwt";

export default function SignIn() {
  const [user, setUser] = useRecoilState(userState);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Construct your GraphQL query
    const query = `
  query SignInUser($email: String, $password: String) {
    signInUser(email: $email, password: $password)
  }
`;

    const variables = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_GRAPHQL_URL}`,
        {
          query,
          variables,
        }
      );

      const { data } = response.data;
      const { signInUser } = data;
      if (signInUser) {
        // Set the JWT token in local storage
        localStorage.setItem("token", signInUser);
        setUser(decodeToken(signInUser));

        navigate("/contact");
        toast.success("Sign in successful!");
      } else {
        toast.error("Sign in failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle the error here
      console.error("Sign in error:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg border  border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleFormSubmit}>
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
