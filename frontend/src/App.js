import "./App.css";
import {useEffect, useState} from "react";
import RenderFight from "./Components/RenderFight";
import ListElement from "./Components/ListElement";
import SelectPokemon from "./Components/SelectPokemon";
import SelectOwnPokemon from "./Components/SelectOwnPokemon";
import fetchData from "./Utils"
import {backgroundBase, fightBackground} from "./assets";


function App() {
    const [locations, setLocations] = useState(null);
    const [shownData, setData] = useState(null);
    const [isAreasShown, setIsAreasShown] = useState(false);
    const [areas, setAreas] = useState(null);
    const [userPokemons, setAllPokemons] = useState([]);
    const [selectedUserPokemon, setUserPokemon] = useState([]);
    const [selectedEnemy, setEnemy] = useState([]);
    const [areaSelected, setAreaSelected] = useState(false);
    const [isEnemySelected, setIsEnemySelected] = useState(false);
    const [isCombatOn, setIsCombatOn] = useState(false);

    const screenTitle = areaSelected
        ? isEnemySelected
            ? isCombatOn
                ? ""
                : "Choose Pokemon"
            : "Choose Enemy Pokemon"
        : isAreasShown
            ? "Choose Area"
            : "Choose Location";

    const ownStarterPokes = ["bulbasaur", "charizard", "129"];

    useEffect(() => {
        fetchLocations();

        fetchPlayerPokemons();

    }, []);

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
        setIsEnemySelected(false);
        setEnemy([]);
        setIsCombatOn(false);
    }

    async function fetchPlayerPokemons() {
        const playerPokemonsPromises = ownStarterPokes.map(async (url) => {
            return await fetchData(
                `https://pokeapi.co/api/v2/pokemon/${url}`
            );
        });
        const playerPokemons = await Promise.all(playerPokemonsPromises);
        setAllPokemons(playerPokemons);
    }

    async function fetchLocations() {
        const data = await fetchData("https://pokeapi.co/api/v2/location");
        setData(data.results);
        setLocations(data.results);
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
                        setAllUserPokemons={(allPokemon) => setAllPokemons(allPokemon)}
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
                                    setData={(shownData) => setData(shownData)}
                                    isAreasShown={isAreasShown}
                                    setIsAreasShown={(isShown) => setIsAreasShown(isShown)}
                                    setAreas={(shownAreas) => setAreas(shownAreas)}
                                    setAreaSelected={(isSelected) => setAreaSelected(isSelected)}
                                ></ListElement>
                            ))}
                        </ul>
                    </div>
                )
            ) : !isEnemySelected ? (
                <SelectPokemon
                    setEnemySelected={(isSelected) => setIsEnemySelected(isSelected)}
                    setEnemy={(enemy) => setEnemy(enemy)}
                    area={areas}
                ></SelectPokemon>
            ) : (
                <SelectOwnPokemon
                    userPokemons={userPokemons}
                    setIsCombatOn={(isOn) => setIsCombatOn(isOn)}
                    setUserPokemon={(chosenOne) => setUserPokemon(chosenOne)}
                ></SelectOwnPokemon>
            )}
        </div>
    );
}

export default App;
