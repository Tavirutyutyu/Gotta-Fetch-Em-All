import RenderFight from '../Components/FightPage/RenderFight.js';
import {screen, fireEvent, render, waitFor} from "@testing-library/react";

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

const mockUserPokeWeak = {
    name: 'Pikachu',
    stats: [
        {stat: {name: 'hp'}, base_stat: 1},
        {stat: {name: 'attack'}, base_stat: 1},
        {stat: {name: 'defense'}, base_stat: 1},
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

const mockEnemyPokeStrong = {
    name: 'Charmander',
    stats:[
        {stat: {name: 'hp'}, base_stat: 100},
        {stat: {name: 'attack'}, base_stat: 100},
        {stat: {name: 'defense'}, base_stat: 100},
    ],
    sprites:{
        other:{
            showdown:{
                front_default: 'path/to/charmander-front.png'
            }
        }
    }
}


const mockUserPokemons = [mockUserPokeStrong];
const mockSetAllPokemons = jest.fn();
const mockReturnToHome = jest.fn();


describe('RenderFight Component', () => {
    it('renders with correct user and enemy data', async () => {
        render(
            <RenderFight
                enemyPoke={mockEnemyPokeWeak}
                usersPoke={mockUserPokeStrong}
                userPokemons={mockUserPokemons}
                setAllPokemons={mockSetAllPokemons}
                returnToHome={mockReturnToHome}
            />
        );

        expect(await screen.findByText('Pikachu')).toBeInTheDocument();

        expect(await screen.findByText('Charmander')).toBeInTheDocument();
    });

    it('handles fight simulation, then player wins', async () => {
        render(
            <RenderFight
                enemyPoke={mockEnemyPokeWeak}
                usersPoke={mockUserPokeStrong}
                userPokemons={mockUserPokemons}
                setAllPokemons={mockSetAllPokemons}
                returnToHome={mockReturnToHome}
            />
        );

        const fightButton = screen.getByRole('button');
        fireEvent.click(fightButton);

        await waitFor(() => {
            expect(screen.getByText(/The winner:/)).toBeInTheDocument();
            expect(screen.getByText(/Your Pikachu/)).toBeInTheDocument();
        });
    });

    it('handles fight simulation, then enemy wins', async () => {
        render(
            <RenderFight
                enemyPoke={mockEnemyPokeStrong}
                usersPoke={mockUserPokeWeak}
                userPokemons={mockUserPokemons}
                setAllPokemons={mockSetAllPokemons}
                returnToHome={mockReturnToHome}
            />
        );

        const fightButton = screen.getByRole('button');
        fireEvent.click(fightButton);

        await waitFor(() => {
            expect(screen.getByText(/The winner:/)).toBeInTheDocument();
            expect(screen.getByText(/Enemy Charmander/)).toBeInTheDocument();
        });
    });
});



