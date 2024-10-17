import {useEffect, useState} from "react";
import EnemyPokes from "./EnemyPokes";
import fetchData from "../Utils";

function SelectPokemon({ onEnemySelect, area }) {
  const [encounterPokemons, setEncounterPokemons] = useState([]);

  useEffect(() => {
    fetchEncounters();
  }, []);

  async function fetchEncounters() {
    const enemiesPromise = area.pokemon_encounters.map(async (pokemon) => {
      return await fetchData(pokemon.pokemon.url);
    });
    const enemies = await Promise.all(enemiesPromise);
    setEncounterPokemons(enemies);
  }

  function selectRandomEnemy() {
    const maxNum = encounterPokemons.length;
    const randomNumber = Math.floor(Math.random() * maxNum);
    onEnemySelect(encounterPokemons[randomNumber]);
  }

  return (
    <div id="pokemonSelector">
      <button onClick={selectRandomEnemy}>Random Enemy</button>
      <ul>
        {encounterPokemons.map((pokemon) => (
          <EnemyPokes
            key={pokemon.name}
            onEnemySelect={onEnemySelect}
            pokemon={pokemon}
          />
        ))}
      </ul>
    </div>
  );
}

export default SelectPokemon;
