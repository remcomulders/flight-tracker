import { NextRequest, NextResponse } from 'next/server';
import { appSettings } from '../../constants/app-settings';
import { getApi } from '../../api/get-api';
import { searchAirports } from '../../lib/helpers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const airport = searchParams.get('airport')?.toLowerCase();

  const api = getApi(appSettings.apiUrl);
  try {
    const data = await api.get('/flights');

    const airports = searchAirports(data, airport);

    return NextResponse.json(airports);
  } catch {
    return NextResponse.json([]);
  }
}
