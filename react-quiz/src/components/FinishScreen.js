import React from 'react'

export default function FinishScreen({points , maxPoints , highscore , dispatch}) {

  const percentage = (points / maxPoints) * 100;
  let emoji;

  if (percentage === 100) emoji = '🥇' 
  if (percentage < 100 && percentage >= 80) emoji = '🥈'
  if (percentage < 80 && percentage >= 60) emoji = '🥉'
  if (percentage < 60) emoji = '💩'


  return (
    <>
    <p className='result'> {emoji} You scored <strong> {points} </strong> out of {maxPoints} ({Math.round(percentage)}%)</p>
    <p className='highscore'> (Highscore: {highscore}) </p>
    <button 
    className='btn btn-ui' 
    onClick={ () => { dispatch({ type: "start" })} }>Restart Quiz</button>
    </>
  )
}
