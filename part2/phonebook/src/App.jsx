import axios from 'axios'

import { useState, useEffect } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))


  const onAddNew = (e) => {
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons([...persons, newPerson])
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data)
      )
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App