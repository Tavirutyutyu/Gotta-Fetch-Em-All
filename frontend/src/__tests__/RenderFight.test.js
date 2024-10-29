import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RenderFight from '../Components/FightPage/RenderFight';

describe('RenderFight Component', () => {
    const mockUserPokeStrong = {
        name: 'Pikachu',
        stats: [
            {stat: {name: 'hp'}, base_stat: 100},
            {stat: {name: 'attack'}, base_stat: 100},
            {stat: {name: 'defense'}, base_stat: 100},
        ],
        sprites: {
            other: {
                showdown: {
                    back_default: 'path/to/pikachu-back.png'
                }
            }
        }
    };

    const mockEnemyPokeWeak = {
        name: 'Charmander',
        stats: [
            {stat: {name: 'hp'}, base_stat: 1},
            {stat: {name: 'attack'}, base_stat: 1},
            {stat: {name: 'defense'}, base_stat: 1},
        ],
        sprites: {
            other: {
                showdown: {
                    front_default: 'path/to/charmander-front.png'
                }
            }
        }
    };

    const mockUserPokemons = [mockUserPokeStrong];
    const mockOnEndOfFight = jest.fn();
    const mockReturnToHome = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders fight interface with pokemon data', () => {
        render(
            <RenderFight
                enemyPoke={mockEnemyPokeWeak}
                usersPoke={mockUserPokeStrong}
                userPokemons={mockUserPokemons}
                onEndOfFight={mockOnEndOfFight}
                returnToHome={mockReturnToHome}
            />
        );

        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        expect(screen.getByText('Charmander')).toBeInTheDocument();
        expect(screen.getByText('Attack')).toBeInTheDocument();
    });

    test('handles battle completion when user wins', async () => {
        render(
            <RenderFight
                enemyPoke={mockEnemyPokeWeak}
                usersPoke={mockUserPokeStrong}
                userPokemons={mockUserPokemons}
                onEndOfFight={mockOnEndOfFight}
                returnToHome={mockReturnToHome}
            />
        );

        fireEvent.click(screen.getByText('Attack'));

        await waitFor(() => {
            expect(screen.getByText(/The winner:/)).toBeInTheDocument();
            expect(screen.getByText(/Your Pikachu/)).toBeInTheDocument();
        });

        // Wait for the return home timeout
        await waitFor(() => {
            expect(mockOnEndOfFight).toHaveBeenCalledWith([...mockUserPokemons, mockEnemyPokeWeak]);
            expect(mockReturnToHome).toHaveBeenCalled();
        }, { timeout: 4000 });
    });
});
