import { useState, useEffect } from "react"
import { Link } from '@tanstack/react-router'
import Footer from "./components/Footer.jsx"
import Hero from "./components/Hero.jsx"
import HowItWorks from "./components/HowItWorks.jsx"
import Features from "./components/Features.jsx"
import PollList from "./components/PollList.jsx"
import Navbar from "./components/Navbar.jsx"
import { pollService } from "./services/pollService.js"
import { authService } from "./services/authService.js"
import { voteService } from "./services/voteService.js"
import './styles/HomeCTA.css'

const App = () => {
    const [polls, setPolls] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [userTotal, setUserTotal] = useState(null)
    const [voteTotal, setVoteTotal] = useState(null)

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const res = await pollService.getAllPoll({ filter: 'active', limit: 3 })
                setPolls(res.data.polls)
                setTotal(res.data.total)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        const fetchUserCount = async () => {
            try {
                const res = await authService.getUserCount()
                setUserTotal(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchVotesCount = async () => {
            try {
                const res = await voteService.getVoteCount()
                setVoteTotal(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPolls()
        fetchUserCount()
        fetchVotesCount()
    }, [])

    return (
        <div>
            <Navbar />
            <Hero total={total} userTotal={userTotal} voteTotal={voteTotal} />
            <HowItWorks />
            <Features />
            <PollList polls={polls} isLoading={isLoading} total={total} />

            <section className="home-cta">
                <div className="home-cta-inner">
                    <span className="home-cta-eyebrow">Get started today</span>
                    <h2 className="home-cta-title">Ready to hear from your audience?</h2>
                    <p className="home-cta-sub">Create your first poll in under a minute. No credit card required.</p>
                    <div className="home-cta-actions">
                        <Link to="/register" className="cta-btn-primary">Get Started Free</Link>
                        <Link to="/polls" className="cta-btn-ghost">Browse Polls →</Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default App
