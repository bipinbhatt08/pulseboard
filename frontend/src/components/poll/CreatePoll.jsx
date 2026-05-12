import { useForm } from "react-hook-form";
import { pollService } from "../../services/pollService";
import { toast } from "react-toastify";
import { Link } from "@tanstack/react-router";
import "../../styles/Auth.css";
import "../../styles/CreatePoll.css";
const CreatePoll = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      durationUnit: "",
      durationValue: "",
      allowAnonymousResponse: false,
    },
  });

  const submit = async (data) => {
    try {
      const res = await pollService.createPoll(data);
      toast.success(res?.message);
      console.log(res.data);
    } catch (error) {
      toast.error(err.response?.data?.message || "Poll creation failed");
      console.log(error);
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              Pulse<span>Board</span>
            </Link>
            <h1 className="auth-title">Create a Poll</h1>
            <p className="auth-sub">Give it a nice name.</p>
          </div>
          <form onSubmit={handleSubmit(submit)} className="auth-form">
            <div className="form-field">
              <label className="form-label">Poll Title</label>
              <input
                type="text"
                placeholder="Title"
                className={errors.title ? "input-error" : ""}
                {...register("title", {
                  required: "Poll title is required",
                })}
              />
              {errors.title && (
                <p className="error-msg">{errors.title.message}</p>
              )}
            </div>

            {/* Duration */}
            <div className="form-field">
              <label className="form-label">Poll Duration</label>
              <div className="duration-row">
                <input
                  type="number"
                  placeholder="ex: 10"
                  className={`duration-value ${errors.durationValue ? "input-error" : ""}`}
                  {...register("durationValue", {
                    required: "Duration is required",
                    min: { value: 1, message: "Must be at least 1" },
                    max: { value: 999, message: "Too large" },
                  })}
                />
                <select
                  className="duration-unit"
                  {...register("durationUnit", {
                    required: "Unit is required",
                  })}
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
              {errors.durationValue && (
                <p className="error-msg">{errors.durationValue.message}</p>
              )}
            </div>

            <div className="form-field toggle-field">
              <div className="toggle-info">
                <label className="form-label">Allow Anonymous Responses</label>
                <p className="text-muted">Let people vote without an account</p>
              </div>
              <label className="toggle">
                <input
                  type="checkbox"
                  {...register("allowAnonymousResponse")}
                />
                <span className="toggle-slider" />
              </label>
            </div>
            <button
              type="submit"
              className="btn-primary auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Poll..." : "Create Poll"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePoll;
