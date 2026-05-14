import { Link, useNavigate } from '@tanstack/react-router'
import '../styles/Navbar.css'
import { useState } from 'react'
import { authService } from '../services/authService'

export default function Navbar({  user }) {
    const navigate = useNavigate()
    const [showConfirm,setShowConfirm] = useState(false)
    const handleLogout = async() =>{
        await authService.logout()
        setShowConfirm(false)
        navigate({to:'/login'})
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
                             
                            <div className="navbar-avatar" title={user?.name}>
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                            <button className=""onClick={()=>setShowConfirm(true)}>
                                logout
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