import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Table, TableRow, TableHead, TableHeader, TableBody, TableCell } from '@repo/ui/components/ui/table';
import React, { use } from 'react';
import { IFlight } from '../../types/flight.types';
import Link from 'next/link';
import { Button } from '@repo/ui/components/ui/button';
import { SquareArrowOutUpRight } from 'lucide-react';

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
              <TableRow key={flight.flightIdentifier} data-testid={`table-row-${flight.flightIdentifier}`}>
                <TableCell data-testid={`table-cell-flight-${flight.flightIdentifier}`}>
                  {flight.flightNumber}
                </TableCell>
                <TableCell>{flight.airport}</TableCell>
                <TableCell>{flight.date}</TableCell>
                <TableCell data-testid={`table-cell-time-${flight.flightIdentifier}`}>
                  {flight.expectedTime !== flight.originalTime ? (
                    <p className="flex items-center gap-2">
                      <span>{flight.expectedTime}</span>
                      <span
                        data-testid={`table-cell-original-time-${flight.flightIdentifier}`}
                        className="line-through decoration-dark-red decoration-2"
                      >
                        {flight.originalTime}
                      </span>
                    </p>
                  ) : (
                    flight.expectedTime
                  )}
                </TableCell>
                <TableCell>
                  <Link data-testid={`flight-link-${flight.flightIdentifier}`} href={`${flight.url}`} target="_blank">
                    <Button className="flex gap-2" size="sm">
                      Visit
                      <SquareArrowOutUpRight size={16} />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
