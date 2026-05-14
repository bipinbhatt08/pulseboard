import { Link } from '@tanstack/react-router'
import '../styles/PollList.css'
const  PollCard = ({ poll }) => {
    const isExpired = new Date() > new Date(poll.expiresAt)

    return (
        <div className={`poll-card ${isExpired ? 'poll-card--expired' : ''}`}>
            <div className="poll-card-header">
                <span className={`poll-card-status ${isExpired ? 'status--expired' : 'status--active'}`}>
                    {isExpired ? 'Expired' : 'Active'}
                </span>
                <span className="poll-card-anon">
                    {poll.allowAnonymousResponse ? 'Anonymous' : 'Login Required'}
                </span>
            </div>

            <h3 className="poll-card-title">{poll.title}</h3>

            <div className="poll-card-meta">
                <span className="poll-card-questions">
                    {poll.questions?.length ?? 0} questions
                </span>
                <span className="poll-card-date">
                    {new Date(poll.createdAt).toLocaleDateString()}
                </span>
            </div>

            <div className="poll-card-footer">
                {isExpired || poll.isPublished ? (
                    <Link to={`/poll/${poll._id}`} className="poll-card-btn poll-card-btn--results">
                        View Results
                    </Link>
                ) : (
                    <Link to={`/poll/${poll._id}`} className="poll-card-btn poll-card-btn--vote">
                        Vote Now →
                    </Link>
                )}
            </div>
        </div>
    )
}

export default PollCard