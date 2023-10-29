import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 fixed inset-x-0">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-2xl">Your Logo</div>
          <div className="space-x-4">
            <a href="#" className="text-white">
              Home
            </a>
            <a href="#" className="text-white">
              Sign in
            </a>
            <a href="#" className="text-white">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
