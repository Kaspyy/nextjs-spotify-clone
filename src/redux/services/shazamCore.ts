import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Song } from 'types/types';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: headers => {
      headers.set(
        'X-RapidAPI-Key',
        process.env.NEXT_PUBLIC_SHAZAM_CORE_RAPID_API_KEY as string
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
