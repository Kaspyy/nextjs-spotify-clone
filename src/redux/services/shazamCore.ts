import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Song } from 'types/types';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: headers => {
      headers.set(
        'X-RapidAPI-Key',
        'cd3063060emsh3529c2ad80917e6p1c551bjsn7eefa79b5f50'
      );
      return headers;
    },
  }),
  endpoints: builder => ({
    getTopCharts: builder.query<Song[], void>({
      query: () => '/charts/world',
    }),
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
