import { Link, useNavigate } from '@tanstack/react-router'
import '../styles/Navbar.css'
import { useState, useRef, useEffect } from 'react'
import { authService } from '../services/authService'
import { tokenStore } from '../services/tokenStore'

export default function Navbar() {
    const navigate = useNavigate()
    const [showConfirm, setShowConfirm] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null)
const user = tokenStore.getUser()
    // close dropdown on outside click
    useEffect(() => {
        const handleOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleOutside)
        return () => document.removeEventListener('mousedown', handleOutside)
    }, [])

    const handleLogout = async () => {
        await authService.logout()
        setShowConfirm(false)
        navigate({ to: '/login' })
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-inner">
                    <Link to="/" className="navbar-logo">
                        Pulse<span>Board</span>
                    </Link>

                    <div className="navbar-actions">
                        {user ? (
                            <>
                                <Link to="/poll/create" className="btn-create">
                                    + Create Poll
                                </Link>

                                {/* Avatar dropdown */}
                                <div className="avatar-wrapper" ref={dropdownRef}>
                                    <div
                                        className="navbar-avatar"
                                        title={user?.name}
                                        onClick={() => setShowDropdown(prev => !prev)}
                                    >
                                        {user?.name?.[0]?.toUpperCase()}
                                    </div>

                                    {showDropdown && (
                                        <div className="avatar-dropdown">
                                            <div className="dropdown-user">
                                                <span className="dropdown-name">{user?.name}</span>
                                                <span className="dropdown-email">{user?.email}</span>
                                            </div>
                                            <div className="dropdown-divider" />
                                            <Link
                                                to="/dashboard"
                                                className="dropdown-item"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                My Polls
                                            </Link>
                                            <Link
                                                to="/my-votes"
                                                className="dropdown-item"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                My Votes
                                            </Link>

                                            <div className="dropdown-divider" />
                                            <button
                                                className="dropdown-item dropdown-item--danger"
                                                onClick={() => {
                                                    setShowDropdown(false)
                                                    setShowConfirm(true)
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
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

            {/* Logout confirm modal */}
            {showConfirm && (
                <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
                    <div className="modal-card" onClick={e => e.stopPropagation()}>
                        <h3 className="modal-title">Log out?</h3>
                        <p className="modal-sub">Are you sure you want to log out of PulseBoard?</p>
                        <div className="modal-actions">
                            <button className="modal-btn-cancel" onClick={() => setShowConfirm(false)}>
                                Cancel
                            </button>
                            <button className="modal-btn-confirm" onClick={handleLogout}>
                                Yes, Log out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}