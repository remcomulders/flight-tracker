import React from 'react';
import { render } from '@testing-library/react';
import { FlightRow } from './flight-row';
import '@testing-library/jest-dom';
import { appSettings } from '../../constants/app-settings';
import { mockFlightData } from '../../_mocks/flights.mock';

describe('FlightRow', () => {
  it('renders flight information correctly', () => {
    const { getByTestId, getByText } = render(
      <table>
        <tbody>
          <FlightRow {...mockFlightData} />
        </tbody>
      </table>
    );

    const flightNumberCell = getByTestId(`table-cell-flight-${mockFlightData.flightIdentifier}`);
    expect(flightNumberCell).toHaveTextContent(mockFlightData.flightNumber);
    expect(getByText(mockFlightData.airport)).toBeInTheDocument();
    expect(getByText(mockFlightData.date)).toBeInTheDocument();
  });

  it('renders the expected time and original time with a line-through when times differ', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <FlightRow {...mockFlightData} />
        </tbody>
      </table>
    );

    const expectedTimeCell = getByTestId(`table-cell-time-${mockFlightData.flightIdentifier}`);
    expect(expectedTimeCell).toHaveTextContent(mockFlightData.expectedTime);

    const originalTime = getByTestId(`table-cell-original-time-${mockFlightData.flightIdentifier}`);
    expect(originalTime).toHaveTextContent(mockFlightData.originalTime);
    expect(originalTime).toHaveClass('line-through');
  });

  it('renders only the expected time when it matches the original time', () => {
    const sameTimeFlight = { ...mockFlightData, expectedTime: '11:00', originalTime: '11:00' };
    const { getByTestId, queryByTestId } = render(
      <table>
        <tbody>
          <FlightRow {...sameTimeFlight} />
        </tbody>
      </table>
    );

    expect(getByTestId(`table-cell-time-${sameTimeFlight.flightIdentifier}`)).toHaveTextContent(
      sameTimeFlight.expectedTime
    );
    expect(queryByTestId(`table-cell-original-time-${sameTimeFlight.flightIdentifier}`)).not.toBeInTheDocument();
  });

  it('renders the link with the correct href', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <FlightRow {...mockFlightData} />
        </tbody>
      </table>
    );

    const flightLink = getByTestId(`flight-link-${mockFlightData.flightIdentifier}`);
    expect(flightLink).toHaveAttribute('href', `${appSettings.schipholUrl}${mockFlightData.url}`);
    expect(flightLink).toHaveAttribute('target', '_blank');
  });

  it('renders the visit button with correct icon and text', () => {
    const { getByRole, getByText, getByTestId } = render(
      <table>
        <tbody>
          <FlightRow {...mockFlightData} />
        </tbody>
      </table>
    );

    const button = getByRole('button', { name: /Visit/i });
    expect(button).toBeInTheDocument();
    expect(getByText('Visit')).toBeInTheDocument();
    expect(getByTestId(`flight-link-${mockFlightData.flightIdentifier}`)).toBeInTheDocument();
  });
});
