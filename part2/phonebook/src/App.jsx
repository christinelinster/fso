import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState('')

  const getContacts = () => {
    console.log('fetching contacts ... ')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(getContacts, [])
  console.log('rendering', persons.length, 'people')

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
          <Filter onSearch={handleSearch} />
        </div>
      </div>

      <div>
        <h3>add a new</h3>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          onAddName={addName}
          onNameChange={handleNameChange}
          onNumberChange={handleNumberChange}
          />
      </div>

      <div>
        <h2>Numbers</h2>
        {filteredNames
          ? <Persons persons={filteredNames}/>
          : <Persons persons={persons}/>}
      </div>
    </div>
  )
}

export default App