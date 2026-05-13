import React, { useEffect, useState } from 'react'
import { pollService } from '../../services/pollService'
import { toast } from 'react-toastify'
const pollVote = () => {
    const [poll,setPoll] = useState()


    useEffect(()=>{
        const fetchPoll = async()=>{
            try {
                const ok = await pollService.castVOte()

            } catch (error) {
                toast(error.response.message)
            }
        }
        fetchPoll()
    },[])
  return (
    <div>
""HELLO""
    </div>
  )
}

export default pollVote