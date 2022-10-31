import Image from 'next/future/image';
import Link from 'next/link';
import { ArtistData, SongData } from 'types/types';

type DetailsHeaderProps = {
  artistId: string | string[] | undefined;
  songData?: SongData | undefined;
  artistData?: ArtistData;
};

const DetailsHeader = ({
  artistId,
  songData,
  artistData,
}: DetailsHeaderProps) => {
  const artist = artistData?.artists[Number(artistId)]?.attributes;

  return (
    <div className='relative flex w-full flex-col'>
      <div className='h-28 w-full bg-gradient-to-l from-transparent to-black sm:h-48' />
      <div className='absolute inset-0 flex items-center'>
        <Image
          src={`/api/imageProxy?imageUrl=${
            artistId
              ? artist?.artwork?.url.replace('{w}', '500').replace('{h}', '500')
              : songData?.images.coverart
          }`}
          alt='Song cover art'
          height={500}
          width={500}
          className='h-28 w-28 rounded-full border-2 object-cover shadow-xl shadow-black sm:h-48 sm:w-48'
        />

        <div className='ml-5'>
          <p className='text-xl font-bold text-white sm:text-3xl'>
            {artistId ? artist?.name : songData?.title}
          </p>
          {!artistId && (
            <Link href={`/artists/${songData?.artists[0]?.adamid}`}>
              <p className='mt-2 text-base text-gray-400'>
                {songData?.subtitle}
              </p>
            </Link>
          )}

          <p className='mt-2 text-base text-gray-400'>
            {artistId ? artist?.genreNames[0] : songData?.genres.primary}
          </p>
        </div>
      </div>

      <div className='h-24 w-full sm:h-44' />
    </div>
  );
};

export default DetailsHeader;
