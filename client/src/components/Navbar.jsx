import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../state/atoms/userState";
import { decodeToken } from "react-jwt";

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem("token");

    // Navigate back to the login page
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = decodeToken(token);
      setUser(decodedUser);
    }
  }, [setUser]);

  return (
    <nav className="bg-blue-500 p-4 fixed inset-x-0">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-2xl">Your Logo</div>
          <div className="space-x-4">
            {user ? (
              <>
                <Link to="/contact" className="text-white">
                  Contact List
                </Link>
                <button onClick={handleLogout} className="text-white">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-white">
                  Sign in
                </Link>
                <Link to="/sign_up" className="text-white">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
