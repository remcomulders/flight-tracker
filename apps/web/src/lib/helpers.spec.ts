import { mockFlightsData } from '../_mocks/flights.mock';
import { searchAirports } from './helpers';

describe('searchAirports', () => {
  it('returns all flights sorted by date and time if no query is provided', () => {
    const result = searchAirports(mockFlightsData);

    expect(result).toEqual([
      mockFlightsData[0], // San Francisco, 2022-02-23, 14:50
      mockFlightsData[1], // Santiago Com, 2022-02-22, 15:50
      mockFlightsData[2], // Dublin, 2022-02-23, 16:00
      mockFlightsData[3], // Dublin, 2022-02-23, 17:15
      mockFlightsData[4], // Dublin, 2022-02-23, 18:35
    ]);
  });

  it('filters flights by airport and returns sorted results when a query is provided', () => {
    const result = searchAirports(mockFlightsData, 'Dublin');

    expect(result).toEqual([
      mockFlightsData[2], // Dublin, 2022-02-23, 16:00
      mockFlightsData[3], // Dublin, 2022-02-23, 17:15
      mockFlightsData[4], // Dublin, 2022-02-23, 18:35
      mockFlightsData[5], // Dublin, 2022-02-23, 21:40
      mockFlightsData[6], // Dublin, 2022-02-23, 21:45
    ]);
  });

  it('returns at most 5 flights, even if there are more matches', () => {
    const result = searchAirports(mockFlightsData);

    expect(result).toHaveLength(5);
  });

  it('is case-insensitive when filtering by airport', () => {
    const result = searchAirports(mockFlightsData, 'dUbLiN');

    expect(result).toEqual([
      mockFlightsData[2], // Dublin, 2022-02-23, 16:00
      mockFlightsData[3], // Dublin, 2022-02-23, 17:15
      mockFlightsData[4], // Dublin, 2022-02-23, 18:35
      mockFlightsData[5], // Dublin, 2022-02-23, 21:40
      mockFlightsData[6], // Dublin, 2022-02-23, 21:45
    ]);
  });
});
