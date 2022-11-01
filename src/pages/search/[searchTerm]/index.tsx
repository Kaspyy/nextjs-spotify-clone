import { useAppSelector } from 'redux/hooks';
import { Hit, Track } from 'types/types';
import { Error, Loader, SongCard } from 'components';
import { useGetSongsBySearchQuery } from 'redux/services/shazamCore';
import { NextPageWithLayout } from 'pages/_app';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const { searchTerm } = router.query;
  const { activeSong, isPlaying } = useAppSelector(state => state.player);

  const { data, error, isFetching } = useGetSongsBySearchQuery(
    searchTerm as string
  );

  const songs = data?.tracks.hits.map((hit: Hit) => hit.track);

  if (isFetching) return <Loader title='Loading songs around you...' />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='mt-4 mb-10 text-left text-3xl font-bold text-white'>
        Showing results for <span className='font-black'>{searchTerm}</span>
      </h2>

      <div className='flex flex-wrap justify-center gap-8 sm:justify-start'>
        {songs?.map((song: Track, index: number) => (
          <SongCard
            key={index}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

Search.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Search;
