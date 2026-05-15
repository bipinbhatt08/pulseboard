import { useState } from "react"
import Footer from "./components/Footer.jsx"
import Hero from "./components/Hero.jsx"
import PollList from "./components/PollList.jsx"
import { useEffect } from "react"
import { pollService } from "./services/pollService.js"


const App = () => {
   const [polls, setPolls] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [total, setTotal] = useState(0)


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
        fetchPolls()
    }, [])
  return (
    <div>
      <Hero total = {total}/>
      <PollList polls={polls} isLoading={isLoading} total={total}/>
      <Footer/>
    </div>
  )
}

export default App