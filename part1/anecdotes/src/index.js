import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(6).fill(0))
  const [most, setMost] = useState("")

  const handleAnecClick = () => {
    setSelected(Math.round(Math.random() * 5))
  }

  const handleVoteClick = () => {
    const copy = [...points]
      // increment the value in position selected by one
      copy[selected] += 1
      setPoints(copy)

    // most votes anecdote
    let max_index = copy.indexOf(Math.max(...copy))
    setMost(anecdotes[max_index])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={handleVoteClick} text ="vote" />
      <Button handleClick={handleAnecClick} text ="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{most}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)