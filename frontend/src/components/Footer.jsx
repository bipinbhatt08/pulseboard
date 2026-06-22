import { Link } from '@tanstack/react-router'
import '../styles/Footer.css'

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="container footer-inner">
                <div className="footer-brand">
                    <h3 className="footer-logo">Pulse<span>Board</span></h3>
                    <p className="footer-tagline">
                        Create, vote, and share polls in real time.
                    </p>
                </div>

                <div className="footer-col">
                    <span className="footer-col-heading">Product</span>
                    <Link to="/">Home</Link>
                    <Link to="/polls">Browse Polls</Link>
                    <Link to="/poll/create">Create Poll</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>

                <div className="footer-col">
                    <span className="footer-col-heading">Account</span>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p className="footer-copy">© {new Date().getFullYear()} PulseBoard. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
