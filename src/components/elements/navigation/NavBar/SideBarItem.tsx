import { Flex, FlexProps } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface NavItemProps extends FlexProps {
  src: string;
  children: React.ReactNode;
  path: string;
}

const NavItem = ({ src, children, path, ...rest }: NavItemProps) => {
  return (
    <Link href={path} style={{ textDecoration: 'none' }}>
      <Flex align="center" borderRadius="lg" role="group" cursor="pointer" my="20px" {...rest}>
        {src && <Image src={src} width={32} height={32} />}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
