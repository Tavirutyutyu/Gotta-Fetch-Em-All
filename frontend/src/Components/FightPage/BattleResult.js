export default function BattleResult({ winner, pokeBall, pokemonDead }) {
    return (
        <div>
            <p>
                The winner: {winner.role} {winner.name}
            </p>
            {winner.role === "Your" ? (
                <img src={pokeBall} alt="pokeball" id="pokeball"></img>
            ) : (
                <img src={pokemonDead} alt="ded" id="pokemonDead"></img>
            )}
        </div>
    )
}