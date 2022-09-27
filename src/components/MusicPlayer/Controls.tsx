import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from 'react-icons/bs';
import { Song } from 'types/types';

type ControlsProps = {
  isPlaying: boolean;
  repeat: boolean;
  setRepeat: (repeat: boolean) => boolean;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => boolean;
  currentSongs: Song[];
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
};

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}: ControlsProps) => (
  <div className='flex items-center justify-around md:w-36 lg:w-52 2xl:w-80'>
    <BsArrowRepeat
      size={20}
      color={repeat ? 'red' : 'white'}
      onClick={() => setRepeat(!repeat)}
      className='hidden cursor-pointer sm:block'
    />
    {currentSongs?.length && (
      <MdSkipPrevious
        size={30}
        color='#FFF'
        className='cursor-pointer'
        onClick={handlePrevSong}
      />
    )}
    {isPlaying ? (
      <BsFillPauseFill
        size={45}
        color='#FFF'
        onClick={handlePlayPause}
        className='cursor-pointer'
      />
    ) : (
      <BsFillPlayFill
        size={45}
        color='#FFF'
        onClick={handlePlayPause}
        className='cursor-pointer'
      />
    )}
    {currentSongs?.length && (
      <MdSkipNext
        size={30}
        color='#FFF'
        className='cursor-pointer'
        onClick={handleNextSong}
      />
    )}
    <BsShuffle
      size={20}
      color={shuffle ? 'red' : 'white'}
      onClick={() => setShuffle(!shuffle)}
      className='hidden cursor-pointer sm:block'
    />
  </div>
);

export default Controls;
