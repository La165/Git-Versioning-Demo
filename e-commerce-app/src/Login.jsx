import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { loginUserThunk } from "./Store";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, message, error } = useSelector(
    (state) => state.login
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    const result = await dispatch(loginUserThunk(data));

    // If login success (user exists)
    if (result.meta.requestStatus === "fulfilled" && result.payload.user) {
      navigate("/home");
    }

    reset();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(submitForm)}>
        <h2>Login</h2>

        {/* Loader */}
        {loading && <p className="info">Processing...</p>}

        {/* Success message ONLY when user exists */}
        {user && message && <p className="success">{message}</p>}

        {/* Error message ONLY when user is NULL */}
        {!user && error && <p className="error">{error}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="error">{errors.password.message}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
