import React, {useEffect, useState} from "react";
import DisplayPokemonFight from "./DisplayPokemonFight";
import {pokeBall, pokemonDead} from "../../assets";
import BattleResult from "./BattleResult";
import { getStats, handleContact, healthBarColoring, sliceLoserPokemon } from '../../Utils';



function RenderFight({enemyPoke, usersPoke, userPokemons, onEndOfFight, returnToHome}) {
  const [usersPokemon, setUsersPokemon] = useState(false);
  const [enemyPokemon, setEnemyPokemon] = useState(false);

  const [userStats, setUserStats] = useState(false);
  const [enemyStats, setEnemyStats] = useState(false);

  const [endOfFight, setEndOfFight] = useState(false);

  const [winner, setWinner] = useState(null);

  const pokemons = {
    user: usersPoke.name,
    enemy: enemyPoke.name,
  };

  useEffect(() => {
    setUserStats(getStats(usersPoke));
    setUsersPokemon(usersPoke);

    setEnemyStats(getStats(enemyPoke));
    setEnemyPokemon(enemyPoke);
  }, [enemyPoke, usersPoke]);

  useEffect(() => {
    if (endOfFight && winner.name === pokemons.user) {
      onEndOfFight([...userPokemons, enemyPoke]);
      setTimeout(() => {
        returnToHome();
      }, 3000);
    } else if (endOfFight && winner.name === pokemons.enemy) {
      const removedPokemon = sliceLoserPokemon(userPokemons, pokemons);
      onEndOfFight(removedPokemon);
      setTimeout(() => {
        returnToHome();
      }, 4000);
    }
  }, [endOfFight]);

  return (
      <div id="fightPage">
        <div id="battleField">
          <DisplayPokemonFight
              name={pokemons.user}
              stats={userStats}
              pokemonData={usersPokemon}
              isUser={true}
              healthBarColoring={healthBarColoring}
          />
          <DisplayPokemonFight
              name={pokemons.enemy}
              stats={enemyStats}
              pokemonData={enemyPokemon}
              isUser={false}
              healthBarColoring={healthBarColoring}
          />
        </div>
        <div id="attackBtn">
          {endOfFight ? (
              <BattleResult
                  winner={winner}
                  pokeBall={pokeBall}
                  pokemonDead={pokemonDead}
              />
          ) : (
              <button
                  onClick={() =>
                      handleContact(
                          enemyStats,
                          setEnemyStats,
                          setUserStats,
                          userStats,
                          endOfFight,
                          setEndOfFight,
                          setWinner,
                          pokemons
                      )
                  }
              >
                Attack
              </button>
          )}
        </div>
      </div>
  );

}

export default RenderFight;
