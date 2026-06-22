import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Link, useNavigate } from "@tanstack/react-router"
import { optionService } from "../../services/optionService"
import '../../styles/Auth.css'

const AddOption = ({ questionId ,pollId}) => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({ defaultValues: { text: "" } })

    const submit = async (data) => {
        try {
            const res = await optionService.createOption({ text: data.text, question: questionId })
            toast.success(res?.message || "Option added!")
            reset()
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add option")
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <Link to="/" className="auth-logo">Pulse<span>Board</span></Link>
                    <h1 className="auth-title">Add Options</h1>
                    <p className="auth-sub">Step 3 of 3 — add the answer choices.</p>
                </div>

                <form onSubmit={handleSubmit(submit)} className="auth-form">
                    <div className="form-field">
                        <label className="form-label">Option Text</label>
                        <input
                            type="text"
                            placeholder="ex: React"
                            className={errors.text ? "input-error" : ""}
                            {...register("text", {
                                required: "Option text is required",
                                minLength: { value: 1, message: "Option cannot be empty" },
                                maxLength: { value: 200, message: "Option must be under 200 characters" }
                            })}
                        />
                        {errors.text && <p className="error-msg">{errors.text.message}</p>}
                    </div>

                    {/* Add another option */}
                    <button
                        type="submit"
                        className="btn-primary auth-submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding..." : "+ Add Option"}
                    </button>

                    <button
                        type="button"
                        className="btn-ghost auth-submit done-btn"
                        onClick={() => navigate({ to: `/poll/${pollId}/questions/add` })}
                    >
                        Add Another Question
                    </button>

                    <button
                        type="button"
                        className="btn-finish"
                        onClick={() => navigate({ to: '/dashboard' })}
                    >
                        Finish & Go to Dashboard
                    </button>

                </form>

            </div>
        </div>
    )
}

export default AddOption