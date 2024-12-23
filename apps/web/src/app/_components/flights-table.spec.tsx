import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { FlightsTable } from './flights-table';
import { mockFlightsData } from '../../_mocks/flights.mock';
import { appSettings } from '../../constants/app-settings';

jest.mock('../../constants/app-settings', () => ({
  appSettings: { schipholUrl: 'https://schiphol.nl' },
}));

describe('FlightsTable', () => {
  it('displays "No flights found" message when flights list is empty', async () => {
    const { getByTestId } = render(<FlightsTable flightsPromise={Promise.resolve([])} />);

    await waitFor(() => {
      expect(getByTestId('empty-flights-card')).toBeInTheDocument();
    });
  });

  it('renders a table with flights when flights data is provided', async () => {
    const { getByTestId } = render(<FlightsTable flightsPromise={Promise.resolve(mockFlightsData)} />);

    await waitFor(() => {
      expect(getByTestId('flights-table')).toBeInTheDocument();

      mockFlightsData.forEach((flight) => {
        const row = getByTestId(`table-row-${flight.flightIdentifier}`);
        expect(row).toBeInTheDocument();
        expect(getByTestId(`table-cell-flight-${flight.flightIdentifier}`)).toBeInTheDocument();
        expect(getByTestId(`table-cell-time-${flight.flightIdentifier}`)).toBeInTheDocument();
        if (flight.expectedTime !== flight.originalTime) {
          expect(getByTestId(`table-cell-original-time-${flight.flightIdentifier}`)).toHaveClass('line-through');
        }
      });
    });
  });

  it('provides a working link for each flight', async () => {
    const { getByTestId } = render(<FlightsTable flightsPromise={Promise.resolve(mockFlightsData)} />);

    await waitFor(() => {
      mockFlightsData.forEach((flight) => {
        const link = getByTestId(`flight-link-${flight.flightIdentifier}`);
        expect(link).toHaveAttribute('href', `${appSettings.schipholUrl}${flight.url}`);
        expect(link).toHaveAttribute('target', '_blank');
      });
    });
  });
});
