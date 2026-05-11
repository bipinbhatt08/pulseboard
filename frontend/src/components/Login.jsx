import { useForm } from "react-hook-form";
import { authService } from "../services/authService.js";
import { toast } from "react-toastify";
import { Link } from "@tanstack/react-router";
import '../styles/Auth.css';
import { useState } from "react";

const Login = () => {
  const [showPassword,setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ mode: "onSubmit" });

  const submit = async (data) => {
    try {
      const res = await authService.login(data);
      toast.success(res?.message);
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleShowPassword =(e) => {
    setShowPassword((prev)=>!prev)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Header */}
        <div className="auth-header">
          <Link to="/" className="auth-logo">Pulse<span>Board</span></Link>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your PulseBoard account.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="auth-form">


          <div className="form-field">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="ex: john@example.com"
              className={errors.email ? "input-error" : ""}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="error-msg">{errors.email.message}</p>}
          </div>

          <div className="form-field">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
                <input
                type={showPassword?"text":"password"}
                placeholder="Min. 6 characters"
                className={errors.password ? "input-error" : ""}
                {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    maxLength: 128,
                })}
            />
                <button type="button" className="toggle-password" onClick={handleShowPassword}>
                {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            {errors.password && <p className="error-msg">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="btn-primary auth-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;