import { Link } from '@tanstack/react-router'
import '../styles/PollList.css'
import PollCard from './PollCard.jsx'

const PollCardSkeleton = () => (
    <div className="poll-card poll-card-skeleton">
        <div className="skeleton-row">
            <div className="skeleton skeleton-badge" />
            <div className="skeleton skeleton-badge" />
        </div>
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-title skeleton-title--short" />
        <div className="skeleton-row skeleton-meta">
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
        </div>
        <div className="skeleton skeleton-btn" />
    </div>
)

const PollList = ({ polls, isLoading, total }) => {
    return (
        <section className="poll-list-section">
            <div className="container">
                <div className="poll-list-header">
                    <div>
                        <div className="poll-list-eyebrow">
                            <span className="poll-list-live-dot" />
                            Live now
                        </div>
                        <h2 className="poll-list-title">Active Polls</h2>
                        <p className="poll-list-sub">Vote on live polls or explore what others are asking.</p>
                    </div>
                    {!isLoading && polls && (
                        <Link to="/polls" className="poll-list-count">
                            See all {total} polls →
                        </Link>
                    )}
                </div>

                {isLoading ? (
                    <div className="poll-grid">
                        <PollCardSkeleton />
                        <PollCardSkeleton />
                        <PollCardSkeleton />
                    </div>
                ) : polls.length === 0 ? (
                    <div className="poll-list-empty">
                        <p>No polls yet. Be the first to create one!</p>
                        <Link to="/poll/create" className="btn-primary auth-submit" style={{ maxWidth: 200, display: 'inline-flex', justifyContent: 'center', textDecoration: 'none' }}>
                            Create Poll
                        </Link>
                    </div>
                ) : (
                    <div className="poll-grid">
                        {polls.map(poll => (
                            <PollCard key={poll._id} poll={poll} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default PollList
