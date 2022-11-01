import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { Song, Track } from 'types/types';

type PlayPauseProps = {
  song: Song | Track;
  handlePause?: () => void;
  handlePlay?: () => void;
  isPlaying: boolean;
  activeSong: Song | Record<string, never> | undefined;
};

const PlayPause = ({
  song,
  handlePause,
  handlePlay,
  isPlaying,
  activeSong,
}: PlayPauseProps) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={35} onClick={handlePause} className='text-gray-300' />
  ) : (
    <FaPlayCircle size={35} onClick={handlePlay} className='text-gray-300' />
  );

export default PlayPause;
