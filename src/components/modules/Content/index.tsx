import React from 'react';
import { Box, Flex, HStack } from '@chakra-ui/react';
import SearchComponent from '../../elements/search/SearchComponent';
import { ButtonConnect } from '../ButtonConnect';

const Content = () => {
  return (
    <Box borderBottom="1px" borderBottomColor="chakra-border-color" mb="50px">
      <Flex align="center" justify="space-between" alignItems="center" pb="36px">
        <SearchComponent />
        <HStack spacing={{ base: '0', md: '6' }} className="viewDesktop">
          <Flex alignItems={'center'}>
            <HStack gap={'10px'}>
              <ButtonConnect />
            </HStack>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Content;
