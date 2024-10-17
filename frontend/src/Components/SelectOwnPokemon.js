import DisplayPokemon from "./DisplayPokemon";

function SelectOwnPokemon({ userPokemons, onUserPokemonSelect }) {
    return (
        <div id="pokemonSelector">
            <ul>
                {userPokemons.map((pokemon) => {
                    return (
                        <DisplayPokemon
                            onUserPokemonSelect={onUserPokemonSelect}
                            key={pokemon.name}
                            pokemon={pokemon}
                        ></DisplayPokemon>
                    );
                })}
            </ul>
        </div>
    );
}
export default SelectOwnPokemon;

