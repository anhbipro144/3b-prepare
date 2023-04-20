import { Default } from 'components/layouts/Default';
import { NFTCollections } from 'components/templates/nft-collection';
import React from 'react';
import { COLLECTIONS } from '../../constants/CollectionsData/collections';

const SpaceCartelsPage = () => {
  return (
    <Default pageName="PGNFT CLUB ">
      <NFTCollections address="0x52f3787922FbB27A0087e4C70029bFa32C75fE9E" collections={COLLECTIONS[3]} />
    </Default>
  );
};

export default SpaceCartelsPage;
