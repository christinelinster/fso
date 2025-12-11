const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Must have at least 3 characters'],
        required: true
    },
    number: {
        type: String,
        minLength: [8,'Phone number must be at least 8 characters long'],
        validate: {
            validator: function(v) {
                return /\d{2,3}-\d{5,}$/.test(v)
            },
        },
        message: props => `${props.value} is not a valid phone number.`,
        required: [true, 'User phone number required.' ],
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
}
)
module.exports = mongoose.model('Person', personSchema)