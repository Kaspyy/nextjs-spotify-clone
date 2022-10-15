import Layout from 'components/Layout';
import Discover from './discover';
import { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Discover />
    </>
  );
};

Page.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Page;
