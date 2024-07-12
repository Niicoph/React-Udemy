import React from 'react'



export default function NextButton({dispatch , answer, questionsLength , index}) {

    if (answer === null) return null

    return (
        <button className='btn btn-ui' onClick={ () =>{dispatch( index + 1 === questionsLength ? {type: "finished"} : {type: "nextQuestion"} )}}>Next</button>
    )
}
