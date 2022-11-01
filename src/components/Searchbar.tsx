import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${searchTerm}`);
  };

  return (
    <form
      autoComplete='off'
      className='p-2 text-gray-400 focus-within:text-gray-600'
      onSubmit={handleSubmit}
    >
      <label htmlFor='search-field' className='sr-only'>
        Search all songs
      </label>
      <div className='flex flex-row items-center justify-start'>
        <FiSearch className='ml-4 h-5 w-5' />
        <input
          name='search-field'
          autoComplete='off'
          id='search-field'
          placeholder='Search'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='ml-2 flex-1 border-none bg-transparent p-4 text-base text-white placeholder-gray-500 outline-none'
        />
      </div>
    </form>
  );
};

export default Searchbar;
