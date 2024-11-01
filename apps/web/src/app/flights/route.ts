import { NextRequest, NextResponse } from 'next/server';
import { appSettings } from '../../constants/app-settings';
import { getApi } from '../../api/get-api';
import { searchAirports } from '../../lib/helpers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const destination = searchParams.get('destination')?.toLowerCase();

  const api = getApi(appSettings.apiUrl);
  const data = await api.get('/flights');

  const airports = searchAirports(data, destination);

  return NextResponse.json(airports);
}
