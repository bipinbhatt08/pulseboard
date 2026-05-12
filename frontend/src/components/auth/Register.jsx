import * as react from 'react'
import { useForm } from "react-hook-form";
import { authService } from "../services/authService.js";
import { toast } from "react-toastify";
import { Link } from "@tanstack/react-router";
import '../../styles/Auth.css';

const Register = () => {
  const [showPassword,setShowPassword] = react.useState(false)
  const [success,setSuccess] = react.useState(false) 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onSubmit" });

  const submit = async (data) => {
    try {
      await authService.register(data);
      toast.success("Registration successful! Please verify your email.");
      setSuccess(true)
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };




const handleShowPassword =(e) => {
    setShowPassword((prev)=>!prev)
  }

if(success){
  return <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">Pulse<span>Board</span></Link>
            <div className="verify-icon verify-icon--success">✓</div>
            <h1 className="auth-title">Check your inbox</h1>
            <p className="auth-sub">
              We sent a verification link to your email address.
              Click it to activate your account and start using PulseBoard.
            </p>
          </div>
          <p className="auth-footer">
            Already verified? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
}

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Header */}
        <div className="auth-header">
          <Link to="/" className="auth-logo">Pulse<span>Board</span></Link>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-sub">Start creating polls and collecting insights.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="auth-form">

          <div className="form-field">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="ex: John Doe"
              className={errors.name ? "input-error" : ""}
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
                maxLength: { value: 50, message: "Name must be maximum 50 characters" },
              })}
            />
            {errors.name && <p className="error-msg">{errors.name.message}</p>}
          </div>

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
              placeholder="password"
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
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>

        </form>

        {/* Footer */}
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;