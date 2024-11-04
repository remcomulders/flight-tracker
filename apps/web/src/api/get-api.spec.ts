import { mockFlightsData } from '../_mocks/flights.mock';
import { getApi } from './get-api';

jest.mock('../constants/app-settings', () => ({
  appSettings: { baseUrl: 'https://api.schiphol.nl' },
}));

describe('getApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFlightsData),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates an API instance with the default baseUrl from appSettings', async () => {
    const api = getApi();
    await api.get('/flights');

    expect(global.fetch).toHaveBeenCalledWith(
      new URL('https://api.schiphol.nl/flights'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.any(Object),
      })
    );
  });

  it('returns flight data from the /flights endpoint', async () => {
    const api = getApi();
    const result = await api.get('/flights');

    expect(result).toEqual(mockFlightsData);
  });

  it('allows overriding the baseUrl', async () => {
    const customBaseUrl = 'https://new-api.schiphol.nl';
    const api = getApi(customBaseUrl);
    await api.get('/flights');

    expect(global.fetch).toHaveBeenCalledWith(new URL(`${customBaseUrl}/flights`), expect.any(Object));
  });
});
