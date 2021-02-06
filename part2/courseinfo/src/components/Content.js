import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {

    const total = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
      <div>
          <ul>
            {parts.map((part) => 
            <Part key={part.id} part={part} />
            )}
          </ul>
          <h4>Total of {total} exercises</h4>
      </div>
    )
  }
  
export default Content