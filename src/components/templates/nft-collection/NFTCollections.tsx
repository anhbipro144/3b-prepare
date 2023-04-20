import Link from 'next/link';

import { FC, useEffect, useState } from 'react';

import { Image, useColorModeValue } from '@chakra-ui/react';

import { Card, Row, Col, Avatar } from 'antd';
import { COLLECTIONS } from '../../../../constants/CollectionsData/collections';
import { resolveIPFSByPublicGateway } from 'utils/resolveIPFS';

const { Meta } = Card;

interface NFTMetadata {
  name: string;
  token_id: string;
  description: string;
  image: string;
  price: string;
  normalized_metadata: any;
  token_address: string;
}

interface IParamsNFTCollections {
  address: string;
  collections: any;
}

const NFTCollections: FC<IParamsNFTCollections> = ({ address, collections }) => {
  const color1 = useColorModeValue('#000', '#fff');
  const color = useColorModeValue('#fff', '#000');
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    fetch(
      `https://deep-index.moralis.io/api/v2/nft/${address}?chain=bsc&format=decimal&media_items=false&normalizeMetadata=true`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': `${process.env.NEXT_PUBLIC_MORALIS_API_KEY}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => setNFTs(data.result));
  }, []);

  return (
    <div className="metaportal_fn_mintpage">
      <div className="container small">
        <div className="metaportal_fn_mint_top">
          <div className="mint_left">
            <div className="img">
              <div className="img_in" style={{ backgroundImage: `url(${collections && collections.images[0].image})` }}>
                <Image width={500} height={500} src="./images/cosmic.webp" alt="" />
              </div>
            </div>
          </div>
          <div className="mint_right">
            <div className="metaportal_fn_breadcrumbs">
              <p>
                <Link href="/">
                  <a style={{ color: `${color1}` }}>Home</a>
                </Link>
                <span className="separator">/</span>
                <Link href="/collection">
                  <a style={{ color: `${color1}` }}>Collection</a>
                </Link>
                <span className="separator">/</span>
                <span style={{ color: `${color1}` }} className="current">
                  {collections && collections.title}
                </span>
              </p>
            </div>
            <h3
              style={{ color: `${color1}` }}
              className="fn__maintitle"
              data-text={COLLECTIONS[1] && COLLECTIONS[1].title}
              data-align="left"
            >
              {collections && collections.title}
            </h3>
            <div className="desc">
              <p style={{ color: `${color1}` }}>{collections.descriptions}</p>
            </div>
          </div>
        </div>

        <div className="metaportal_fn_mintbox">
          <div className="mint_right">
            <Card
              hoverable
              cover={<Image className="imageBox" width={600} height={425} alt="example" src="./box.gif" />}
            ></Card>
          </div>
          <div className="mint_left">
            <div className="mint_title">
              <span style={{ color: `${color}` }}>Public Mint is Live</span>
            </div>
            <div className="mint_list">
              <ul>
                <li>
                  <div className="item">
                    <h4 style={{ color: `${color1}` }}>Price</h4>
                    <div className="price-sec">
                      <span>1</span>
                      <select style={{ border: 'none' }}>
                        <option value="BNB">BNB</option>
                        <option value="BUSD">BUSD</option>
                        <option value="USDT">USDT</option>
                      </select>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <h4 style={{ color: `${color1}` }}>Remaining</h4>
                    <h3 style={{ color: `${color1}` }}>999/9,999</h3>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <h4 style={{ color: `${color1}` }}>Quantity</h4>
                    <div className="qnt">
                      <span className="decrease">-</span>
                      <input
                        style={{
                          margin: '0 10px',
                          textAlign: 'center',
                          border: `1px solid transparent`,
                          height: '30px',
                          minWidth: 'unset',
                          color: `${color1}`,
                        }}
                        className="inputQuantity"
                        type="number"
                        pattern="[0-9]*"
                        min={0}
                      />

                      <span className="increase">+</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <h4 style={{ color: `${color1}` }}>Total Price</h4>
                    <h3>
                      <span style={{ color: `${color1}` }} className="total_price"></span>
                      <span style={{ color: `${color1}` }}> + GAS</span>
                    </h3>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mint_desc" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="metaportal_fn_button"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span style={{ color: `${color1}`, margin: '0 10px' }}>UNBOX</span>
              </button>
              <p style={{ color: `${color1}`, marginTop: '0', marginLeft: '20px' }}>
                By clicking UNBOX button, you agree to our{' '}
                <a style={{ color: `${color1}` }} href="#">
                  Terms of Service
                </a>{' '}
                and our{' '}
                <a style={{ color: `${color1}` }} href="#">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        {/* <div className="rightBlock">
          <div>
            <Select
              showSearch
              style={{
                width: 200,
                marginTop: 4,
              }}
              className="filter-sec"
              optionFilterProp="children"
              defaultValue={FilterType.ALL}
              onChange={(value) => setFilterType(value)}
              options={[
                {
                  value: FilterType.ALL,
                  label: 'All Types',
                },
                {
                  value: FilterType.LERMER,
                  label: 'Lermer Dragon',
                },
                {
                  value: FilterType.COOL,
                  label: 'Cool Dragon',
                },
                {
                  value: FilterType.NGER,
                  label: 'Nger Dragon',
                },
              ]}
            />
            <Select
              showSearch
              style={{
                width: 200,
                marginTop: 4,
              }}
              className="filter-sec"
              optionFilterProp="children"
              defaultValue={SortType.DEFAULT}
              onChange={(value) => setSortType(value)}
              options={[
                {
                  value: SortType.DEFAULT,
                  label: 'Order Default',
                },
                {
                  value: SortType.HIGHEST_PRICE,
                  label: 'Highest fixed price',
                },
                {
                  value: SortType.LOWEST_PRICE,
                  label: 'Lowest fixed price',
                },
              ]}
            />
          </div>
        </div> */}

        <div className="nft">
          <Row gutter={[16, 16]} className="boxNFTs">
            {nfts?.map((obj: NFTMetadata) => {
              console.log(obj.normalized_metadata.image);
              return (
                <Col span={6} key={obj.token_id}>
                  <Card
                    hoverable
                    style={{
                      position: 'relative',
                      width: 280,
                    }}
                    cover={
                      <Image
                        width={280}
                        height={280}
                        alt="example"
                        src={
                          obj?.normalized_metadata?.image && obj?.normalized_metadata?.image.includes('http')
                            ? obj.normalized_metadata.image
                            : resolveIPFSByPublicGateway(obj.normalized_metadata.image)
                        }
                        loading="lazy"
                      />
                    }
                  >
                    <Meta avatar={<Avatar src={collections.images[0].image} />} title={obj.name}></Meta>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
        <div className="metaportal_fn_similar">
          <h3 className="fn__maintitle" data-text="Feature Items">
            Feature Items
          </h3>

          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          <div className="metaportal_fn_drops">
            <ul className="grid">
              {COLLECTIONS &&
                COLLECTIONS.map(
                  (nft) =>
                    nft.id < 8 && (
                      <li key={nft.id}>
                        <div className="nft__item">
                          <div className="img_holder">
                            {nft.images.map((item) => (
                              <Image width={350} height={350} src={item.image} alt="" />
                            ))}

                            <Link href={`/${nft.link}`}>
                              <a className="full_link"></a>
                            </Link>
                          </div>
                          <div className="title_holder">
                            <h3 className="fn_title">
                              <a style={{ color: `${color1}` }} href="#">
                                {nft.title}
                              </a>
                            </h3>
                          </div>
                        </div>
                      </li>
                    ),
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCollections;
