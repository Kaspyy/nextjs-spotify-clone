import { Song } from 'types/types';

type SongCardProps = {
  song: Song;
  i: number;
};

const SongCard = ({ song, i }: SongCardProps) => <div>SongCard</div>;

export default SongCard;
