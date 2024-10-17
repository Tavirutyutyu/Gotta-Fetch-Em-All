
function EnemyPokes({pokemon, onEnemySelect}){


  return (<div onClick={() => onEnemySelect(pokemon)} id="onePoke" data-testid="enemy-poke">
    <img src={pokemon.sprites.front_default} alt="pokimon" id="selectPokes"></img>

    <li >{pokemon.name}</li>

  </div>
  )
}

export default EnemyPokes;