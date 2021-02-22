import React from 'react';

const Filter = ({newFilter, handleFilterChange}) => {
  return(
    <div>
          filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      </div>
  )
}
const FilterItems = (arr, query) => {
  return arr.filter(person => person.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}

export {FilterItems, Filter};