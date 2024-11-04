import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Table, TableRow, TableHead, TableHeader, TableBody } from '@repo/ui/components/ui/table';
import React, { use } from 'react';
import { IFlight } from '../../types/flight.types';
import { FlightRow } from './flight-row';

interface Props {
  flightsPromise: Promise<IFlight[]>;
}

export const FlightsTable = ({ flightsPromise }: Props) => {
  const flights = use(flightsPromise);
  if (flights.length <= 0) {
    return (
      <Card data-testid="empty-flights-card" className="h-[26rem] w-full">
        <CardContent className="grid h-full place-content-center text-center">
          <p className="m-auto w-fit bg-gradient-purple bg-clip-text text-5xl font-bold leading-tight text-transparent">
            No flights found
          </p>
          <p>Please try again with a different airport.</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card data-testid="flights-table" className="h-[26rem] w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Flight</TableHead>
              <TableHead>Airport</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[112px]">Arrival time</TableHead>
              <TableHead className="w-[100px]"> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map((flight) => (
              <FlightRow key={flight.flightIdentifier} {...flight} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
