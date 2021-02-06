import React, { useState } from 'react'
import Person from './components/Person'
import {FilterItems, Filter} from './components/FilterItems'
import PersonForm from './components/PersonForm'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) =>{
      setNewFilter(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const inList = persons.find(person => person.name === newName);

    if (inList == null){
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
    }else{
        window.alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addNumber = {addNumber} newName = {newName} handleNameChange = {handleNameChange} 
      newNumber ={newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {FilterItems(persons, newFilter).map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App