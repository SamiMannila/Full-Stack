import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import {FilterItems, Filter} from './components/FilterItems'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notifications';


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
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

  const deletePerson = id => {
    const person = persons.find(person => person.id === id)
    
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
      .to_delete(id)
      .then(res => {
        setPersons(persons.filter(person => id !== person.id))
      })
      .catch(() => {
        setErrorMessage(
          `Information of ${person.name} has already been removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
}

  const addNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const personWithSameName = persons.find(person => person.name === newName);

    if (personWithSameName == null){
        personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
      })
    }else{
      if (window.confirm(`${personWithSameName.name} is already added to the phonebook, replace the old number with a new one?`)){

        personService
        .update(personWithSameName.id, nameObject)
        .then(updatedPersons => {
          setPersons(persons.map(person => person.id !== personWithSameName.id ? person : updatedPersons))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `Changed ${personWithSameName.name}'s number`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
      }

    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification.Error message={errorMessage} />
      <Notification.Success message={successMessage} />
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addNumber = {addNumber} newName = {newName} handleNameChange = {handleNameChange} 
      newNumber ={newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {FilterItems(persons, newFilter).map(person =>
          <Person
          key={person.name}
          person={person}
          deletePerson = {() => deletePerson(person.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App