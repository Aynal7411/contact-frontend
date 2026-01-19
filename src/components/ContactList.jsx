import React, { useState } from 'react';
import { useContacts } from '../context/ContactContext';
import { Button, Table, Spinner, Alert } from 'react-bootstrap';
import { Eye, Pencil, Trash, PlusCircle } from 'react-bootstrap-icons';
import ContactFormModal from './ContactFormModal';
import ContactViewModal from './ContactViewModal';
import SearchFilter from './SearchFilter';

const ContactList = () => {
  const { contacts, loading, error, deleteContact } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('default');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Handle view contact
  const handleView = (contact) => {
    setSelectedContact(contact);
    setShowViewModal(true);
  };

  // Handle edit contact
  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  // Handle delete contact
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
      } catch (err) {
        alert('Failed to delete contact');
      }
    }
  };

  // Handle search and filter
  const { searchContacts, filterContacts } = useContacts();
  const searchedContacts = searchContacts(searchTerm);
  const filteredContacts = filterContacts(searchedContacts, filterType);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading contacts...</p>
      </div>
    );
  }

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
        <div className="row">
          <div className="col-md-12">
            <div className="card ">
              {/* Header with Search and Add Button */}
              <div className="card-header card-title bg-gray text-white">
                <div className="d-flex align-items-center justify-content-between">
                  <h2>All Contacts</h2>
                  
                  <SearchFilter 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterType={filterType}
                    setFilterType={setFilterType}
                  />
                  
                  <div>
                    <Button 
                      variant="success" 
                      onClick={() => setShowAddModal(true)}
                      className='btn-circle'
                    >
                      <PlusCircle  className="me-1" />
                      Add New
                    </Button>
                  </div>
                </div>
              </div>
  
              {/* Contact Table */}
              <div className="card-body">
                {filteredContacts.length === 0 ? (
                  <div className="text-center py-5">
                    <h4 className="text-muted">No Contact Information</h4>
                    <p className="text-muted">
                      {contacts.length === 0 
                        ? "No contacts available. Add your first contact!" 
                        : "No contacts found matching your search."}
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
                              title="Show"
                            >
                              <Eye />
                            </Button>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className="me-1"
                              onClick={() => handleEdit(contact)}
                              title="Edit"
                            >
                              <Pencil />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(contact.id)}
                              title="Delete"
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