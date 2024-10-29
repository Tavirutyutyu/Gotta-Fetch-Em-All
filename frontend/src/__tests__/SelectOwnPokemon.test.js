import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectOwnPokemon from '../Components/SelectOwnPokemon';

describe('SelectOwnPokemon', () => {
    const mockPokemons = [
        {
            name: 'Bulbasaur',
            sprites: {
                front_default: 'https://example.com/bulbasaur.png',
            }
        },
        {
            name: 'Charmander',
            sprites: {
                front_default: 'https://example.com/charmander.png',
            }
        }
    ];

    test('renders list of user pokemons', () => {
        render(
            <SelectOwnPokemon
                userPokemons={mockPokemons}
                onUserPokemonSelect={() => {}}
            />
        );

        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('Charmander')).toBeInTheDocument();
    });

    test('calls onUserPokemonSelect when pokemon is clicked', () => {
        const mockOnUserPokemonSelect = jest.fn();
        render(
            <SelectOwnPokemon
                userPokemons={mockPokemons}
                onUserPokemonSelect={mockOnUserPokemonSelect}
            />
        );

        fireEvent.click(screen.getByText('Bulbasaur'));
        expect(mockOnUserPokemonSelect).toHaveBeenCalledWith(mockPokemons[0]);
    });
});
