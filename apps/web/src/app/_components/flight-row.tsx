import React from 'react';
import { IFlight } from '../../types/flight.types';
import Link from 'next/link';
import { Button } from '@repo/ui/components/ui/button';
import { SquareArrowOutUpRight } from 'lucide-react';
import { TableRow, TableCell } from '@repo/ui/components/ui/table';
import { appSettings } from '../../constants/app-settings';

export const FlightRow = (flight: IFlight) => {
  return (
    <TableRow data-testid={`table-row-${flight.flightIdentifier}`}>
      <TableCell data-testid={`table-cell-flight-${flight.flightIdentifier}`}>{flight.flightNumber}</TableCell>
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
        <Link
          data-testid={`flight-link-${flight.flightIdentifier}`}
          href={`${appSettings.schipholUrl}${flight.url}`}
          target="_blank"
        >
          <Button className="flex gap-2" size="sm">
            Visit
            <SquareArrowOutUpRight size={16} />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};
