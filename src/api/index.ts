import axios from 'axios';
export * from '@api/timeseries';

export const api = axios.create({
  baseURL: import.meta.env.PUBLIC_RAPID_API_TIMESERIES_URI,
  headers: {
    'x-rapidapi-host': import.meta.env.PUBLIC_RAPID_API_HOST,
    'x-rapidapi-key': import.meta.env.PUBLIC_RAPID_API_KEY,
  },
});
