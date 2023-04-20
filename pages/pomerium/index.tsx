import { Default } from 'components/layouts/Default';
import React from 'react';
import { NFTCollections } from 'components/templates/nft-collection';
import { COLLECTIONS } from '../../constants/CollectionsData/collections';

const PomeriumPage = () => {
  console.log(COLLECTIONS[2]);
  return (
    <Default pageName="Pomerium">
      <NFTCollections address={'0x119aaf82f1f3784233Dd3f8e914f8C16527c3A4B'} collections={COLLECTIONS[1]} />
    </Default>
  );
};

export default PomeriumPage;
