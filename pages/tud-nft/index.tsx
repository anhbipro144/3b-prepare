import { Default } from 'components/layouts/Default';
import { NFTCollections } from 'components/templates/nft-collection';
import React from 'react';

import { COLLECTIONS } from '../../constants/CollectionsData/collections';

const TUDNFTPage = () => {
  return (
    <Default pageName="TUD NFT">
      <NFTCollections address="0xC846B9648a9681A3ECf8213e457E6d8c215c4ea3" collections={COLLECTIONS[4]} />
    </Default>
  );
};

export default TUDNFTPage;
