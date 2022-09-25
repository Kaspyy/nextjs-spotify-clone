import type { NextPage } from 'next';
import Head from 'next/head';
import MusicPlayer from '../components/MusicPlayer';
import Searchbar from '../components/Searchbar';
import Sidebar from '../components/Slidebar';
import TopPlay from '../components/TopPlay';
import { useAppSelector } from '../redux/hooks';

const Home: NextPage = () => {
  const { activeSong } = useAppSelector(state => state.player);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='relative flex'>
        <Sidebar />
        <div className='flex flex-1 flex-col bg-gradient-to-br from-black to-[#121286]'>
          <Searchbar />

          <div className='hide-scrollbar flex h-[calc(100vh-72px)] flex-col-reverse overflow-y-scroll px-6 xl:flex-row'>
            <div className='h-fit flex-1 pb-40'>
              <h1>Discover</h1>
            </div>
            <div className='relative top-0 h-fit xl:sticky'>
              <TopPlay />
            </div>
          </div>
        </div>

        {activeSong?.title && (
          <div className='absolute bottom-0 left-0 right-0 z-10 flex h-28 animate-slideup rounded-t-3xl bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg'>
            <MusicPlayer />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
