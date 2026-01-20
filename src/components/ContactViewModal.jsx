import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ContactViewModal = ({ show, onHide, contact, onEdit, onDelete }) => {
  if (!contact) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone:</strong> {contact.phone}</p>
        {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onHide()}>
          Cancel
        </Button>
        <Button variant="warning" onClick={() => onEdit()}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(contact.id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactViewModal;
