const Event = require('../../models/events')
const { transformEvent } = require('./merge')


module.exports = {

    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return transformEvent(event)
            })
        }
        catch(err) {
            throw err
        }
    },


    createEvent: async args => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date (args.eventInput.date),
            creator: "5c8d01cad06b1b0a508988aa"
        })

        let createdEvent;
        try {
            const result = await event.save()
            createdEvent = transformEvent(result)
            const creator = await User.findById('5c8d01cad06b1b0a508988aa')
        
            if(!creator)
                throw new Error('user not found')
            
            creator.createdEvents.push(event)
            await creator.save()
            return createdEvent
        }
        catch(err) {
            console.log(err)
            throw err
        }
    }
}