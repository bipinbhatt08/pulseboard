import * as React from 'react'
import { authService } from '../services/authService'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import '../styles/Auth.css'
import '../styles/Verify-email.css'

const VerifyEmail = ({ token }) => {
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('')

  React.useEffect(() => {
    const verify = async () => {
      try {
        const res = await authService.verifyEmail(token)
        setMessage(res?.message || 'Your email has been verified.')
        setStatus('success')
      } catch (err) {
        setMessage(err.response?.data?.message || 'Verification failed. The link may have expired.')
        setStatus('error')
      }
    }
    verify()
  }, [])

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <Link to="/" className="auth-logo">Pulse<span>Board</span></Link>
          <h1 className="auth-title">Email Verification</h1>
          <p className="auth-sub">Confirming your PulseBoard account.</p>
        </div>

        <div className="verify-body">
          {status === 'loading' && (
            <div className="verify-state">
              <div className="verify-spinner" />
              <p className="verify-msg">Verifying your email address...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="verify-state">
              <div className="verify-icon verify-icon--success">✓</div>
              <p className="verify-msg">{message}</p>
              <Link to="/login" className="btn-primary auth-submit verify-cta">
                Continue to Login
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="verify-state">
              <div className="verify-icon verify-icon--error">✕</div>
              <p className="verify-msg">{message}</p>
              <Link to="/register" className="btn-primary auth-submit verify-cta">
                Back to Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail