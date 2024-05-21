import './App.css';
import React, { useState } from 'react';

const questions = [
  {
    id: 111,
    question: "capital of France?",
    answer: "Paris"
  },
  {
    id: 222,
    question: "capital of Spain?",
    answer: "Madrid"
  },
  {
    id: 333,
    question: "capital of Germany?",
    answer: "Berlin"
  },
  {
    id: 444,
    question: "capital of Italy?",
    answer: "Rome"
  },
  {
    id: 555,
    question: "capital of Portugal?",
    answer: "Lisbon"
  },
  {
    id: 666,
    question: "capital of Greece?",
    answer: "Athens"
  
  }

]



function App() {
  return (
    <div className="main-container">
      <Header />
      <section>
         <div className= "card-holder">
           <Card/>
         </div>
      </section>
    </div>
  );
}



function Header() {
  return (
    <header>
      <h1>Flashcards</h1>
    </header>
  );
}

function Card() {
  const [selectedId , setSelectedId] = useState(null); // toma como parametro el id de la pregunta seleccionada
  const [isRevealed, setIsRevealed] = useState(false); // si false entonces mostramos la question si true mostramos la respuesta
  
  return (
    <React.Fragment > 
      {questions.map( (question) => ( 
        <div 
        className='card' 
        style={   question.id === selectedId ?  {backgroundColor: '#135D66'}  :  {backgroundColor: '#003C43'}}
        onClick={ () => {
            if (!isRevealed) {
              setSelectedId(null);
              setIsRevealed(true);
            } else {
              setSelectedId(question.id);
              setIsRevealed(false);
            }
        }}
        >
          <h2> { question.id === selectedId ? question.answer : question.question } </h2>
        </div>
      ))}
    </React.Fragment>

  );
}


export default App;
