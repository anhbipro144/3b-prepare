import { Input, InputGroup } from '@chakra-ui/react';
import React from 'react';
import css from './index.module.css';
const SearchComponent = () => {
  return (
    <div className={css['search']}>
      <InputGroup className={css['wrapper-input-header']}>
        <Input placeholder="Search items , collections...." variant="unstyled" />
      </InputGroup>
    </div>
  );
};

export default SearchComponent;
