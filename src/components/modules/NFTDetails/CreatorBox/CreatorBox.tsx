import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { getEllipsisTxt } from 'utils/format';
import styless from './CreatorBox.module.css';

interface CreatorBoxParams {
  name: string | undefined;
  ownerOf: string | undefined;
  creator: string | undefined;
  tokenId: string | number | undefined;
  address: string | undefined;
}

const CreatorBox = ({ name, creator }: CreatorBoxParams) => {
  return (
    <div className={styless.cardcreatorbox}>
      <div className={styless.content}>
        <div className={styless.viewArea}>
          <Row>
            <Col span={20}></Col>
          </Row>
        </div>
        <div
          style={{
            fontWeight: 'bold',
            textAlign: 'left',
            fontSize: '20px',
            color: '#000',
          }}
        >
          &ensp;Creator
        </div>
        <div className={styless.wrapperAvatar}>
          <Row>
            <Avatar src="/img/avatar.png" className={styless.avatar} size={60} />

            <div className={styless.inforAvatar} style={{ color: '#000', textAlign: 'left' }}>
              {/* <span style={{ fontWeight: 'bold' }}>{address === constants.NFT_ADDR ? 'Admin' : ''}</span> */}
              <br />
              <span>{getEllipsisTxt(creator ? creator : '')}</span>
            </div>
          </Row>
        </div>
        <div className={styless.accountName}>{name}</div>
        <div className={styless.accountTag}>
          <Row>
            <div className={styless.tag}>Collectible</div>
            <div className={styless.tag}>Painting</div>
            <div className={styless.tag}>Print</div>
            <div className={styless.tag}>Image</div>
          </Row>
        </div>
        <div className={styless.description}>
          <div style={{ fontWeight: 'bold' }}>Collection</div>
          <Row>
            <Avatar src="/img/author-details.png" className={styless.avatarCollection} size={60} />
            <div className={styless.infoBottom}>
              <div className={styless.titleCollection}>ThreeB</div>
              <p style={{ color: '#000' }}>ThreeB Marketplace</p>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CreatorBox;
