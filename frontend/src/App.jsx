import { useEffect,useState } from "react"
import Hero from "./components/Hero.jsx"
import Navbar from "./components/Navbar.jsx"
import { tokenStore } from "./services/tokenStore.js"
import PollList from "./components/PollList.jsx"


const App = () => {
  return (
    <div>
      <Hero/>
      <PollList/>
    </div>
  )
}

export default App