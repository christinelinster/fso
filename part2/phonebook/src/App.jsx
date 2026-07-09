import personService from '../services/persons'

import { useState, useEffect } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))


  const onAddNew = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (existingPerson) {
      const message = `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
      if (window.confirm(message)) {
        personService.updatePerson(existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService.createPerson(newPerson)
        .then(returnedPerson => setPersons([...persons, returnedPerson]))
    }
  }

  const onDeletePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== returnedPerson.id))
        })
    }
  }



  useEffect(() => {
    personService.getPersons()
      .then(initialData => setPersons(initialData))
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
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