import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { pollService } from '../services/pollService'
import Loader from './common/Loader'
import '../styles/PollList.css'
import PollCard from './PollCard.jsx'


const PollList = ({polls,isLoading,total}) => {
   

    if (isLoading) return <Loader text="Loading polls..." />

    return (
        <section className="poll-list-section">
            <div className="container">
                <div className="poll-list-header">
                    <h2 className="poll-list-title">Active Polls</h2>
                    <span className="poll-list-count">{total} polls</span>
                </div>

                {polls.length === 0 ? (
                    <div className="poll-list-empty">
                        <p>No polls yet. Be the first to create one!</p>
                        <Link to="/poll/create" className="btn-primary auth-submit" style={{ maxWidth: 200, display: 'inline-flex', justifyContent: 'center', textDecoration: 'none' }}>
                            Create Poll
                        </Link>
                    </div>
                ) : (
                    <div className="poll-grid">
                        {polls.map(poll => (
                            <PollCard key={poll._id} poll={poll} />
                        ))}
                    </div>


                )}
                
            </div>
            
        </section>
    )
}

export default PollList