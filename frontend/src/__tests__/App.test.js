import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import fetchData from '../Utils';

jest.mock('../Utils');

describe('App component', () => {
    beforeEach(() => {
        fetchData.mockResolvedValueOnce({ results: [{ name: 'Viriddian Forest' }] });
    });

    test('renders correctly on initial load', async () => {
        render(<App />);

        expect(await screen.findByText('Choose Location')).toBeInTheDocument();
    });

    test('shows list of locations on successful data fetch', async () => {
        render(<App />);

        const locationsList = await screen.findByRole('list');
        expect(locationsList).toBeInTheDocument();

        const locationItem = await screen.findByText('Viriddian Forest');
        expect(locationItem).toBeInTheDocument();
    });


});