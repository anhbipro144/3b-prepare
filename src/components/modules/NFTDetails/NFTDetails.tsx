import { Col, Row } from 'antd';
import styless from './NFTDetails.module.css';
import React, { useEffect, useState } from 'react';
import { CreatorBox } from './CreatorBox';
import { ListedBox } from './ListedBox';
import { useRouter } from 'next/router';

import { NFTDetailsTypes } from './types';
import { ethers } from 'ethers';
import constants from '../../../../constants';
import { resolveIPFSByPublicGateway, resolveIPFSByPinata } from 'utils/resolveIPFS';
import { Image } from '@chakra-ui/react';

const NFTDetails = () => {
  const router = useRouter();

  const [nftData, setNFTData] = useState<NFTDetailsTypes>();
  const [price, setPrice] = useState<string | undefined>();
  const [item, setItem] = useState<string | undefined>();
  const routerArr = router ? router.query.nftdetails : [];
  const address = routerArr?.[0];
  const tokenId = routerArr?.[1];
  const marketPlace = new ethers.Contract(constants.MRKPLACE_ADDR, constants.MRKPLACE_ABI, constants.PROVIDER);

  async function getPrice() {
    try {
      const token = await marketPlace.fetchMarketItem(address, tokenId);
      const priceString = ethers.utils.formatEther(token.price);
      const itemId = await marketPlace.tokenToId(tokenId, address);
      setPrice(priceString);
      setItem(itemId.toString());
    } catch (e) {
      console.log('Error', e);
    }
  }

  useEffect(() => {
    if (address && tokenId) {
      fetch(
        `https://deep-index.moralis.io/api/v2/nft/${address}/${tokenId}?chain=bsc%20testnet&format=decimal&media_items=false`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': `${process.env.NEXT_PUBLIC_MORALIS_API_KEY}`,
          },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          setNFTData(data);
        });
    }
    getPrice();
  }, [address, tokenId]);

  let metadata = {};

  metadata = nftData?.metadata ? JSON.parse(nftData?.metadata) : {};

  const media1988Dragon = () => {
    let medURL: string | undefined;
    if (nftData?.token_address?.toLowerCase() === constants.NFT_ADDR.toLowerCase()) {
      medURL = resolveIPFSByPinata((metadata as { image?: string })?.image);
    } else {
      medURL = resolveIPFSByPublicGateway((metadata as { image?: string })?.image);
    }
    return medURL;
  };

  const MedHTML = () => {
    const typeMed = (metadata as { type?: string })?.type;
    if (typeMed?.includes('video')) {
      return (
        <video autoPlay style={{ height: '100%' }}>
          <source src={media1988Dragon()} type="video/mp4" />
        </video>
      );
    }
    if (typeMed?.includes('audio')) {
      return <audio src={media1988Dragon()}></audio>;
    }
    return <Image src={media1988Dragon()} alt={'nft'} minH="260px" minW="260px" boxSize="100%" objectFit="fill" />;
  };

  return (
    <div style={{ margin: '50px 0' }}>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} md={{ span: 24 }} xl={{ span: 12 }}>
          <div className={styless.cardimgbox}>
            <MedHTML />
          </div>
          <br />
          <div className={styless.cardbox}>
            <div className={styless.description} style={{ borderTop: 'solid 1px gray', fontFamily: 'none' }}>
              <p style={{ fontFamily: 'GILROY', color: '#000' }}>
                {metadata ? (metadata as { description?: string })?.description : ''}
              </p>
            </div>
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 24 }} xl={{ span: 12 }}>
          <CreatorBox
            name={metadata ? (metadata as { name?: string })?.name : ''}
            ownerOf={nftData?.owner_of}
            creator={nftData?.minter_address}
            address={address}
            tokenId={nftData?.token_id}
          />

          <ListedBox address={address} price={price} item={item} tokenAddress={nftData?.token_address} />
        </Col>
      </Row>
    </div>
  );
};

export default NFTDetails;
