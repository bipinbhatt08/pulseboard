import Poll from './poll.model.js'

const createPoll = async({user,title,durationUnit,durationValue}) => {

    const multipliers = {
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000
    }
    
    const expiresAt = new Date(
    Date.now() +
    durationValue * multipliers[durationUnit]
    )

    const poll = await Poll.create({user,expiresAt,title})

    return poll
}
const getPollById = async(id) =>{
    const poll = await Poll.findById(id)
}


export {createPoll,getPollById}