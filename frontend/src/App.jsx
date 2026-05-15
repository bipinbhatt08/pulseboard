import { useState } from "react"
import Footer from "./components/Footer.jsx"
import Hero from "./components/Hero.jsx"
import PollList from "./components/PollList.jsx"
import { useEffect } from "react"
import { pollService } from "./services/pollService.js"
import Navbar from "./components/Navbar.jsx"
import { authService } from "./services/authService.js"
import { voteService } from "./services/voteService.js"


const App = () => {
   const [polls, setPolls] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [userTotal,setUserTotal] = useState()
    const [voteTotal,setVoteTotal] = useState()
    useEffect(() => {
        const fetchPolls = async () => {
            try {
                
                const res = await pollService.getAllPoll({filter:'active',limit:3})
                console.log(res)
                setPolls(res.data.polls)
                setTotal(res.data.total)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        const fetchUserCount = async()=>{
          try {
            const totalUser = await authService.getUserCount()
            setUserTotal(totalUser.data)
          } catch (error) {
            console.log(error)
          }
        }
        const fetchVotesCount = async()=>{
          try {
            const total = await voteService.getVoteCount()
            setVoteTotal(total.data)
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
      <Navbar/>
      <Hero total = {total} userTotal={userTotal} voteTotal={voteTotal}/>
      <PollList polls={polls} isLoading={isLoading} total={total}/>
      <Footer/>
    </div>
  )
}

export default App