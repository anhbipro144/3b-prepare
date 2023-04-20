import { Default } from 'components/layouts/Default';
import { NFTCollections } from 'components/templates/nft-collection';
import { COLLECTIONS } from '../../constants/CollectionsData/collections';
import React from 'react';

const CosmicPage = () => {
  return (
    <Default pageName="Cosmic">
      <NFTCollections address="0xB3E3a5211f81f0c5eCfAcacFc5027eD628fE7011" collections={COLLECTIONS[0]} />
    </Default>
  );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  let nfts: any = [];
  try {
    const response = await fetch(
      `https://deep-index.moralis.io/api/v2/nft/0xB3E3a5211f81f0c5eCfAcacFc5027eD628fE7011?chain=bsc&format=decimal&media_items=false&normalizeMetadata=true`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': `${process.env.MORALIS_API_KEY}`,
        },
      },
    );
    if (!response.ok) {
      console.log("Can't fetch cosmic collection");
    }
    const data = await response.json();
    nfts = data.result ? data.result : [];
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      nfts,
    },
  };
};

export default CosmicPage;
