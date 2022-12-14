import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArtistData, SearchQueryResponse, Song, SongData } from 'types/types';

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
    getSongsByGenre: builder.query<Song[], string>({
      query: genre => `/charts/genre-world?genre_code=${genre}`,
    }),
    getSongDetails: builder.query<SongData, string>({
      query: songid => `/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query<Song[], string>({
      query: songid => `/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query<ArtistData, string>({
      query: artistId => `/artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query<Song[], string>({
      query: countryCode => `/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query<SearchQueryResponse, string>({
      query: searchTerm =>
        `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
