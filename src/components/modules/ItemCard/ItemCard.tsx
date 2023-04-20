/* eslint-env browser */

import { Box, Image, useColorModeValue } from '@chakra-ui/react';
import { EvmNft } from '@moralisweb3/common-evm-utils';
import { ethers } from 'ethers';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { resolveIPFSByPinata, resolveIPFSByPublicGateway } from 'utils/resolveIPFS';
import constants from '../../../../constants';
import { useRouter } from 'next/router';
import css from './ItemCard.module.css';
import { getEllipsisTxt } from 'utils/format';

export interface ItemCardParams {
  nft: EvmNft;
}

const ItemCard: FC<ItemCardParams> = ({ nft: { tokenAddress, result, metadata } }) => {
  const bgColor = useColorModeValue('#555', 'gray.700');
  const marketplace = new ethers.Contract(constants.MRKPLACE_ADDR, constants.MRKPLACE_ABI, constants.PROVIDER);
  const [price, setPrice] = useState<string>('1');

  const router = useRouter();

  async function getPrice() {
    const tokenPrice = await marketplace.fetchMarketItem(tokenAddress.format(), result.tokenId);
    const priceString = ethers.utils.formatEther(tokenPrice.price);
    setPrice(priceString);
  }

  useEffect(() => {
    getPrice();
  }, [tokenAddress]);

  const media1988Dragon = () => {
    let medURL: string | undefined;
    if (tokenAddress.lowercase === constants.NFT_ADDR.toLowerCase()) {
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
        <video autoPlay style={{ height: '266px', width: 332 }}>
          <source src={media1988Dragon()} type="video/mp4" />
        </video>
      );
    }
    if (typeMed?.includes('audio')) {
      return <audio src={media1988Dragon()}></audio>;
    }
    return (
      <Image
        src={media1988Dragon()}
        alt={'nft'}
        minH="236px"
        minW="332px"
        boxSize="100%"
        objectFit="cover"
        style={{ borderRadius: 12 }}
      />
    );
  };

  const redirectNFTDetail = async () => {
    router.push(`/nft/${tokenAddress.format()}/${result.tokenId}`);
  };

  return (
    <Box
      width="372px"
      bgColor={bgColor}
      padding={3}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="#1E1E1E"
      height="426px"
      display="flex"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      <div className={css['featured-card1']}>
        <div className={css['featured-content']}>
          <div className={css['meta']} style={{ marginBottom: '16px' }}>
            <div className={css['author']}>
              <img src="/img/profile&cover-01.png" alt="author" />
              {/* <p style={{ color: `${color1}` }}>{getEllipsisTxt(tokenAddress.format())}</p> */}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>Owned by</span>
              <span style={{ color: 'white' }}>{getEllipsisTxt(result.tokenAddress.checksum)}</span>
            </div>
          </div>
        </div>
        <div className={css['featured-img']}>
          {/* <img src="/img/BNBToken.svg" className="bnb-img" alt="BNB" style={{ top: '23%', left: '8%' }} /> */}
          <span
            style={{
              position: 'absolute',
              top: '22%',
              left: '10%',
              padding: '1px 10px',
              backgroundColor: '#F2994A',
              borderRadius: 61,
              color: 'white',
              fontSize: 10,
            }}
          >
            Active
          </span>
          <MedHTML />
          <div className={css['card-overlay']}>
            <Link href={`/nft/${tokenAddress.format()}/${result.tokenId}`}>
              <a className="eg-btn btn--fill-white">View Details</a>
            </Link>
          </div>
        </div>
        <h5 style={{ margin: '9px 0 19px 0', fontWeight: 700, color: 'white' }}>
          {(result?.metadata as { name: string })?.name}
        </h5>
        <div className={css['featured-card-bttm']}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Image width={42} height={42} src="/icons/buttonfootercard.png" />
            <h5 style={{ color: 'white', fontWeight: 700 }}>{price} BNB </h5>
          </div>
          <button className={css['bottom-footer-card']} onClick={redirectNFTDetail}>
            <span>Buy</span>
          </button>
        </div>
      </div>
    </Box>
  );
};

export default ItemCard;
