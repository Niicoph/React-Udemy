import { useState , useEffect } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="w-full h-screen bg-custom-dark flex justify-center">
      {isLoading ? (
        <p className='text-white text-3xl flex justify-center items-center'>Loading...</p>
      ) : (
        <ConcurrencyConverter/>
      )}
    </div>
  );
}

function ConcurrencyConverter() {
  const [inputValue, setInputValue] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState("");

  useEffect(() => {
    async function fetchData() {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${inputValue}&from=${fromCurrency}&to=${toCurrency}`);
        const data = await response.json();
        setResult(data.rates[toCurrency]);
    }

    if (fromCurrency === toCurrency) {
      return setResult(inputValue);
    }


    fetchData();
  }, [inputValue, fromCurrency, toCurrency]);

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <form className='w-4/5 h-full p-4 flex flex-col justify-center items-center gap-4 '>
        <div className='w-full h-auto'>
          <select
            className='w-full h-16 border rounded-md bg-white-500 p-4'
            value={fromCurrency}
            onChange={(event) => setFromCurrency(event.target.value)}
          >
            <option value='USD'>USD</option>
            <option value='EUR'>EUR</option>
            <option value='CAD'>CAD</option>
          </select>
        </div>
        <div className='w-full h-auto'>
          <input
            type='text'
            className='w-full h-16 border rounded-md bg-gray-400 p-4 text-black'
            value={inputValue}
            onChange={(event) => setInputValue(Number(event.target.value))}
          />
        </div>
        <div className='w-full h-auto'>
          <select
            className='w-full h-16 border rounded-md bg-white-500 p-4'
            value={toCurrency}
            onChange={(event) => setToCurrency(event.target.value)}
          >
            <option value='USD'>USD</option>
            <option value='EUR'>EUR</option>
            <option value='CAD'>CAD</option>
          </select>
        </div>
        <div className='w-full h-auto'>
          <div className='w-full h-16 border rounded-md bg-gray-800 p-4'>
            <p className='text-white'>{result} {toCurrency}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
