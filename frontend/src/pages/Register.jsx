import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name:"",
    email:"",
    address:"",
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

      const response = await registerUser(formData);

      alert(response.data.message);

      navigate("/login");

    }
    catch(error){

      alert(

        error.response?.data?.message ||
        "Registration Failed"

      );

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
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
          Register
        </button>

        <p>

          Already have account ?

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>

  );

};

export default Register;