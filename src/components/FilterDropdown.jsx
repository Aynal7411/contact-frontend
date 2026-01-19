import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Filter } from 'react-bootstrap-icons';

const FilterDropdown = ({ filterType, setFilterType }) => {
  return (
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
  );
};

export default FilterDropdown;
