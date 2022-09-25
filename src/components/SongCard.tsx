import { Song } from 'types/types';

type SongCardProps = {
  song: Song;
  i: number;
  key: string;
};

const SongCard = ({ song, i, key }: SongCardProps) => <div>SongCard</div>;

export default SongCard;
