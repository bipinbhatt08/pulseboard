import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { pollService } from '../services/pollService.js'
import Loader from '../components/common/Loader.jsx'
import PollCard from '../components/PollCard.jsx'
import '../styles/PollList.css'
import Navbar from './Navbar.jsx'

const LIMIT = 9

const PollsPage = () => {
    const [polls, setPolls] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState('all')  // ← add

    const totalPages = Math.ceil(total / LIMIT)

    useEffect(() => {
        const fetchPolls = async () => {
            setIsLoading(true)
            try {
                const offset = (page - 1) * LIMIT
                const res = await pollService.getAllPoll({ offset, limit: LIMIT, filter })  // ← add filter
                setPolls(res.data.polls)
                setTotal(res.data.total)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPolls()
    }, [page, filter])  // ← add filter

    const handleFilterChange = (f) => {
        setFilter(f)
        setPage(1)
    }

    return (

       <>
       <Navbar/>
        <div className="polls-page">
            <div className="container">

                <div className="poll-list-header">
                    <div>
                        <h1 className="poll-list-title">Browse Polls</h1>
                        <p className="poll-list-sub">Vote on polls shared by the community</p>
                    </div>
                    <span className="poll-list-count">{total} polls</span>
                </div>

                {/* Filter tabs ← add */}
                <div className="poll-filters">
                    {['all', 'active', 'expired', 'published','annonymous','authenticated'].map(f => (
                        <button
                            key={f}
                            className={`poll-filter-btn ${filter === f ? 'poll-filter-btn--active' : ''}`}
                            onClick={() => handleFilterChange(f)}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <Loader text="Loading polls..." />
                ) : polls.length === 0 ? (
                    <div className="poll-list-empty">
                        <p>No polls yet. Be the first to create one!</p>
                        <Link to="/poll/create" className="btn-primary auth-submit poll-empty-btn">
                            Create Poll
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="poll-grid">
                            {polls.map(poll => (
                                <PollCard key={poll._id} poll={poll} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                                    ← Prev
                                </button>
                                <div className="page-numbers">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                        <button
                                            key={p}
                                            className={`page-number ${page === p ? 'page-number--active' : ''}`}
                                            onClick={() => setPage(p)}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                                <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
       </>
    )
}

export default PollsPage