/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable etc/no-commented-out-code */
import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { ItemCard } from 'components/modules';
import { Col, Input, Row, Select, Space } from 'antd';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import constants from '../../../../constants';
import { useEffect, useState } from 'react';
import { EvmNft } from 'moralis/common-evm-utils';
import css from './index.module.css';
import React from 'react';
import { Home } from '../home';

enum EStatus {
  EXPLORE = 0,
  Featured,
}

const Marketplace = () => {
  // const { Search } = Input;
  const color1 = useColorModeValue('#000', '#fff');
  const [toggle, setToggle] = React.useState<EStatus>(EStatus.Featured);
  const { data: items } = useEvmWalletNFTs({
    address: constants.MRKPLACE_ADDR,
    chain: constants.CHAIN.bscChain.id,
  });
  const [collectionItems, setCollectionItems] = useState<EvmNft[] | undefined>([]);
  const dragonAddress = '0x98331decd9de4b3261c00068057ce5c3a8de7e04' as string;
  const filterHandle = (e: any) => {
    if (e.currentTarget.value) {
      setCollectionItems(
        collectionItems?.filter((item) => item?.result.tokenId.toString().includes(e.currentTarget.value)),
      );
    } else {
      setCollectionItems(items?.filter((item) => item?.tokenAddress.format() !== dragonAddress));
    }
  };
  useEffect(() => {
    setCollectionItems(items?.filter((item) => item?.tokenAddress.format() !== dragonAddress));
  }, [items]);

  const styleBtnLeft =
    toggle === EStatus.EXPLORE
      ? {
          color: '#F539F8',
          borderBottom: '1px solid',
        }
      : undefined;
  const styleBtnRight =
    toggle === EStatus.Featured
      ? {
          color: '#F539F8',
          borderBottom: '1px solid',
        }
      : undefined;
  return (
    <div className="metaportal_fn_mintpage">
      <div className={css['wrapper-header-content']}>
        <div className={css['header-content']}>
          <div className={css['leftBlock']}>
            <button onClick={() => setToggle(EStatus.Featured)} style={styleBtnRight}>
              Featured Collection
            </button>
            <button onClick={() => setToggle(EStatus.EXPLORE)} style={styleBtnLeft}>
              Explore
            </button>
          </div>
          <div className={css['rightBlock']}>
            <div style={{ borderRight: '1px solid #37455799', paddingRight: 5 }}>
              <Space style={{ height: 15, display: 'flex', alignItems: 'center' }}>
                {/* <Search placeholder="Search Token ID" allowClear size="small" onChange={filterHandle} /> */}
              </Space>
            </div>
            <div style={{ paddingLeft: 5 }}>
              {/* <Select
                showSearch
                style={{
                  width: 200,
                  backgroundColor: 'transparent',
                }}
                className="filter-sec"
                placeholder="All Categories"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: '1',
                    label: 'Lowest total price',
                  },
                  {
                    value: '2',
                    label: 'Highest total price',
                  },
                  {
                    value: '3',
                    label: 'Lowest fixed price',
                  },
                  {
                    value: '4',
                    label: 'Highest fixed price',
                  },
                ]}
              /> */}
            </div>
          </div>
        </div>
        <div className="nft">
          {toggle === EStatus.EXPLORE ? (
            // <Grid templateColumns="repeat(auto-fill, 400px)" rowGap={5} justifyItems="center">
            <Row gutter={[16, 16]} className={css.boxListCard}>
              {collectionItems ? (
                collectionItems.map((item, key) => (
                  <Col span={8} key={key}>
                    <ItemCard nft={item} />
                  </Col>
                ))
              ) : (
                <p style={{ color: `${color1}` }}>No NFT</p>
              )}
            </Row>
          ) : (
            // </Grid>
            <Home />
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
