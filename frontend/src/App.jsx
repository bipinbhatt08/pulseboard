import { useEffect,useState } from "react"
import Hero from "./components/Hero.jsx"
import Navbar from "./components/Navbar.jsx"
import { tokenStore } from "./services/tokenStore.js"
import PollList from "./components/PollList.jsx"


const App = () => {
const [user,setUser] = useState()

 useEffect(()=>{
    const getUser = async () => {
         try {
           const userR = tokenStore.getUser()
           setUser(userR)
         } catch (err) {
           console.log("ERROR:",err)
         }
       }
    getUser()

 },[])
  return (
    <div>
      <Navbar user={user} />
      <Hero/>
      <PollList/>
    </div>
  )
}

export default App