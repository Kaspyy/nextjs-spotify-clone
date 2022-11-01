import { SearchQueryResponse, Song, Track } from 'types/types';
import Link from 'next/link';
import { useAppDispatch } from 'redux/hooks';
import PlayPause from 'components/PlayPause';
import { playPause, setActiveSong } from 'redux/features/playerSlice';
import Image from 'next/future/image';

type SongCardProps = {
  song: Song | Track;
  index: number;
  isPlaying: boolean;
  activeSong: Song | Record<string, never> | undefined;
  data: Song[] | SearchQueryResponse | undefined;
};

const SongCard = ({
  song,
  index,
  isPlaying,
  activeSong,
  data,
}: SongCardProps) => {
  const dispatch = useAppDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  return (
    <div className='flex w-[250px] animate-slideup cursor-pointer flex-col rounded-lg bg-white/5 bg-opacity-80 p-4 backdrop-blur-sm'>
      <div className='group relative h-56 w-full'>
        <Image
          src={`/api/imageProxy?imageUrl=${song.images?.coverart}`}
          alt='song_image'
          fill
        />
        <div
          className={`absolute inset-0 items-center justify-center bg-black bg-opacity-70 group-hover:flex ${
            activeSong?.title === song.title
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
      </div>

      <div className='mt-4 flex flex-col'>
        <p className='truncate text-lg font-semibold text-white'>
          <Link href={`/songs/${song.key}`}>{song.title}</Link>
        </p>
        <p className='mt-1 truncate text-sm text-gray-300'>
          <Link
            href={
              song.artists
                ? `/artists/${song.artists[0]?.adamid}`
                : '/top-artists'
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
