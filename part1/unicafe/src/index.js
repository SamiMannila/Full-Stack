import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const History = ({allClicks, good, neutral, bad}) => {
  if (allClicks === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <Statistics text="good " value = {good}/>
      <Statistics text="neutral " value = {neutral}/>
      <Statistics text="bad " value = {bad}/>
      <Statistics text="all " value = {good + neutral + bad}/>
      <Statistics text="average " value = {(good - bad) / (good + neutral + bad)}/>
      <Statistics text="positive " value = {good / (good + neutral + bad)} symbol="%" />
    </div>
  )
}

const Statistics = ({text, value, symbol}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value} {symbol}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () => {
    setAll(allClicks + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
  }
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <History allClicks = {allClicks} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)