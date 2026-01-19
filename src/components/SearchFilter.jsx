import React from 'react';
import { InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import { Search, Filter } from 'react-bootstrap-icons';

const SearchFilter = ({ searchTerm, setSearchTerm, filterType, setFilterType }) => {
  return (
    <div className="d-flex align-items-center gap-3">
      {/* Search Input */}
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

       <div className="mt-2 w-25">
      {/* Filter Dropdown */}
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" className='d-flex align-items-center justify-content-between p-3'>
          <Filter className="me-2" />
          Filter
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
          <Dropdown.Item 
            active={filterType === 'default'} 
            onClick={() => setFilterType('default')}
          >
            Default
          </Dropdown.Item>
          <Dropdown.Item 
            active={filterType === 'firstName'} 
            onClick={() => setFilterType('firstName')}
          >
            First Name (A → Z)
          </Dropdown.Item>
          <Dropdown.Item 
            active={filterType === 'lastName'} 
            onClick={() => setFilterType('lastName')}
          >
            Last Name (A → Z)
          </Dropdown.Item>
          <Dropdown.Item 
            active={filterType === 'oldest'} 
            onClick={() => setFilterType('oldest')}
          >
            Oldest To First
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>
    </div>
  );
};

export default SearchFilter;