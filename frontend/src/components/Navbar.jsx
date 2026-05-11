import { Link } from '@tanstack/react-router'
import '../styles/Navbar.css'

export default function Navbar({ isLoggedIn, user, onLogout }) {
    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo">
                    Pulse<span>Board</span>
                </Link>

                <div className="navbar-actions">
                    {isLoggedIn ? (
                        <>
                            <Link to="/poll/create" className="btn-create">
                                + Create Poll
                            </Link>
                            <div className="navbar-avatar" title={user?.name}>
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                            <button className="btn-ghost" onClick={onLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-ghost">Login</Link>
                            <Link to="/register" className="btn-register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}