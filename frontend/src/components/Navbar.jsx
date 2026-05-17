import React from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload();
  };

  return (

    <div className="navbar">

      <div className="logo">
        LUXE STORE
      </div>

      <div className="nav-right">

        {
          user ? (
            <>

              <div className="user-box">
                👤 {user.name}
              </div>

              <button
                className="logout-btn"
                onClick={logout}
              >
                Logout
              </button>

            </>
          ) : (

            <button
              className="logout-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          )
        }

      </div>

    </div>

  );
};

export default Navbar;