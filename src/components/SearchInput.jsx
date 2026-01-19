import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <InputGroup>
      <InputGroup.Text>
        <Search />
      </InputGroup.Text>
      <FormControl
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchInput;
