import { Default } from 'components/layouts/Default';
import { NFTCollections } from 'components/templates/nft-collection';
import React from 'react';
import { COLLECTIONS } from '../../constants/CollectionsData/collections';

const HeroesAndEmpiresHeroesPage = () => {
  return (
    <Default pageName="Heroes & Empires Heroes">
      <NFTCollections address="0x4cd0Ce1d5e10afbCAa565a0FE2A810eF0eB9B7E2" collections={COLLECTIONS[5]} />
    </Default>
  );
};

export default HeroesAndEmpiresHeroesPage;
