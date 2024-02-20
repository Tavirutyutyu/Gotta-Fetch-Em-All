import './App.css';
import { useState, useEffect } from 'react';
import ListElement from "./Components/ListElement";
import SelectPokemon from "./Components/SelectPokemon";
import SelectUserPokemon from "./Components/SelectUserPokemon";


function App() {
  const [locations, setLocations] = useState(null);
  const [data, setData] = useState(false);
  const [isAreasShown, setIsAreasShown] = useState(false);
  const [areas, setAreas] = useState(null);
  const [userPokemons, setAllPokemons] = useState([]);
  const [selectedUserPokemon, setUserPokemon] = useState([]);
  const [selectedEnemy, setEnemy] = useState([])

  const ownStarterPokes = ["https://pokeapi.co/api/v2/pokemon/bulbasaur",
  "https://pokeapi.co/api/v2/pokemon/charizard",
  "https://pokeapi.co/api/v2/pokemon/poliwhirl"];
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://pokeapi.co/api/v2/location');
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);
  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data
  }

  function returnToHome() {
    setData(locations);
    setIsAreasShown(false);
    setAreas(null);
  }

  return (
    <div className="App">
      <button onClick={returnToHome}>Back</button>
      {data
        ? data.map((location) => (
            <ListElement
              text={location.name}
              key={location.name}
              url={location.url}
              setData={setData}
              isAreasShown={isAreasShown}
              setIsAreasShown={setIsAreasShown}
              setAreas={setAreas}
            ></ListElement>
          ))
        : console.log("no fetch")}
    </div>
  );
}

export default App;
