import React, { useState } from 'react';
import { Modal, Button, Table, Alert } from 'react-bootstrap';
import { Pencil, Trash, Envelope, Telephone } from 'react-bootstrap-icons';
import { useContacts } from '../context/ContactContext';

const ContactViewModal = ({ show, handleClose, contact, onEdit }) => {
  const { deleteContact } = useContacts();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setDeleting(true);
      setError('');
      
      try {
        await deleteContact(contact.id);
        handleClose();
      } catch (err) {
        setError('Failed to delete contact. Please try again.');
      } finally {
        setDeleting(false);
      }
    }
  };

  if (!contact) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {error && (
          <Alert variant="danger">{error}</Alert>
        )}
        
        <Table borderless responsive>
          <tbody>
            <tr>
              <th className="w-25">First Name:</th>
              <td>{contact.firstName}</td>
            </tr>
            <tr>
              <th>Last Name:</th>
              <td>{contact.lastName}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>
                <a href={`mailto:${contact.email}`} className="text-decoration-none">
                  <Envelope className="me-2" />
                  {contact.email}
                </a>
              </td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td>
                <a href={`tel:${contact.phone}`} className="text-decoration-none">
                  <Telephone className="me-2" />
                  {contact.phone}
                </a>
              </td>
            </tr>
            {contact.address && (
              <tr>
                <th>Address:</th>
                <td>{contact.address}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button 
          variant="danger" 
          onClick={handleDelete} 
          disabled={deleting}
        >
          {deleting ? 'Deleting...' : (
            <>
              <Trash className="me-1" />
              Delete
            </>
          )}
        </Button>
        <Button variant="primary" onClick={onEdit}>
          <Pencil className="me-1" />
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactViewModal;