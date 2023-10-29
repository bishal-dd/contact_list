import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 fixed inset-x-0">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-2xl">Your Logo</div>
          <div className="space-x-4">
            <Link to="/" className="text-white">
              Home
            </Link>
            <Link to="/sign_in" className="text-white">
              Sign in
            </Link>
            <Link to="/sign_up" className="text-white">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
