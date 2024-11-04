import { IFlight } from '../types/flight.types';

export const mockFlightData: IFlight = {
  flightIdentifier: 'D20190401UA969',
  flightNumber: 'UA 969',
  airport: 'San Francisco',
  date: '2022-02-23',
  expectedTime: '15:50',
  originalTime: '15:55',
  url: '/en/departures/flight/D20190401UA969',
  score: '70.55272',
};

export const mockFlightsData: IFlight[] = [
  {
    flightIdentifier: 'D20190401UA969',
    flightNumber: 'UA 969',
    airport: 'San Francisco',
    date: '2022-02-23',
    expectedTime: '14:50',
    originalTime: '14:50',
    url: '/en/departures/flight/D20190401UA969',
    score: '70.55272',
  },
  {
    flightIdentifier: 'D20190401VY8379',
    flightNumber: 'VY 8379',
    airport: 'Santiago Com',
    date: '2022-02-22',
    expectedTime: '15:50',
    originalTime: '15:55',
    url: '/en/departures/flight/D20190401VY8379',
    score: '62.708916',
  },
  {
    flightIdentifier: 'D20190401KL0937',
    flightNumber: 'KL 937',
    airport: 'Dublin',
    date: '2022-02-23',
    expectedTime: '16:00',
    originalTime: '16:00',
    url: '/en/departures/flight/D20190401KL0937',
    score: '255.66647',
  },
  {
    flightIdentifier: 'D20190401EI609',
    flightNumber: 'EI 609',
    airport: 'Dublin',
    date: '2022-02-23',
    expectedTime: '17:15',
    originalTime: '17:15',
    url: '/en/departures/flight/D20190401EI609',
    score: '261.41364',
  },
  {
    flightIdentifier: 'D20190401FR3105',
    flightNumber: 'FR 3105',
    airport: 'Dublin',
    date: '2022-02-23',
    expectedTime: '18:35',
    originalTime: '18:35',
    url: '/en/departures/flight/D20190401FR3105',
    score: '261.41364',
  },
  {
    flightIdentifier: 'D20190401EI611',
    flightNumber: 'EI 611',
    airport: 'Dublin',
    date: '2022-02-23',
    expectedTime: '21:40',
    originalTime: '21:40',
    url: '/en/departures/flight/D20190401EI611',
    score: '262.5605',
  },
  {
    flightIdentifier: 'D20190401KL0939',
    flightNumber: 'KL 939',
    airport: 'Dublin',
    date: '2022-02-23',
    expectedTime: '21:45',
    originalTime: '21:45',
    url: '/en/departures/flight/D20190401KL0939',
    score: '262.5605',
  },
  {
    flightIdentifier: 'D20190401FR3007',
    flightNumber: 'FR 3007',
    airport: 'Dublin',
    date: '2022-02-23',
    expectedTime: '22:05',
    originalTime: '22:05',
    url: '/en/departures/flight/D20190401FR3007',
    score: '261.34207',
  },
];
