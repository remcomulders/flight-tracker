import { type StringKey } from '../types/common.types';

const DEFAULT_HEADERS = Object.freeze({
  'Content-Type': 'application/json',
});

export type RequestResults<Endpoint extends string = string> = Record<Endpoint, unknown>;

export type RequestParameters = Record<string, string | number>;

export type IBaseApi<Results extends RequestResults> = {
  get<Path extends StringKey<keyof Results>>(
    path: Path,
    parameters?: RequestParameters,
    headers?: Record<string, string>
  ): Promise<Results[Path]>;
};

export const createApi = <EndpointResults extends RequestResults = RequestResults>(
  baseUrl: string,
  defaultHeaders?: Record<string, string>
): IBaseApi<EndpointResults> => {
  const createUrl = (path: string, parameters?: RequestParameters) => {
    const url = new URL(baseUrl + path);

    for (const [key, value] of Object.entries(parameters ?? {})) {
      url.searchParams.set(key, String(value));
    }

    return url;
  };

  const get: IBaseApi<EndpointResults>['get'] = async (path, parameters, headers) => {
    const url = createUrl(path, parameters);
    const allHeaders: Record<string, string> = {
      ...DEFAULT_HEADERS,
      ...defaultHeaders,
      ...headers,
    };

    const response = await fetch(url, {
      method: 'GET',
      headers: allHeaders,
    });

    return response.json();
  };

  return { get };
};
