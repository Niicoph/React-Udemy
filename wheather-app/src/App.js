import './App.css';
import './index.css';
import React from 'react';
import { useEffect , useState } from 'react';

// images
import Clear from './assets/images/Clear.png';
import Cloudy from './assets/images/Cloudy.png';
import Rainy from './assets/images/Rainy.png';
import Snowy from './assets/images/Snowy.png';
import NotFound from './assets/images/NotFound.png';



function App() {
  const [weatherData, setWeatherData] = useState(null);   // se actualiza cuando se recibe la data del clima


  return (
    <div className="w-full h-screen bg-dark-bg flex justify-center items-center">
      <div className='bg-white w-3/4 h-fit border rounded-lg flex flex-col p-4'>
        {/* Aplicamos conditional rendering, de modo que siempre mostramos el search, pero cuando se reciban datos de wheater, los mostramos */}
        <Search setWeatherData = {setWeatherData}/> {/* llamamos al componente y le pasamos el set para cambiar el estado del wheaterData */}
        {weatherData && (
          <WheatherInfo weatherData={weatherData}/>
        )}
      </div>
    </div>
  );
}

function Search({ setWeatherData }) {
  const [city, setCity] = useState('');               // Se actualiza cada vez que se escribe en el input
  const [searchTerm, setSearchTerm] = useState('');   // Se actualiza cuando se hace submit
  const [error, setError] = useState(null);           // Estado para manejar errores

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(city); // Si el usuario realiza un submit, se actualiza el término de búsqueda con la ciudad introducida
  };

  useEffect(() => {
    if (!searchTerm) return; // Si el valor del submit es un string vacío, sale del effect
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=key`);
        if (!response.ok) {
          throw new Error('not-found');
        }
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (error) {
        setWeatherData(null);
        setError(error.message);
      }
    };
    fetchWeather();
  }, [searchTerm, setWeatherData]);

  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Search for a city...'
          className='w-10/12 h-10 border-b border-black-500 focus:outline-none bg-transparent'
          onChange={handleInputChange}
        />
        <button type="submit" className='w-2/12 h-10 bg-blue-200 text-white border rounded-md'>🔍️</button>
      </form>
      {error && <img src={NotFound} alt='notFound-image' className='w-32 h-32'></img>}
    </div>
  );
}

function WheatherInfo({weatherData}) {
  
  const [imageUrl , setImageUrl] = useState(''); // se actualiza cuando se recibe la data del clima

  useEffect( () => {

  switch(weatherData.weather[0].main) {
    case 'Clear':
      setImageUrl(Clear);
      break;
    case 'Clouds':
      setImageUrl(Cloudy);
      break;
    case 'Rain':
      setImageUrl(Rainy);
      break;
    case 'Snow':
      setImageUrl(Snowy);
      break;
    default:
      setImageUrl(Clear);
  }
  
  } , [weatherData])

 

  return (
    <div className='flex flex-col justify-center items-center p-4 gap-2'>
      <img src={imageUrl} alt='condition' className='w-44 h-44'></img>
      <h3 className='text-xl font-bold'>{weatherData.main.temp}°C</h3>
      <h3 className='text-lg'>{weatherData.weather[0].description}</h3>
    </div>
  );
}





export default App;
