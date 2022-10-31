import { Song } from 'types/types';
import { ArtistCard, Loader, Error } from 'components';
import { useGetTopChartsQuery } from 'redux/services/shazamCore';
import { NextPageWithLayout } from 'pages/_app';
import Layout from 'components/Layout';

const TopArtists: NextPageWithLayout = () => {
  const { data, error, isFetching } = useGetTopChartsQuery();

  if (isFetching) return <Loader title='Loading songs around you...' />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='mt-4 mb-10 text-left text-3xl font-bold text-white'>
        Top Artists
      </h2>

      <div className='flex flex-wrap justify-center gap-8 sm:justify-start'>
        {data?.map(track => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

TopArtists.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TopArtists;
