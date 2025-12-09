require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const person = require('./models/person')

const app = express()

morgan.token('content', (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :content'))
app.use(express.static('dist'))


let persons = []

app.get('/', (request, response) => {
    response.send("<h1>Hello World!</h1>")
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(person =>
        response.status(204).end()
    )
})

const generateId = () => {
    return Math.floor(Math.random() * 1000000) + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name && !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })


})

app.get('/info', (request, response) => {
    Person.find({}).then(people => {
        const numberOfPeople = people.length
        const currDate = new Date()
        response.send(`Phonebook has info for ${numberOfPeople} people.<br/><br/>${currDate}`)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})