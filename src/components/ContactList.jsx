import React, { useState } from 'react';
import { useContacts } from '../context/ContactContext';
import { Button, Table, Spinner, Alert } from 'react-bootstrap';
import { Eye,Filter, Pencil, Trash, PlusCircle } from 'react-bootstrap-icons';

import ContactFormModal from './ContactFormModal';
import ContactViewModal from './ContactViewModal';
import FilterDropdown from './FilterDropdown';
import SearchInput from './SearchInput';

const ContactList = () => {
  const {
    contacts,
    loading,
    error,
    deleteContact,
    searchContacts,
    filterContacts
  } = useContacts();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('default');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Handlers
  const handleView = (contact) => {
    setSelectedContact(contact);
    setShowViewModal(true);
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
      } catch {
        alert('Failed to delete contact');
      }
    }
  };

  // Search & Filter
  const searchedContacts = searchContacts(searchTerm);
  const filteredContacts = filterContacts(searchedContacts, filterType);

  // Loading
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading contacts...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        {error}
      </Alert>
    );
  }

  return (
    <main className="py-5">
      <div className="container">
        <div className="card shadow-sm">

          {/* Header */}
          <div className="card-header bg-primary text-white">
            <div className="d-flex align-items-center justify-content-between gap-2">
              <h4 className="mb-0 flex-shrink-0 ">All Contacts</h4>

               {/* Search */}
    <div className="flex-grow-1 mx-5">
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>

              <Button
                variant="success"
                className="flex-shrink-4"
                onClick={() => setShowAddModal(true)}
              >
                <PlusCircle className="me-1" />
                Add New
              </Button>
            </div>
          </div>
          {/* Filter Title */}
<div className="d-flex justify-content-start align-items-center">
  <Filter className="me-3 text-success" />
  <h1>Filter</h1>
</div>

          {/* Filter */}
          <div className=" d-flex justify-content-end">
            <FilterDropdown
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </div>

          {/* Table */}
          <div className="card-body">
            {filteredContacts.length === 0 ? (
              <div className="text-center py-5">
                <h5 className="text-muted">No Contact Information</h5>
                <p className="text-muted">
                  {contacts.length === 0
                    ? 'No contacts available. Add your first contact!'
                    : 'No contacts found matching your search.'}
                </p>
              </div>
            ) : (
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact, index) => (
                    <tr key={contact.id}>
                      <td>{index + 1}</td>
                      <td>{contact.firstName}</td>
                      <td>{contact.lastName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="me-1"
                          onClick={() => handleView(contact)}
                        >
                          <Eye />
                        </Button>

                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-1"
                          onClick={() => handleEdit(contact)}
                        >
                          <Pencil />
                        </Button>

                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(contact.id)}
                        >
                          <Trash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ContactFormModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        mode="add"
      />

      <ContactViewModal
        show={showViewModal}
        handleClose={() => setShowViewModal(false)}
        contact={selectedContact}
        onEdit={() => {
          setShowViewModal(false);
          setShowEditModal(true);
        }}
      />

      <ContactFormModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        mode="edit"
        contact={selectedContact}
      />
    </main>
  );
};

export default ContactList;
