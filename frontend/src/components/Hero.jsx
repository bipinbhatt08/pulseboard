import { Link } from '@tanstack/react-router'
import '../styles/Hero.css'

export default function Hero({total,voteTotal,userTotal}) {
    return (
        <section className="hero">
            <div className="hero-inner">
                <div className="hero-badge">Live polling, simplified</div>
                <h1 className="hero-title">
                    Create polls.<br />
                    <span>Understand people.</span>
                </h1>
                <p className="hero-sub">
                    PulseBoard lets you build instant polls, share them anywhere,
                    and watch results roll in — live.
                </p>
                <div className="hero-actions">
                    <Link to="/register" className="hero-btn-primary">Get Started Free</Link>
                    <Link to="/polls" className="hero-btn-ghost">Browse Polls →</Link>
                </div>

                <div className="hero-stats">
                    <div className="hero-stat">
                        <span className="stat-number">{total}+</span>
                        <span className="stat-label">Polls Created</span>
                    </div>
                    <div className="hero-stat-divider" />
                    <div className="hero-stat">
                        <span className="stat-number">{voteTotal}+</span>
                        <span className="stat-label">Votes Cast</span>
                    </div>
                    <div className="hero-stat-divider" />
                    <div className="hero-stat">
                        <span className="stat-number">{userTotal}+</span>
                        <span className="stat-label">Active Users</span>
                    </div>
                </div>
            </div>
        </section>
    )
}