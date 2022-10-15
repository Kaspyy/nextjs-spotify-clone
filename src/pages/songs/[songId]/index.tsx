import { DetailsHeader, Loader, RelatedSongs } from 'components';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { playPause, setActiveSong } from 'redux/features/playerSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from 'redux/services/shazamCore';
import { Song } from 'types/types';
import Layout from 'components/Layout';

const SongDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { songId } = router.query;
  const { activeSong, isPlaying } = useAppSelector(state => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songId as string);
  const { data, isFetching: isFetchingRelatedSongs } = useGetSongRelatedQuery(
    songId as string
  );

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song: Song, index: number) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title='Loading song details...' />;
  }

  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId='' songData={songData} />

      <div className='mb-10'>
        <h2 className='text-3xl font-bold text-white'>Lyrics:</h2>

        <div className='mt-5'>
          {songData?.sections[1]?.type === 'LYRICS' ? (
            songData?.sections[1]?.text.map((line: string, index: number) => (
              <p key={index} className='my-1 text-base text-gray-400'>
                {line}
              </p>
            ))
          ) : (
            <p className='my-1 text-base text-gray-400'>No lyrics available</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        activeSong={activeSong}
        isPlaying={isPlaying}
        artistId=''
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

SongDetails.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default SongDetails;
