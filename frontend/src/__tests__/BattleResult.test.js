import React from 'react';
import { render, screen } from '@testing-library/react';
import BattleResult from '../Components/FightPage/BattleResult';

describe('BattleResult', () => {
    test('renders winner message and pokeball for user victory', () => {
        const winner = { role: 'Your', name: 'Pikachu' };
        render(
            <BattleResult
                winner={winner}
                pokeBall="pokeball.png"
                pokemonDead="dead.png"
            />
        );

        expect(screen.getByText('The winner: Your Pikachu')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'pokeball.png');
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'pokeball');
    });

    test('renders winner message and dead pokemon for enemy victory', () => {
        const winner = { role: 'Enemy', name: 'Charmander' };
        render(
            <BattleResult
                winner={winner}
                pokeBall="pokeball.png"
                pokemonDead="dead.png"
            />
        );

        expect(screen.getByText('The winner: Enemy Charmander')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'dead.png');
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'ded');
    });
});