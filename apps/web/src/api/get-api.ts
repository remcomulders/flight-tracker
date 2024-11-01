import { createApi, type RequestResults } from './create-api';
import { IFlight } from '../types/flight.types';
import { appSettings } from '../constants/app-settings';

interface BackendApiResults extends RequestResults {
  '/flights': IFlight[];
}

export const getApi = (baseUrl = appSettings.baseUrl ?? '') => createApi<BackendApiResults>(baseUrl);
