import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SelectPokemon from '../Components/SelectPokemon';
import fetchData from '../Utils';

jest.mock('../Utils');

describe('SelectPokemon', () => {
    const mockArea = {
        pokemon_encounters: [
            { pokemon: { name: 'Bulbasaur', url: 'bulbasaur-url' } },
            { pokemon: { name: 'Charmander', url: 'charmander-url' } },
        ],
    };

    const mockPokemonData = {
        name: 'Bulbasaur',
        sprites: { front_default: 'bulbasaur.png' }
    };

    beforeEach(() => {
        fetchData.mockResolvedValue(mockPokemonData);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders random enemy button and fetches pokemon data', async () => {
        const mockOnEnemySelect = jest.fn();
        render(<SelectPokemon area={mockArea} onEnemySelect={mockOnEnemySelect} />);

        expect(screen.getByText('Random Enemy')).toBeInTheDocument();
        await waitFor(() => {
            expect(fetchData).toHaveBeenCalledTimes(mockArea.pokemon_encounters.length);
        });
    });

    test('selects random enemy when random button is clicked', async () => {
        const mockOnEnemySelect = jest.fn();
        render(<SelectPokemon area={mockArea} onEnemySelect={mockOnEnemySelect} />);

        await waitFor(() => {
            fireEvent.click(screen.getByText('Random Enemy'));
            expect(mockOnEnemySelect).toHaveBeenCalled();
        });
    });
});