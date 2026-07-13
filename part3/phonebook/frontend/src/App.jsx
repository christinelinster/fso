import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from '../services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    personService.getPersons()
      .then(initialData => setPersons(initialData))
  }, [])

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 3000)

  }

  const updatePerson = (person) => {
    const ok = window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)
    if (ok) {
      personService
        .updatePerson({ ...person, number: newNumber })
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          notifyWith(`Phone number of ${returnedPerson.name} updated!`)
          clearForm()
        })
        .catch(() => {
          notifyWith(`Information of ${person.name} has already been removed from server.`, true)
          setPersons(persons.filter(p => p.name !== person.name))
        })
    }
  }

  const onAddNew = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      updatePerson(existingPerson)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .createPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notifyWith(`Added ${returnedPerson.name}!`)
        clearForm()
      })
      .catch(error => {
        notifyWith(error.response.data.error, true)
      })

  }

  const onDeletePerson = (person) => {
    const ok = window.confirm(`Delete ${person.name} ?`)

    if (ok) {
      personService.deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          notifyWith(`Deleted ${person.name}`)
        })
        .catch(error => {
          notifyWith(error.response.data.server, true)
        })

    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter search={search} setSearch={setSearch} />

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        onAddNew={onAddNew}
      />


      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDeletePerson={onDeletePerson} />
    </div>
  )
}

export default App