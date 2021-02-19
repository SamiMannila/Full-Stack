import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import {FilterItems, Filter} from './components/FilterItems'
import PersonForm from './components/PersonForm'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

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