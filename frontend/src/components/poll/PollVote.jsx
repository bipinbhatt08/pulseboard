import { useEffect, useState } from 'react'
import { pollService } from '../../services/pollService'
import { voteService } from '../../services/voteService'
import { toast } from 'react-toastify'
import { Link } from '@tanstack/react-router'
import Loader from '../common/Loader.jsx'
import Countdown from '../common/Countdown.jsx'
import '../../styles/PollVote.css'
import { tokenStore } from '../../services/tokenStore'

const PollVote = ({ pollId }) => {
    const [poll, setPoll] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [answer, setAnswer] = useState({})

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const res = await pollService.getPollWithQuestions(pollId)
                setPoll(res.data)
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to load poll")
            } finally {
                setIsLoading(false)
            }
        }
        fetchPoll()
    }, [pollId])

    const handleClick = (questionId, optId) => {
        setAnswer(prev => {
            if (prev[questionId] === optId) {
                const copy = { ...prev }
                delete copy[questionId]
                return copy
            }
            return { ...prev, [questionId]: optId }
        })
    }

    const castVote = async () => {
        if (Object.keys(answer).length === 0) {
            return toast.error("Please select at least one answer")
        }

        const loggedInUser = tokenStore.getUser()
        let anonymousId

        if (!loggedInUser) {
            if (!poll.allowAnonymousResponse) {
                return toast.error("This poll requires login to vote")
            }
            let id = localStorage.getItem('anonId')
            if (!id) {
                id = crypto.randomUUID()
                localStorage.setItem('anonId', id)
            }
            anonymousId = id
        }

        setSubmitting(true)
        try {
            await Promise.all(
                Object.entries(answer).map(([question, option]) =>
                    voteService.casteVote({ poll: pollId, question, option, anonymousId })
                )
            )
            toast.success("Vote submitted successfully!")
            setSubmitted(true)
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to submit votes")
        } finally {
            setSubmitting(false)
        }
    }

    if (isLoading) return <Loader text="Loading poll..." />

    if (submitted) return (
        <div className="poll-center">
            <div className="verify-icon verify-icon--success">✓</div>
            <h2 className="poll-thanks-title">Thanks for voting!</h2>
            <p className="poll-thanks-sub">Your response has been recorded.</p>
            <Link to="/" className="btn-primary auth-submit poll-back-btn">Go Home</Link>
        </div>
    )

    return (
        <div className="poll-page">
            <div className="poll-inner">

                {/* Header */}
                <div className="poll-header">
                    <Link to="/" className="auth-logo">Pulse<span>Board</span></Link>
                    <h1 className="poll-title">{poll?.title}</h1>
                    <div className="poll-meta">
                        <span className="poll-badge">
                            {poll?.allowAnonymousResponse ? "Anonymous Poll" : "Login Required"}
                        </span>
                        <Countdown expiresAt={poll?.expiresAt} />
                    </div>
                </div>

                {/* Questions */}
                <div className="poll-questions">
                    {poll?.questions?.map((question, index) => (
                        <div key={question._id} className="poll-question-card">
                            <div className="poll-question-header">
                                <span className="poll-question-number">Q{index + 1}</span>
                                <h3 className="poll-question-text">{question.text}</h3>
                                {question?.isRequired && (
                                    <span className="poll-required">Required</span>
                                )}
                            </div>
                            <div className="poll-options">
                                {question.options?.map(opt => (
                                    <button
                                        key={opt._id}
                                        type="button"
                                        className={`poll-option ${answer[question._id] === opt._id ? 'poll-option--selected' : ''}`}
                                        onClick={() => handleClick(question._id, opt._id)}
                                    >
                                        <span className="poll-option-dot" />
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit */}
                <button
                    className="btn-primary auth-submit poll-submit"
                    onClick={castVote}
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : "Submit Vote"}
                </button>

            </div>
        </div>
    )
}

export default PollVote