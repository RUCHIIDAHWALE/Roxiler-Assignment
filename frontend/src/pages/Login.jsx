import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email:"",
    password:""

  });

  const handleChange = (e)=>{

    setFormData({

      ...formData,
      [e.target.name]:e.target.value

    });

  };

  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      const response = await loginUser(formData);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      navigate("/");

      window.location.reload();

    }
    catch(error){

      alert(

        error.response?.data?.message ||
        "Login Failed"

      );

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h2>Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

        <p>

          Don't have account ?

          <Link to="/register">
            Register
          </Link>

        </p>

      </form>

    </div>

  );

};

export default Login;