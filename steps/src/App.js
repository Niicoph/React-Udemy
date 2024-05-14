import { useState } from "react";


const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
 
export default function App() {

  // useState returns an array.
  // The first element is the current value or also the initial value. 
  // The second element is a function that allows you to update the value.
  // when calling useState you can pass the initial value as an argument.
  // React Hooks start with the word "use" and must be called at the top level of the component.


  /*
  State is like the memory of the component. If we change the state, the component will re-render and still will have old values from anothers states.
  it can hold information even though the component is re-rendered over and over again
  
  */


  const [step , setStep] = useState(1);  
  const [isOpen  , setIsOpen] = useState(true); 

  function handlePrevious() {
    if (step > 1) setStep( (s) => s - 1 ); // remember that the argument of the setStep is the initial value of the state, so it can receive an arrow function
                  // the arrow function will receive the initial value of the state and return the new value
  }
  function handleNext() {
    if (step < 3) setStep( (s) => s + 1); // we receive the initial value (s) as a parameter and return the value updated , so thats what the arrow function does
  }




  return (
    <>    {/* always try to use a callback function to update the state of a variable. So it will wake things easier if we want to update something. */}
      <button className="close" onClick={ () => setIsOpen( (isOpen) => !isOpen  ) }> &times; </button>

      {isOpen && (
    <div className="steps">
      <div className="numbers">
        <div className= {  step >= 1 ? 'active' : '' }>1</div>
        <div className= {  step >= 2 ? 'active' : '' }>2</div>
        <div className= {  step >= 3 ? 'active' : '' }>3</div>
      </div>

      <p className="message">Step {step}: {messages[step - 1]} </p>

      <div className="buttons">
        <button style={{backgroundColor:'#7950f2' , color: "#fff"}} onClick={handlePrevious} >Previous</button>
        <button style={{backgroundColor:'#7950f2' , color: "#fff"}} onClick={handleNext}>Next</button>
      </div>
      
    </div>
    )}
    </>
  );
}





