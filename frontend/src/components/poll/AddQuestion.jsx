import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "@tanstack/react-router";
import '../../styles/Auth.css'
import '../../styles/CreatePoll.css'
import { questionService } from "../../services/questionService";

const AddQuestion = ({pollId}) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      text: ""
    },
  });

  const submit = async (data) => {
    try {
        console.log(data)
      const res = await questionService.addQuestion({...data,poll:pollId})
      toast.success(res?.message);
      navigate({to:`/question/${res.data._id}/options/add`,search:{pollId: res.data.poll}})
      console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Question addition failed");
      console.log(error);
    }
  };

  return (
    <>
      <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <Link to="/" className="auth-logo">Pulse<span>Board</span></Link>
                    <h1 className="auth-title">Add a Question</h1>
                    <p className="auth-sub">Add a question to your poll.</p>
                </div>

                <form onSubmit={handleSubmit(submit)} className="auth-form">
                    <div className="form-field">
                        <label className="form-label">Question</label>
                        <input
                            type="text"
                            placeholder="ex: What is your favourite framework?"
                            className={errors.text ? "input-error" : ""}
                            {...register("text", {
                                required: "Question is required",
                                minLength: { value: 3, message: "Must be at least 3 characters" },
                                maxLength: { value: 500, message: "Must be under 500 characters" },
                            })}
                        />
                        {errors.text && <p className="error-msg">{errors.text.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="btn-primary auth-submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding..." : "Add Question"}
                    </button>
                </form>
            </div>
        </div>
    </>
  );
};

export default AddQuestion;
