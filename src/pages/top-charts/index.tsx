import { useAppSelector } from 'redux/hooks';
import { Song } from 'types/types';
import { Error, Loader, SongCard } from 'components';
import { useGetTopChartsQuery } from 'redux/services/shazamCore';
import { NextPageWithLayout } from 'pages/_app';
import Layout from 'components/Layout';

const TopCharts: NextPageWithLayout = () => {
  const { activeSong, isPlaying } = useAppSelector(state => state.player);

  const { data, error, isFetching } = useGetTopChartsQuery();

  if (isFetching) return <Loader title='Loading songs around you...' />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='mt-4 mb-10 text-left text-3xl font-bold text-white'>
        Discover Top Charts
      </h2>

      <div className='flex flex-wrap justify-center gap-8 sm:justify-start'>
        {data?.map((song: Song, index: number) => (
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

TopCharts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TopCharts;
