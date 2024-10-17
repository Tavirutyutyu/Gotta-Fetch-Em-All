import React from "react";


export default function DisplayPokemonFight({ name, stats, pokemonData, isUser, healthBarColoring }) {
    const sprite = pokemonData?.sprites?.other?.showdown?.[isUser ? "back_default" : "front_default"];


    return (
        <div>
            <h3>{name}</h3>
            <p>
                HP: {stats.hp}/{stats.maxHp}
            </p>
            <progress
                className={healthBarColoring(stats.hp, stats.maxHp)}
                value={stats.hp}
                max={stats.maxHp}
            ></progress>
            {sprite ? (
                <img
                    alt={`${name} sprite`}
                    id={isUser ? "usersPokemon" : "enemyPokemon"}
                    src={sprite}
                ></img>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}