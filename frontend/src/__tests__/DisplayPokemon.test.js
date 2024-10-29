import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DisplayPokemon from '../Components/DisplayPokemon';

describe('DisplayPokemon', () => {
    const mockPokemon = {
        name: 'Pikachu',
        sprites: {
            front_default: 'pikachu-sprite.png'
        }
    };

    test('renders pokemon with image and name', () => {
        render(
            <DisplayPokemon
                pokemon={mockPokemon}
                onUserPokemonSelect={() => {}}
            />
        );

        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'pikachu-sprite.png');
        expect(image).toHaveAttribute('alt', 'pokimon');
    });

    test('calls onUserPokemonSelect when clicked', () => {
        const mockOnUserPokemonSelect = jest.fn();
        render(
            <DisplayPokemon
                pokemon={mockPokemon}
                onUserPokemonSelect={mockOnUserPokemonSelect}
            />
        );

        fireEvent.click(screen.getByText('Pikachu'));
        expect(mockOnUserPokemonSelect).toHaveBeenCalledWith(mockPokemon);
    });
});