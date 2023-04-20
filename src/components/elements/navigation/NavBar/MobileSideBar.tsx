import { Flex, FlexProps, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ButtonConnect } from 'components/modules/ButtonConnect';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      padding="0 10px"
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<FiMenu />}
          style={{ marginRight: '10px' }}
        />
        <Link href={'/'}>
          <Image src="/logo_ThreeB.svg" alt="asd" width={120} height={60} />
        </Link>
      </div>
      <div>
        <ButtonConnect />
      </div>
    </Flex>
  );
};

export default MobileNav;
