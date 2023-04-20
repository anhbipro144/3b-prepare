import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { getEllipsisTxt } from 'utils/format';
import styless from './ListedBox.module.css';
import { useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import constants from '../../../../../constants';
import { failureModal, successModal } from '../../../../../helpers/modal';
import { useRouter } from 'next/router';
import { getExplorer } from '../../../../../helpers/networks';
import Image from 'next/image';

interface ListedBoxParams {
  address: string | undefined;
  price: string | undefined;
  item: string | undefined;
  tokenAddress: string | undefined;
}

const ListedBox = ({ address, price, item, tokenAddress }: ListedBoxParams) => {
  const { data: signer } = useSigner();
  const router = useRouter();
  const [loadingBuy, setLoadingBuy] = useState<boolean>(false);
  const [transferPrice, setTransferPrice] = useState<BigNumber>();

  const { config } = usePrepareContractWrite({
    address: '0x08b749d12c8d4b9C9ECBbe166A9bCf324f793dd6',
    abi: constants.MRKPLACE_ABI,
    functionName: 'createMarketSale',
    args: [address, item, { value: transferPrice }],
    onSettled(data, error) {
      console.log('Settled', { data, error });
    },
  });
  const { write, isSuccess, status } = useContractWrite(config);

  useEffect(() => {
    if (price !== '' && typeof price === 'string') {
      const Price = ethers.utils.parseEther(price);
      setTransferPrice(Price);
    }
  }, [price]);

  useEffect(() => {
    console.log(status);

    if (isSuccess) {
      setLoadingBuy(false);
      successModal();
      router.push('/my-collection/nft');
    }
  }, [isSuccess, status]);

  const buyItem = async () => {
    if (signer) {
      try {
        setLoadingBuy(true);

        const createSale = write?.();
        console.log(createSale);
      } catch (e) {
        setLoadingBuy(false);
        console.log('Error', e);
      }
    } else {
      failureModal('Error', 'Please connect your wallet first');
    }
  };

  const txHash = `${getExplorer(constants.CHAIN.bscChain.id)}address/${tokenAddress}`;
  return (
    <div className={styless.cardListedbox}>
      <div className={styless.description}>
        Contract by:
        <a className={styless.viewAddress} style={{ color: '#000', fontWeight: 'bold', marginLeft: '10px' }}>
          {getEllipsisTxt(address ? address : '')}
        </a>
      </div>
      <div className={styless.prices}>
        <Image src="/images/BnbPrice.png" width={30} height={30} />
        <span style={{ marginLeft: '15px' }}>
          {price === '0.0' ? '--' : price} <span style={{ fontSize: '50%' }}>BNB</span>
        </span>
      </div>
      <div className={styless.content}>
        <Row justify="space-between" gutter={16}>
          <Col span={12}>
            <Button
              className={styless.exploreBtn}
              style={{ marginTop: '10px' }}
              disabled={price === '0.0'}
              onClick={() => {
                window.open(txHash, '_blank');
              }}
            >
              <span>Trx Info</span>
            </Button>
          </Col>
          <Col span={12}>
            <Button
              className={styless.btnInfo}
              style={{
                fontFamily: 'GILROY',
                fontWeight: 700,
                marginTop: '10px',
              }}
              onClick={buyItem}
              loading={loadingBuy}
            >
              <span>Buy</span>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ListedBox;
