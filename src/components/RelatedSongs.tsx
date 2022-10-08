import { Song } from 'types/types';
import { SongBar } from 'components';

type RelatedSongsProps = {
  data: Song[] | undefined;
  activeSong: Song | Record<string, never> | undefined;
  isPlaying: boolean;
  artistId: string;
  handlePauseClick?: () => void;
  handlePlayClick?: (song: Song, index: number) => void;
};

const RelatedSongs = ({
  data,
  activeSong,
  isPlaying,
  artistId,
  handlePauseClick,
  handlePlayClick,
}: RelatedSongsProps) => (
  <div className='flex flex-col'>
    <h1 className='text-3xl font-bold text-white'>Related Songs:</h1>

    <div className='mt-6 flex w-full flex-col'>
      {data?.map((song: Song, index: number) => (
        <SongBar
          key={`${song.key}-${artistId}`}
          song={song}
          index={index}
          artistId={artistId}
          activeSong={activeSong}
          isPlaying={isPlaying}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
