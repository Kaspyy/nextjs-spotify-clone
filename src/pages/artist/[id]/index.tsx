import { DetailsHeader, Error, Loader, RelatedSongs } from 'components';
import { useRouter } from 'next/router';
import { useAppSelector } from 'redux/hooks';
import { useGetArtistDetailsQuery } from 'redux/services/shazamCore';

const ArtistDetails = () => {
  const router = useRouter();
  const { artistId } = router.query;
  const { activeSong, isPlaying } = useAppSelector(state => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId as string);

  if (isFetchingArtistDetails) return <Loader title='Loading artist details' />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={Object.entries(artistData?.songs ?? {}).map(([key, value]) => ({
          ...value,
          key,
        }))}
        activeSong={activeSong}
        isPlaying={isPlaying}
        artistId={artistId as string}
      />
    </div>
  );
};

export default ArtistDetails;