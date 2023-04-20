import { Default } from 'components/layouts/Default';
import { NFTCollections } from 'components/templates/nft-collection';
import React from 'react';
import { COLLECTIONS } from '../../constants/CollectionsData/collections';

const YuliOriginGenOnePage = () => {
  return (
    <Default pageName="YuliOriginGenOne">
      <NFTCollections address="0x35017D8322dc1fAb2156D6799F7144393b6EA605" collections={COLLECTIONS[2]} />
    </Default>
  );
};

export default YuliOriginGenOnePage;
