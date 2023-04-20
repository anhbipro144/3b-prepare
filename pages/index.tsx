import { Default } from 'components/layouts/Default';
import Marketplace from 'components/templates/Marketplace/Marketplace';

import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Default pageName="Home">
      <Marketplace />
    </Default>
  );
};

export default HomePage;
