import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnemyPokes from '../Components/EnemyPokes';

describe('EnemyPokes', () => {
    it('calls onEnemySelect when clicked', () => {
        const mockOnEnemySelect = jest.fn();
        const pokemon = {
            name: 'Pikachu',
            sprites: {
                front_default: 'https://example.com/pikachu.png',
            },
        };

        render(
            <EnemyPokes
                pokemon={pokemon}
                onEnemySelect={mockOnEnemySelect}
            />
        );

        const pokeDiv = screen.getByTestId('enemy-poke');
        fireEvent.click(pokeDiv);
        expect(mockOnEnemySelect).toHaveBeenCalledWith(pokemon);
    });

    it('renders pokemon image and name', () => {
        const pokemon = {
            name: 'Pikachu',
            sprites: {
                front_default: 'https://example.com/pikachu.png',
            },
        };

        render(
            <EnemyPokes
                pokemon={pokemon}
                onEnemySelect={() => {}}
            />
        );

        expect(screen.getByRole('img')).toHaveAttribute('src', pokemon.sprites.front_default);
        expect(screen.getByText(/pikachu/i)).toBeInTheDocument();    });
});
