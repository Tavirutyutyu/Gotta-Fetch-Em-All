import "./App.css";
import {useEffect, useState} from "react";
import RenderFight from "./Components/FightPage/RenderFight";
import ListElement from "./Components/ListElement";
import SelectPokemon from "./Components/SelectPokemon";
import SelectOwnPokemon from "./Components/SelectOwnPokemon";
import fetchData from "./Utils"
import {backgroundBase, fightBackground} from "./assets";

async function fetchPlayerPokemons() {
  const ownStarterPokes = ["bulbasaur", "charizard", "129"];
  const playerPokemonsPromises = ownStarterPokes.map(async (url) => {
    return await fetchData(
        `https://pokeapi.co/api/v2/pokemon/${url}`
    );
  });
  return await Promise.all(playerPokemonsPromises);
}

async function fetchLocations() {
  return await fetchData("https://pokeapi.co/api/v2/location");
}


function App() {
  const [locations, setLocations] = useState(null);
  const [shownData, setData] = useState(null);
  const [isAreasShown, setIsAreasShown] = useState(false);
  const [areas, setAreas] = useState(null);
  const [userPokemons, setAllPokemons] = useState([]);
  const [selectedUserPokemon, setUserPokemon] = useState([]);
  const [selectedEnemy, setEnemy] = useState([]);
  const [areaSelected, setAreaSelected] = useState(false);
  const [enemySelected, setEnemySelected] = useState(false);
  const [isCombatOn, setIsCombatOn] = useState(false);

  const screenTitle = areaSelected
    ? enemySelected
      ? isCombatOn
        ? ""
        : "Choose Pokemon"
      : "Choose Enemy Pokemon"
    : isAreasShown
    ? "Choose Area"
    : "Choose Location";


  useEffect( () => {
    async function fetchData() {
      const locations = await fetchLocations();
      const playerPokemons = await fetchPlayerPokemons();
      setAllPokemons(playerPokemons);
      setLocations(locations.results);
      setData(locations.results);
    }
    fetchData();

  },[]);

  function changeBackgroundImage(imageUrl) {
    document.body.style["background-image"] = `url(${imageUrl})`;
  }

  if (isCombatOn) {
    changeBackgroundImage(fightBackground);
  } else {
    changeBackgroundImage(backgroundBase);
  }

  function returnToHome() {
    setData(locations);
    setIsAreasShown(false);
    setAreas(null);
    setAreaSelected(false);
    setEnemySelected(false);
    setEnemy([]);
    setIsCombatOn(false);
  }

  function onEndOfFight(pokemons) {
    setAllPokemons(pokemons);
  }

  function onAreaSelect(areas){
    setData(areas);
    setIsAreasShown(true);
    setAreas(areas);
    setAreaSelected(false);
  }

  function onLocationSelect(location) {
   setAreas(location);
   setAreaSelected(true);
  }

  function onUserPokemonSelect(pokemon){
    setIsCombatOn(true);
    setUserPokemon(pokemon);
  }

  function onEnemySelect(pokemon){
    setEnemy(pokemon);
    setEnemySelected(true);
  }

  return (
    <div className="App">
      {!isCombatOn ? (
        <nav id="navBar">
          <button onClick={returnToHome}>Return Home</button>
        </nav>
      ) : <></>}
      <h1>{screenTitle}</h1>
      {isCombatOn ? (
        <>
          <h3>Fight!</h3>
          <RenderFight
            returnToHome={returnToHome}
            usersPoke={selectedUserPokemon}
            enemyPoke={selectedEnemy}
            userPokemons={userPokemons}
            onEndOfFight={onEndOfFight}
          />
        </>
      ) : !areaSelected ? (
        shownData && (
          <div id="locationSelector">
            <ul>
              {shownData.map((location) => (
                <ListElement
                  text={location.name}
                  key={location.name}
                  url={location.url}
                  isAreasShown={isAreasShown}
                  onAreaSelect={onAreaSelect}
                  onLocationSelect={onLocationSelect}
                ></ListElement>
              ))}
            </ul>
          </div>
        )
      ) : !enemySelected ? (
        <SelectPokemon
          onEnemySelect={onEnemySelect}
          area={areas}
        ></SelectPokemon>
      ) : (
          <SelectOwnPokemon
              userPokemons={userPokemons}
              onUserPokemonSelect={onUserPokemonSelect}
          ></SelectOwnPokemon>
      )}
    </div>
  );
}

export default App;
