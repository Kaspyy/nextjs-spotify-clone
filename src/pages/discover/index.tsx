import { Error, Loader, SongCard } from 'components';
import { genres } from 'assets/constants';

const Discover = () => {
  const genreTitle = 'Pop';

  return (
    <div className='flex flex-col'>
      <div className='mt-4 mb-10 flex w-full flex-col items-center justify-between sm:flex-row'>
        <h2 className='text-left text-3xl font-bold text-white'>
          Discover {genreTitle}
        </h2>
        <select
          // onChange
          value=''
          className='mt-5 rounded-lg bg-black p-3 text-sm text-gray-300 outline-none sm:mt-0'
        >
          {genres.map(genre => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-wrap gap-8 sm:justify-start'>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <SongCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default Discover;
