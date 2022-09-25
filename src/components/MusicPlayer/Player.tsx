import { useRef, useEffect } from 'react';

type PlayerProps = {
  //TODO: add types
  activeSong: any;
  isPlaying: boolean;
  volume: number;
  currentIndex: number;
  seekTime: number;
  onEnded: () => void;
  onTimeUpdate: (event: any) => void;
  onLoadedData: (event: any) => void;
  repeat: boolean;
};

const Player = ({
  activeSong,
  isPlaying,
  volume,
  currentIndex,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}: PlayerProps) => {
  const ref = useRef<HTMLAudioElement>(null);
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={activeSong?.hub?.actions[1]?.uri}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
