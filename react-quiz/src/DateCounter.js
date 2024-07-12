import {useReducer } from "react";

// Entendiendo el  comportamiento y el funcionamiento de useReducer
// state => what needs to be updated
// dispatcher => who requests the update 
// reducer => how makes the update
// action => how to make the update 

/*
Supongamos el siquiente escenario ficticio:
Deseamos ir a retirar al banco una cierta cantidad de dinero la cual nos pertenece y que se encuentra asociada a nuestra cuenta la cual posee una identificacion.
Entonces el proceso seria el siguiente: 

1- Dispatcher: Nosotros mismo (Who requests the update , withdraw the money)
2- Reducer: El cajero (who makes the update , the bank teller)
3- Vault: El estado actual de nuestra cuenta (what needs to be updated , the current balance)
4- Action: La cantidad de dinero que deseamos retirar (how to make the update , the amount of money to withdraw)

*/

function reducer(state , action) {
  switch(action.type) {
    case "inc":
      return {...state , count: state.count + state.step};
    case "dec":
      return {...state , count: state.count - state.step};
    case "setCount":
      return {...state , count: action.payload};
    case "setStep":
      return {...state , step: action.payload};
    case "reset":
      return {count: 0 , step: 1};
    default:
      throw new Error('Invalid action type');
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  
  const initialState = {count: 0 , step: 1};
  const [state, dispatch] = useReducer(reducer , initialState);
  const {count , step} = state;



  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type: "dec"});
    // setCount((count) => count - 1);
    //setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({type:"inc"});
    //setCount((count) => count + 1);
    //setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({type: "setCount" , payload: Number(e.target.value)});
    //setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({type: "setStep" , payload: Number(e.target.value)} )
    //setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({type: "reset"})
    //setCount(0);
    //setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
