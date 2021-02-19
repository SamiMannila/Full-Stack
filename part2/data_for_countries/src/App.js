import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {FilterItems, Filter} from './components/Filter'


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')

  const countriesHook = () => {
    console.log('countries effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('countries promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(countriesHook, [])

  const handleFilterChange = (event) =>{
      setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
      <FilterItems countries = {countries} newFilter = {newFilter}/>
    </div>
  )
}

export default App