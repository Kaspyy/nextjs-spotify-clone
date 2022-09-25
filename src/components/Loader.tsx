import { loader } from 'assets';
import Image from 'next/image';

type LoaderProps = {
  title: string;
};

const Loader = ({ title }: LoaderProps) => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <Image src={loader} alt='loader' className='h-32 w-32 object-contain' />
      <h1 className='mt-2 text-2xl font-bold text-white'>
        {title || 'Loading...'}
      </h1>
    </div>
  );
};

export default Loader;
