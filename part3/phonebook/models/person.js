const { response } = require('express')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
}
)

// if (process.argv.length === 2) {
//     console.log('phonebook:')
//     Person.find({}).then(result => {
//         result.forEach(person => {
//             console.log(`${person.name} ${person.number}`)
//         })
//         mongoose.connection.close()
//     })

// }

// if (process.argv.length === 4) {
//     const name = process.argv[3]
//     const number = process.argv[4]

//     const person = new Person({
//         name: name,
//         number: number,
//     })

//     person.save().then(result => {
//         console.log(`added ${result.name} number ${result.number} to phonebook`)
//         mongoose.connection.close()
//     })
// }

module.exports = mongoose.model('Person', personSchema)