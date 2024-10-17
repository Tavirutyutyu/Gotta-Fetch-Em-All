import React, {useEffect, useState} from "react";
import {pokeBall, pokemonDead} from "../assets";

function getStats(pokemon) {
  const newStats = {};

  pokemon.stats.forEach((stat) => {
    const nameOfStat = stat.stat.name;
    newStats[nameOfStat] = stat["base_stat"];
  });
  newStats.maxHp = newStats.hp;

  return newStats;
}

function checkOnFight(hp, setEndOfFight, nameOfWinner, setWinner, role) {
  if (hp < 1) {
    setEndOfFight(true);
    setWinner({
      name: nameOfWinner,
      role: role,
    });
    return true;
  }
}

function handleContact(
  enemyStats,
  setEnemyStats,
  setUserStats,
  userStats,
  endOfFight,
  setEndOfFight,
  setWinner,
  pokemons
) {
  const enemyDmg = enemyStats.attack;
  const userDmg = userStats.attack;
  const enemyDef = enemyStats.defense;
  const userDef = userStats.defense;
  let userHp = userStats.hp;
  let enemyHp = enemyStats.hp;

  if (!endOfFight) {
    let recentDmg = dmg(userDmg, enemyDef);
    enemyHp -= recentDmg;
    setEnemyStats({ ...enemyStats, hp: enemyStats.hp - recentDmg });
    checkOnFight(enemyHp, setEndOfFight, pokemons.user, setWinner, "Your");
    const isBattleEndedMiddleFight = checkOnFight(
      enemyHp,
      setEndOfFight,
      pokemons.user,
      setWinner,
      "Your"
    );

    setTimeout(() => {
      if (!isBattleEndedMiddleFight) {
        recentDmg = dmg(enemyDmg, userDef);
        userHp -= recentDmg;
        setUserStats({ ...userStats, hp: userStats.hp - recentDmg });
        checkOnFight(userHp, setEndOfFight, pokemons.enemy, setWinner, "Enemy");
      }
    }, 200);
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function dmg(dmg, def) {
  return Math.round(
    ((((2 / 5 + 2) * dmg * 60) / def / 50 + 2) * random(217, 255)) / 255
  );
}

function RenderFight(props) {
  const [usersPokemon, setUsersPokemon] = useState(false);
  const [enemyPokemon, setEnemyPokemon] = useState(false);

  const [userStats, setUserStats] = useState(false);
  const [enemyStats, setEnemyStats] = useState(false);

  const [endOfFight, setEndOfFight] = useState(false);

  const [winner, setWinner] = useState(null);

  const enemyPoke = props.enemyPoke;
  const usersPoke = props.usersPoke;
  const userPokemons = props.userPokemons;
  const setAllPokemons = props.setAllPokemons;
  const returnToHome = props.returnToHome;

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
      setAllPokemons([...userPokemons, enemyPoke]);
      setTimeout(() => {
        returnToHome();
      }, 3000);
    } else if (endOfFight && winner.name === pokemons.enemy) {
      const removedPokemon = sliceLoserPokemon();
      setAllPokemons(removedPokemon);
      setTimeout(() => {
        returnToHome();
      }, 4000);
    }
  }, [endOfFight]);

  function sliceLoserPokemon() {
    const index = userPokemons.findIndex(
      (pokemon) => pokemon.name === pokemons.user
    );
    if (index !== -1) {
      return [
        ...userPokemons.slice(0, index),
        ...userPokemons.slice(index + 1),
      ];
    }
    return userPokemons;
  }

  function healthBarColoring(hp, maxHp) {
    const percent = Math.floor((hp / maxHp) * 100);
    if (percent >= 80) {
      return "healthBar3";
    } else if (percent >= 60) {
      return "healthBar2";
    } else if (percent >= 30) {
      return "healthBar1";
    } else {
      return "healthBar0";
    }
  }

  return (
    <div id="fightPage">
      <div id="battleField">
        <div>
          <h3>{pokemons.user}</h3>
          <p>
            HP: {userStats.hp}/{userStats.maxHp}
          </p>
          <progress
            className={healthBarColoring(userStats.hp, userStats.maxHp)}
            value={userStats.hp}
            max={userStats.maxHp}
          ></progress>
          {usersPokemon ? (
            <img
              alt="nem je"
              id="usersPokemon"
              src={usersPokemon.sprites.other.showdown["back_default"]}
            ></img>
          ) : (
            <p>Loading...</p>
          )}
        </div>
  
        <div>
          <h3>{pokemons.enemy}</h3>
          <p>
            HP: {enemyStats.hp} / {enemyStats.maxHp}
          </p>
          <progress
            className={healthBarColoring(enemyStats.hp, enemyStats.maxHp)}
            value={enemyStats.hp}
            max={enemyStats.maxHp}
          ></progress>
          {enemyPokemon ? (
            <img
              alt="nem je"
              id="enemyPokemon"
              src={enemyPokemon.sprites.other.showdown["front_default"]}
            ></img>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div id="attackBtn">
        {endOfFight ? (
          <>
            <p>
              The winner: {winner.role} {winner.name}
            </p>
            {winner.role === "Your" ? (
              <img src={pokeBall} alt="pokeball" id="pokeball"></img>
            ) : (
              <img src={pokemonDead} alt="ded" id="pokemonDead"></img>
            )}
          </>
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
          ></button>
        )}
      </div>
    </div>
  );
  
}

export default RenderFight;
