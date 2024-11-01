import { IFlight } from '../types/flight.types';

export function searchAirports(flightsData: IFlight[], query?: string): IFlight[] {
  const matchingFlights = query
    ? flightsData.filter((flight) => flight.airport.toLowerCase().includes(query.toLowerCase()))
    : flightsData;

  const sortedFlights = matchingFlights.sort((a, b) => {
    const dateComparison = a.date.localeCompare(b.date);
    if (dateComparison !== 0) return dateComparison;
    return a.expectedTime.localeCompare(b.expectedTime);
  });

  return sortedFlights.slice(0, 5);
}
