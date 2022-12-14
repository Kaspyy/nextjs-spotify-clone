import React from 'react';
import Link from 'next/link';
import Image from 'next/future/image';
import PlayPause from './PlayPause';
import { Song } from 'types/types';

type SongBarProps = {
  song: Song;
  index: number;
  artistId: string;
  isPlaying: boolean;
  activeSong: Song | Record<string, never> | undefined;
  handlePauseClick?: () => void | undefined;
  handlePlayClick?: (song: Song, index: number) => void;
};

const SongBar = ({
  song,
  index,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}: SongBarProps) => (
  <div
    className={`flex w-full flex-row items-center hover:bg-[#4c426e] ${
      activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'
    } mb-2 cursor-pointer rounded-lg p-4 py-2`}
  >
    <h3 className='mr-3 text-base font-bold text-white'>{index + 1}.</h3>
    <div className='flex flex-1 flex-row items-center justify-between'>
      <Image
        className='h-20 w-20 rounded-lg'
        src={`/api/imageProxy?imageUrl=${
          artistId
            ? song?.attributes?.artwork?.url
                .replace('{w}', '125')
                .replace('{h}', '125')
            : song.images?.coverart
        }`}
        alt={song?.title}
        height={125}
        width={125}
      />
      <div className='mx-3 flex flex-1 flex-col justify-center'>
        {!artistId ? (
          <Link href={`/songs/${song.key}`}>
            <p className='text-xl font-bold text-white'>{song?.title}</p>
          </Link>
        ) : (
          <p className='text-xl font-bold text-white'>
            {song?.attributes?.name}
          </p>
        )}
        <p className='mt-1 text-base text-gray-300'>
          {artistId ? song?.attributes?.albumName : song?.subtitle}
        </p>
      </div>
    </div>
    {!artistId ? (
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick?.(song, index)}
      />
    ) : null}
  </div>
);

export default SongBar;
