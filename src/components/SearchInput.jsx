import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <InputGroup className="mb-3 shadow-sm">
      <FormControl
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-end-0"
      />
      <Button variant="success" className="border-start-0">
        <Search />
      </Button>
    </InputGroup>
  );
};

export default SearchInput;
