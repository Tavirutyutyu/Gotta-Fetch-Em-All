
export async function fetchData(url){
    const response = await fetch(url);
    return await response.json();
}

export function getStats(pokemon) {
    const newStats = {};

    pokemon.stats.forEach((stat) => {
        const nameOfStat = stat.stat.name;
        newStats[nameOfStat] = stat["base_stat"];
    });
    newStats.maxHp = newStats.hp;

    return newStats;
}

export function checkOnFight(hp, setEndOfFight, nameOfWinner, setWinner, role) {
    if (hp < 1) {
        setEndOfFight(true);
        setWinner({
            name: nameOfWinner,
            role: role,
        });
        return true;
    }
}

export function handleContact(
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

export function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function dmg(dmg, def) {
    return Math.round(
        ((((2 / 5 + 2) * dmg * 60) / def / 50 + 2) * random(217, 255)) / 255
    );
}

export function sliceLoserPokemon(userPokemons, pokemons) {
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

export function healthBarColoring(hp, maxHp) {
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

export default fetchData;