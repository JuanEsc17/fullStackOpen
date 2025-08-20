import { useState } from "react"

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {statistics} = props
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.good}/>
        <StatisticsLine text="neutral" value={props.neutral}/>
        <StatisticsLine text="bad" value={props.bad}/>
        <StatisticsLine text="all" value={statistics.all}/>
        <StatisticsLine text="average" value={statistics.average}/>
        <StatisticsLine text="positive" value={statistics.positive}/>
      </tbody>
    </table>
  )
}

const Warning = () =>{
  return(
    <div>
      <strong>No feedback given</strong>
    </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.function}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [statistics, setStatistics] = useState({
    all: 0,
    average: 0,
    positive: 0
  })

  const handleGoodClick = () => {
    setGood(good + 1)
    setStatistics({
      all: statistics.all + 1,
      average: good + bad / statistics.all,
      positive: (good / statistics.all) * 100
    })
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setStatistics({
      all: statistics.all + 1,
      average: good + bad / statistics.all,
      positive: (good / statistics.all) * 100
    })
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setStatistics({
      all: statistics.all + 1,
      average: good + bad / statistics.all,
      positive: (good / statistics.all) * 100
    })
  }

  return(
    <div>
        <h1>give feedback</h1>
        <Button text="good" function={handleGoodClick}/>
        <Button text="neutral" function={handleNeutralClick}/>
        <Button text="bad" function={handleBadClick}/>
        <h2>statistics</h2>
        {statistics.all === 0 ? <Warning/> : <Statistics statistics={statistics} good={good} neutral={neutral} bad={bad}/>}
    </div>
  )
}

export default App