import React from 'react'

export default function Progress({index: i , questionsLength , points , maxPoints , answer}) {
  return (
    <header className='progress'>
        <progress max={questionsLength} value={i + Number(answer !== null)}></progress>
        <p>Question <strong>{i + 1}</strong> / {questionsLength} </p>
        <p><strong>{points}</strong> / {maxPoints}</p>
    </header>
  )
}
