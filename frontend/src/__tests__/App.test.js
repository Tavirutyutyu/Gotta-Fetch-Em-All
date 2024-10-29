import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import fetchData from '../Utils';

jest.mock('../Utils');

describe('App component', () => {
    const mockLocations = {
        results: [
            { name: 'Viridian Forest', url: 'forest-url' }
        ]
    };

    const mockAreaResponse = [
        { name: 'Deep Forest', pokemon_encounters: [] }
    ];

    const mockPokemon = {
        name: 'Bulbasaur',
        sprites: { front_default: 'bulbasaur.png' }
    };

    beforeEach(() => {
        fetchData.mockResolvedValueOnce(mockLocations);
        fetchData.mockResolvedValueOnce(mockPokemon)
            .mockResolvedValueOnce(mockPokemon)
            .mockResolvedValueOnce(mockPokemon);
        fetchData.mockResolvedValueOnce(mockAreaResponse);
    });

    afterEach(() => {
        jest.clearAllMocks();
        document.body.style.backgroundImage = '';
    });

    test('renders correctly on initial load', async () => {
        render(<App />);
        expect(await screen.findByText('Choose Location')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /return home/i })).toBeInTheDocument();
    });

    test('shows list of locations on successful data fetch', async () => {
        render(<App />);
        const locationsList = await screen.findByRole('list');
        expect(locationsList).toBeInTheDocument();
        const locationItem = await screen.findByText('Viridian Forest');
        expect(locationItem).toBeInTheDocument();
    });

    test('changes to area selection when location is clicked', async () => {
        render(<App />);
        const locationItem = await screen.findByText('Viridian Forest');
        fireEvent.click(locationItem);

        await waitFor(() => {
            expect(screen.getByText('Choose Area')).toBeInTheDocument();
        });
    });

    test('returns to home when return home button is clicked', async () => {
        render(<App />);
        const locationItem = await screen.findByText('Viridian Forest');
        fireEvent.click(locationItem);

        const returnButton = screen.getByRole('button', { name: /return home/i });
        fireEvent.click(returnButton);

        await waitFor(() => {
            expect(screen.getByText('Choose Location')).toBeInTheDocument();
        });
    });

    test('handles API fetch errors gracefully', async () => {
        fetchData.mockRejectedValueOnce(new Error('API Error'));
        render(<App />);
        expect(screen.getByRole('button', { name: /return home/i })).toBeInTheDocument();
    });

    test('maintains correct screen title through navigation', async () => {
        render(<App />);
        expect(await screen.findByText('Choose Location')).toBeInTheDocument();
        const locationItem = await screen.findByText('Viridian Forest');
        fireEvent.click(locationItem);

        await waitFor(() => {
            expect(screen.getByText('Choose Area')).toBeInTheDocument();
        });
    });

    test('fetches initial data on component mount', async () => {
        render(<App />);
        await waitFor(() => {
            expect(fetchData).toHaveBeenCalledWith('https://pokeapi.co/api/v2/location');
            expect(fetchData).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur');
            expect(fetchData).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/charizard');
            expect(fetchData).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/129');
        });
    });
});