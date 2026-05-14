import { useEffect, useState } from 'react'

const getTimeRemaining = (expiresAt) => {
    const diff = new Date(expiresAt) - new Date()
    if (diff <= 0) return null

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
}

const Countdown = ({ expiresAt }) => {
    const [time, setTime] = useState(getTimeRemaining(expiresAt))

    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = getTimeRemaining(expiresAt)
            setTime(remaining)
            if (!remaining) clearInterval(interval)
        }, 1000)

        return () => clearInterval(interval)
    }, [expiresAt])

    if (!time) return <span className="expired">Poll Expired</span>

    return (
        <div className="countdown">
            {time.days > 0 && (
                <div className="countdown-unit">
                    <span className="countdown-value">{time.days}</span>
                    <span className="countdown-label">d</span>
                </div>
            )}
            <div className="countdown-unit">
                <span className="countdown-value">{String(time.hours).padStart(2, '0')}</span>
                <span className="countdown-label">h</span>
            </div>
            <div className="countdown-unit">
                <span className="countdown-value">{String(time.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">m</span>
            </div>
            <div className="countdown-unit">
                <span className="countdown-value">{String(time.seconds).padStart(2, '0')}</span>
                <span className="countdown-label">s</span>
            </div>
        </div>
    )
}

export default Countdown