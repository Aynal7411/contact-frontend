import React from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

const SearchFilter = ({ searchTerm, setSearchTerm, filterType, setFilterType }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      {/* Search Input */}
      <InputGroup>
        <FormControl
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Search Button */}
      <Button 
        variant="secondary"
        style={{ minWidth: '80px' }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchFilter;
