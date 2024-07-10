import './App.css';
import { useEffect , useState } from 'react';


// Enunciado 

/**
 * 🇬🇧
 * Given these 2 APIs:
 *  - https://catfact.ninja/fact - Cat Random Facts
 *  - https://developers.giphy.com/docs/ - Giphy API
 *
 * Select one random cat fact and look for a matching gif by using
 * the first 3 words from the fact.
 * 
 * The result should be displayed with the
 * image on the left side and the text on the right side,
 * positioned in the middle.
 *
 * Here, find a valid GIPHY API KEY:
 * 
 * const GIPHY_API_KEY = "2cZkiFTqyiS79UdSapL6LHWlublpl7iy";
 * 
 */


function App() {
  
  const apiKEY = "2cZkiFTqyiS79UdSapL6LHWlublpl7iy";
  const [catFact, setCatFact] = useState('');
  const [shortCatFact, setShortCatFact] = useState('');
  const [gif, setGif] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener el catFact
        const factResponse = await fetch('https://catfact.ninja/fact');
        const factData = await factResponse.json();
        setCatFact(factData.fact);

        // Calcular el shortCatFact
        const shortFact = factData.fact.split(" ").slice(0, 3).join(" ");
        setShortCatFact(shortFact);

        // Obtener el GIF usando shortCatFact
        const gifResponse = await fetch(`https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(shortFact)}&api_key=${apiKEY}`);
        const gifData = await gifResponse.json();
        setGif(gifData.data[0].images.original.url);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [apiKEY]);

  return (
    <div className="App">
      <p>{catFact}</p>
      <p>{shortCatFact}</p>
      <img src={gif} alt='gif-image'></img>
    </div>
  );
}


export default App;
