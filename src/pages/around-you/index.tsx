import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from 'redux/hooks';
import { Song } from 'types/types';
import { Error, Loader, SongCard } from 'components';
import { useGetSongsByCountryQuery } from 'redux/services/shazamCore';
import { NextPageWithLayout } from 'pages/_app';
import Layout from 'components/Layout';

const AroundYou: NextPageWithLayout = () => {
  const [country, setCountry] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { activeSong, isPlaying } = useAppSelector(state => state.player);

  const { data, error, isFetching } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}&ipAddress=8.8.8.8`
      )
      .then(res => {
        setCountry(res.data.location.country);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [country]);

  if (isFetching && loading) {
    return <Loader title='Loading songs around you...' />;
  }

  if (error && country) {
    return <Error />;
  }

  return (
    <div className='flex flex-col'>
      <h2 className='mt-4 mb-10 text-left text-3xl font-bold text-white'>
        Around You <span className='font-black'>{country}</span>
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

AroundYou.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AroundYou;
