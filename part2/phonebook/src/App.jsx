import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    if (searchTerm === '') {
      setFilteredNames('')
    } else {
      const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm)
      )
      setFilteredNames(filteredPersons)
    }
  }

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <div>
          filter shown with <input onChange={handleSearch} type="text" />
        </div>
      </div>
      <div>
        <h2>add a new</h2>
        <form onSubmit={addName}>
          <p>name:<input value={newName} onChange={handleNameChange} /></p>
          <p>number:<input value={newNumber} onChange={handleNumberChange} /></p>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>

      <div>
        <h2>Numbers</h2>
        {filteredNames
          ? filteredNames.map(person => <p key={person.name}>{person.name} {person.number}</p>)
          : persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App