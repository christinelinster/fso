import { useState } from 'react'

const Button = ({ name, onClick }) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

}

const Statistics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (100 * good) / total

  if (total === 0) {
    return <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive + '%'} />
        </tbody>

      </table>


    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' onClick={() => setGood(good + 1)} />
      <Button name='neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button name='bad' onClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App