import { DetailsHeader, Error, Loader, RelatedSongs } from 'components';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { useAppSelector } from 'redux/hooks';
import { useGetArtistDetailsQuery } from 'redux/services/shazamCore';
import Layout from 'components/Layout';

const ArtistDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { activeSong, isPlaying } = useAppSelector(state => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(id as string);

  console.log(artistData);

  if (isFetchingArtistDetails) return <Loader title='Loading artist details' />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId={id} artistData={artistData} />

      <RelatedSongs
        data={Object.values(artistData?.songs ?? {})}
        activeSong={activeSong}
        isPlaying={isPlaying}
        artistId={id as string}
      />
    </div>
  );
};

ArtistDetails.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default ArtistDetails;
