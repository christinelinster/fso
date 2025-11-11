import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAllPeople()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const personExists = persons.find(person => person.name === newName)

    if (personExists) {
      const ans = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (ans) {
        personsService
          .updateNumber(personExists.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? personObject : person))
            setMessage(`${newName}'s number updated!`)
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(error => {
            setMessage(`Information of ${newName} has already been removed from server.`)
            setTimeout(() => setMessage(null), 5000)
            setPersons(persons.filter(person => person.id !== personExists.id))
          })
      }
    } else {
      personsService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${newName}.`)
          setTimeout(() => setMessage(null), 5000)
        })

    }
    setNewName('')
    setNewNumber('')
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

  const handleDelete = (id) => {
    const selectedPerson = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${selectedPerson.name} ?`)) {
      personsService
        .deletePerson(id)
        .then(returnedPerson => setPersons(persons.filter(person => person.id !== returnedPerson.id)))
    }

  }

  return (
    <div>
      <div>
        <h1>Phonebook</h1>
        <Notification message={message} />
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
          ? <Persons persons={filteredNames} onDelete={handleDelete} />
          : <Persons persons={persons} onDelete={handleDelete} />}
      </div>
    </div>
  )
}

export default App