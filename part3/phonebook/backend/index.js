const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()


morgan.token('body', function (req, res) {
    const body = req.body
    return JSON.stringify(body)
 })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))
app.use(cors())

let persons = [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const now = new Date().toUTCString()
    response.send(
        `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${now}</p>
        </div>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const contact = persons.find(person => person.id === id)

    if (!contact) {
        return response.status(400).json({message: 'person not found'})
    }

    response.json(contact)
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log(request.body)
    if (!body.name || !body.number) {
        return response.status(400).json({message: 'name and number required'})
    }

    const personExists = persons.find(p => p.name === body.name);
    if (personExists) {
        return response.status(400).json({message: 'name must be unique'})
    }

    const person = {
        id: Math.random() * 10000000,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end();
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})