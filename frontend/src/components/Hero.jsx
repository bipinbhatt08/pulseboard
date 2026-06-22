import { Link } from '@tanstack/react-router'
import '../styles/Hero.css'

const mockOptions = [
    { label: 'React', pct: 42 },
    { label: 'Vue', pct: 28 },
    { label: 'Svelte', pct: 18 },
    { label: 'Angular', pct: 12 },
]

export default function Hero({ total, voteTotal, userTotal }) {
    return (
        <section className="hero">
            <div className="hero-inner">

                {/* ── Left: copy ── */}
                <div className="hero-left">
                    <div className="hero-badge">
                        <span className="live-dot" />
                        Live polling, simplified
                    </div>
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
                            {total !== null
                                ? <span className="stat-number">{total}+</span>
                                : <span className="skeleton skeleton-stat" />}
                            <span className="stat-label">Polls Created</span>
                        </div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat">
                            {voteTotal !== null
                                ? <span className="stat-number">{voteTotal}+</span>
                                : <span className="skeleton skeleton-stat" />}
                            <span className="stat-label">Votes Cast</span>
                        </div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat">
                            {userTotal !== null
                                ? <span className="stat-number">{userTotal}+</span>
                                : <span className="skeleton skeleton-stat" />}
                            <span className="stat-label">Active Users</span>
                        </div>
                    </div>
                </div>

                {/* ── Right: live mockup ── */}
                <div className="hero-right">
                    <div className="mockup-card">
                        <div className="mockup-header">
                            <div className="mockup-live-badge">
                                <span className="mockup-live-dot" /> Live
                            </div>
                            <span className="mockup-time">2h left</span>
                        </div>
                        <p className="mockup-question">What's your preferred frontend framework?</p>
                        <div className="mockup-options">
                            {mockOptions.map(opt => (
                                <div className="mockup-option" key={opt.label}>
                                    <div className="mockup-option-row">
                                        <span className="mockup-option-label">{opt.label}</span>
                                        <span className="mockup-option-pct">{opt.pct}%</span>
                                    </div>
                                    <div className="mockup-bar">
                                        <div
                                            className="mockup-bar-fill"
                                            style={{ '--target-width': `${opt.pct}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mockup-footer">
                            <span>127 votes</span>
                            <span className="mockup-anon">Anonymous ✓</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
