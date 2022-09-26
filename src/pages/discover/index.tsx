import React from 'react';
import { Error, Loader, SongCard } from 'components';
import { genres } from 'assets/constants';

import { useGetTopChartsQuery } from 'redux/services/shazamCore';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const Discover = () => {
  const dispatch = useAppDispatch();
  const { activeSong, isPlaying } = useAppSelector(state => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const genreTitle = 'Pop';

  if (isFetching) return <Loader title='Loading songs...' />;

  return (
    <div className='flex flex-col'>
      <div className='mt-4 mb-10 flex w-full flex-col items-center justify-between sm:flex-row'>
        <h2 className='text-left text-3xl font-bold text-white'>
          Discover {genreTitle}
        </h2>
        <select
          onChange={e => console.log(e.target.value)}
          value=''
          className='mt-5 rounded-lg bg-black p-3 text-sm text-gray-300 outline-none sm:mt-0'
        >
          {genres.map(genre => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-wrap gap-8 sm:justify-start'>
        {data?.map((song, index) => (
          <SongCard
            key={song.key}
            song={song}
            index={index}
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
