import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { Song } from 'types/types';

type ArtistCardProps = {
  track: Song;
};

const ArtistCard = ({ track }: ArtistCardProps) => {
  const router = useRouter();
  return (
    <div
      className='flex w-[250px] animate-slideup cursor-pointer flex-col rounded-lg bg-white/5 bg-opacity-80 p-4 backdrop-blur-sm'
      onClick={() => router.push(`/artists/${track?.artists[0]?.adamid}`)}
    >
      <Image
        alt='artist'
        src={`/api/imageProxy?imageUrl=${track?.images?.coverart}`}
        width={250}
        height={250}
        className='h-56 w-full rounded-lg'
      />
      <p className='mt-4 truncate text-lg font-semibold text-white'>
        {track?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
