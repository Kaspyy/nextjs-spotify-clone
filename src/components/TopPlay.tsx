import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { playPause, setActiveSong } from 'redux/features/playerSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useGetTopChartsQuery } from 'redux/services/shazamCore';
import { Song } from 'types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import Image from 'next/future/image';
import PlayPause from './PlayPause';

import 'swiper/css';
import 'swiper/css/free-mode';

type TopChartCardProps = {
  song: Song;
  index: number;
  isPlaying: boolean;
  activeSong: Song | Record<string, never> | undefined;
  handlePauseClick: () => void;
  handlePlayClick: () => void;
};

const TopChartCard = ({
  song,
  index,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}: TopChartCardProps) => (
  <div className='mb-2 flex w-full cursor-pointer flex-row items-center rounded-lg p-4 py-2 hover:bg-[#4c426e]'>
    <h3 className='mr-3 text-base font-bold text-white'>{index + 1}.</h3>
    <div className='flex flex-1 flex-row items-center justify-between'>
      <Image
        className='h-20 w-20 rounded-lg'
        src={`/api/imageProxy?imageUrl=${song?.images?.coverart}`}
        alt={song?.title}
        height={125}
        width={125}
      />
      <div className='mx-3 flex flex-1 flex-col justify-center'>
        <Link href={`/songs/${song.key}`}>
          <p className='text-xl font-bold text-white'>{song?.title}</p>
        </Link>
        <Link href={`/artist/${song?.artists[0]?.adamid}`}>
          <p className='mt-1 text-base text-gray-300'>{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useAppDispatch();
  const { activeSong, isPlaying } = useAppSelector(state => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song: Song, index: number) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className='ml-0 mb-6 flex max-w-full flex-1 flex-col xl:ml-6 xl:mb-0 xl:max-w-[500px]'
    >
      <div className='flex w-full flex-col'>
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-2xl font-bold text-white'>Top Charts</h2>
          <Link href='/top-charts'>
            <p className='cursor-pointer text-gray-300'>See more</p>
          </Link>
        </div>
        <div className='mt-4 flex flex-col gap-1'>
          {topPlays?.map((song, index) => (
            <TopChartCard
              song={song}
              index={index}
              key={song.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, index)}
            />
          ))}
        </div>
      </div>

      <div className='mt-8 flex w-full flex-col'>
        <div className='flex flex-row items-center justify-between'>
          <h2 className='text-2xl font-bold text-white'>Top Artists</h2>
          <Link href='/top-artists'>
            <p className='cursor-pointer text-gray-300'>See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className='mt-4'
        >
          {topPlays?.slice(0, 5).map(song => (
            <SwiperSlide
              key={song?.key}
              className='animate-slideright rounded-full shadow-lg'
              style={{ width: '25%', height: 'auto' }}
            >
              <Link href={`/artist/${song?.artists[0]?.adamid}`}>
                <Image
                  src={`/api/imageProxy?imageUrl=${song?.images.background}`}
                  alt='artist_image'
                  width={200}
                  height={200}
                  className='w-full rounded-full object-cover'
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
