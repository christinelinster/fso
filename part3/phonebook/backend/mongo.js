const mongoose = require('mongoose')

// Example command: node mongo.js yourpassword Anna 040-1234556
// node mongo.js yourpassword => should display all entries (length is 3)

const args = process.argv

if (!args[2]) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://christinelin:${password}@cluster0.rbrc0ko.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (args.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook: ')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: args[3],
    number: args[4] || 'no number'
  })

  person.save().then(() => {
    console.log(`added ${person.name} ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}

