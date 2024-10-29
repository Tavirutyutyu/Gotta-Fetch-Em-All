import React from 'react';
import { render, screen } from '@testing-library/react';
import DisplayPokemonFight from '../Components/FightPage/DisplayPokemonFight';

describe('DisplayPokemonFight', () => {
    const mockStats = {
        hp: 80,
        maxHp: 100
    };

    const mockPokemonData = {
        sprites: {
            other: {
                showdown: {
                    back_default: 'back-sprite.png',
                    front_default: 'front-sprite.png'
                }
            }
        }
    };

    test('renders pokemon fight display for user pokemon', () => {
        render(
            <DisplayPokemonFight
                name="Pikachu"
                stats={mockStats}
                pokemonData={mockPokemonData}
                isUser={true}
                healthBarColoring={() => 'green'}
            />
        );

        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        expect(screen.getByText('HP: 80/100')).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'back-sprite.png');
    });

    test('renders pokemon fight display for enemy pokemon', () => {
        render(
            <DisplayPokemonFight
                name="Charmander"
                stats={mockStats}
                pokemonData={mockPokemonData}
                isUser={false}
                healthBarColoring={() => 'green'}
            />
        );

        expect(screen.getByText('Charmander')).toBeInTheDocument();
        expect(screen.getByText('HP: 80/100')).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'front-sprite.png');
    });

    test('shows loading state when sprite is not available', () => {
        render(
            <DisplayPokemonFight
                name="Pikachu"
                stats={mockStats}
                pokemonData={{sprites: {other: {showdown: {}}}}}
                isUser={true}
                healthBarColoring={() => 'green'}
            />
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
});
