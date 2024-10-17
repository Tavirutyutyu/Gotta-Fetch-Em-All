function DisplayPokemon({pokemon, onUserPokemonSelect}) {


  return (
      <div onClick={() => onUserPokemonSelect(pokemon)} id="onePoke">
        <img src={pokemon.sprites.front_default} alt="pokimon" id="selectPokes"></img>
        <li>{pokemon.name}</li>
      </div>
  );
}
export default DisplayPokemon;
