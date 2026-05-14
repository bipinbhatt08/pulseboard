import { Link } from '@tanstack/react-router'
import '../styles/Auth.css'

const NotFound = () => {
    return (
        <div className="poll-center">
            <h1 style={{ 
                fontFamily: 'Sora, sans-serif', 
                fontSize: '72px', 
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '-2px'
            }}>
                404
            </h1>
            <h2 style={{ 
                fontFamily: 'Sora, sans-serif',
                color: 'var(--text-primary)',
                fontSize: '20px'
            }}>
                Page not found
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                The page you're looking for doesn't exist.
            </p>
            <Link to="/" className="btn-primary auth-submit" style={{ 
                maxWidth: 160, 
                display: 'inline-flex', 
                justifyContent: 'center',
                textDecoration: 'none'
            }}>
                Go Home
            </Link>
        </div>
    )
}

export default NotFound