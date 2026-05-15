import { Link } from '@tanstack/react-router'
import '../styles/Footer.css'

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="container footer-inner">
                <div className="footer-left">
                    <h3 className="footer-logo">Pulse<span>Board</span></h3>
                    <p className="footer-tagline">
                        Create, vote, and share polls in real time.
                    </p>
                </div>

                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/polls">Browse Polls</Link>
                    <Link to="/poll/create">Create Poll</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>

                <div className="footer-right">
                    <p className="footer-copy">
                        © {new Date().getFullYear()} PulseBoard. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer