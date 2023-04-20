import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import css from './index.module.css';
import Image from 'next/image';
import AVATAR_DEFAULT from '../../../../public/img/profile&cover-01.png';
import BANNER_DEFAULT from '../../../../public/img/profile&cover-02.png';

const Profile = () => {
  return (
    <div className={css['wrapper-profile']}>
      <div style={{ position: 'relative' }}>
        <div className={css['image-cover']}>
          <Image src={BANNER_DEFAULT} alt="" layout="fill" className={css['custome-img']} />
        </div>
        <div className={css['wrapper-avatar']}>
          <div className={css['avatar']}>
            <Image src={AVATAR_DEFAULT} alt="" width={210} height={210} />
          </div>
          <h2>User</h2>
          <Box width={['100%', '30%', '50%', '60%']}>
            <Text noOfLines={5}>
              Discover and own valuable NFTs from this unique collection. Exciting privileges await collectors!
              <Link href="/">
                <a style={{ marginLeft: 5, fontSize: 16, fontWeight: 400, color: '#5356FB' }}>Read More</a>
              </Link>
            </Text>
          </Box>
        </div>
        <div className={css['btn-right']}>
          <Link href="/profile">
            <a>Edit Profile</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
