import React from 'react';
import {Country, CountryFull}   from './Country'


const Filter = ({newFilter, handleFilterChange}) => {
  return(
    <div>
          find countries <input value={newFilter} onChange={handleFilterChange}/>
      </div>
  )
}

const FilterCountries = (arr, query) =>{
  return arr.filter(country => country.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}

const FilterItems = ({countries, newFilter}) => {

  const countries_to_show = FilterCountries(countries, newFilter)

  if(newFilter.length === 0 || countries_to_show.length === 0){
    return(
      <p>No results, try different filter</p>
    )
  }

  else if(countries_to_show.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }

  else if(countries_to_show.length === 1){
    return(
      <div>
        {countries_to_show.map(country =>
        <CountryFull key={country.name} country={country} />
      )}
      </div>
    )
  }

  return(
    <div>
      {countries_to_show.map(country =>
        <Country key={country.name} country={country} />
      )}
    </div>) 
}

export {FilterItems, Filter};