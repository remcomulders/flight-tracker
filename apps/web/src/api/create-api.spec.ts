import { createApi, RequestResults, IBaseApi } from './create-api';

describe('createApi', () => {
  const mockBaseUrl = 'https://api.schiphol.nl';
  const mockEndpoint = '/test-endpoint';
  const mockResponseData = { data: 'test data' };
  const mockHeaders = { Authorization: 'Bearer token' };

  let api: IBaseApi<RequestResults>;

  beforeEach(() => {
    api = createApi<RequestResults>(mockBaseUrl);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponseData),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('merges default headers, base headers, and custom headers', async () => {
    const defaultHeaders = { 'X-Custom-Header': 'custom-value' };
    const apiWithDefaults = createApi<RequestResults>(mockBaseUrl, defaultHeaders);

    await apiWithDefaults.get(mockEndpoint, undefined, mockHeaders);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(URL),
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
          'X-Custom-Header': 'custom-value',
          Authorization: 'Bearer token',
        },
      })
    );
  });

  it('returns the JSON response data', async () => {
    const result = await api.get(mockEndpoint);

    expect(result).toEqual(mockResponseData);
  });
});
