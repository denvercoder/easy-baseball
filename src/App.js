import {useState} from 'react'
import './App.css';

function App() {
  return (
    <div className="App">
      <ScoreBoard />            
    </div>
  );
}

const Teams = [
  "Away Team",
  "Home Team"
]

const OUTCOME = [
  "Ball",
  "Strike",
  "Foul",
  "Hit"
]


function ScoreBoard() {
  const [innings, setInnings] = useState(0)
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [hits, setHits] = useState(0)
  const [balls, setBalls] = useState(0)
  const [strikes, setStrikes] = useState(0)
  const [outs, setOuts] = useState(0)
  const [outcome, setOutcome] = useState('')
  const [teamAtBat, setTeamAtBat] = useState(Teams[0])


function getPitchOutcome() {
  return Math.floor(Math.random() * 4)
}

function Pitch() {
  // The ball will be pitched with 
  // the following possible outcomes:
  //        0: Ball
  //        1: Strike
  //        2: Foul (which equals a strike but can't strike out on fouls)
  //        3: Hit
  // So we'll get a random number between 
  // 0 and 3 to determine the outcome of the pitch

  const pitch = getPitchOutcome()

  console.log("Pitch Outcome: ", pitch)

  switch (pitch) {
    case 0:
      setOutcome(OUTCOME[pitch])
      setBalls(balls + 1)
      if (balls < 4) {
        break
      } else {
        setHits(hits + 1)
        setBalls(0)
        setStrikes(0)
      }
      break
    case 1:
      setOutcome(OUTCOME[pitch]) 
      setStrikes(strikes + 1)
      if (strikes < 3) {
        break
      } else {
        setStrikes(0)
        setBalls(0)
        // If outs = 3 then the inning is over
        // and we switch sides and reset all values
        // back to zero
        setOuts(outs + 1)
      }
      break
    case 2:
      setOutcome(OUTCOME[pitch]) 
      // If strikes = 2 then do nothing
      // if strikes = 0 or 1 then add one
      if (strikes < 2) {
        setStrikes(strikes + 1) 
      } else {
        break
      }
      break
    case 3:
      setOutcome(OUTCOME[pitch])
      setHits(hits + 1)
      setBalls(0)
      setStrikes(0)
      if (hits >= 3) {
        console.log("Hits are greater than 3 should be a run")
        if (teamAtBat === 'Away Team') {
          console.log("Away Team Scores")
          setAwayScore(awayScore + 1)
        } else if (teamAtBat === 'Home Team') {
          console.log("Home Team Scores")
          setHomeScore(homeScore + 1)
        } else {
          console.log("ERROR")
        }
      }
      break
    default: 
      console.log("ERROR")
  }

}

  return (
    <>
      <h1>
        <div>{`Away Team ${awayScore}  /  Home Team ${homeScore}`}</div>
      </h1>
      <hr style={{width: '250px'}} />
      <div className="inning">{`Inning:  ${innings}`}</div>
      <hr style={{width: '250px'}} />
      <div className="count">{`Outs: ${outs} / Strikes: ${strikes} / Balls: ${balls}`}</div>
      <hr style={{width: '250px'}} />
      <div className="atBat">{`Currently At Bat: ${teamAtBat}`}</div>
      <hr style={{width: '250px'}} />
      <div className="hits">{`Runners On Base: ${hits}`}</div>
      <hr style={{width: '250px'}} />
      <div>
        <button style={{height: '30px', fontSize: '20px', borderRadius: '5px'}} type="button" onClick={Pitch}>Pitch The Ball</button>
        <div>{`OUTCOME: ${outcome}`}</div>
      </div>
    </>
  )
}

export default App;
