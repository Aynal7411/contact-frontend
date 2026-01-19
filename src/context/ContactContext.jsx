import React, { createContext, useState, useContext, useEffect } from 'react';
import contactService from '../services/contactService';

const ContactContext = createContext();

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all contacts
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await contactService.getAll();
      setContacts(data);
      setError(null);
    } catch (err) {
        setError('Failed to load contacts');
        console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new contact
  const addContact = async (contactData) => {
    try {
      const newContact = await contactService.create(contactData);
      setContacts([...contacts, newContact]);
      return newContact;
    } catch (err) {
      setError('Failed to add contact');
      throw err;
    }
  };

  // Update contact
  const updateContact = async (id, contactData) => {
    try {
      const updatedContact = await contactService.update(id, contactData);
      setContacts(contacts.map(contact => 
        contact.id === id ? updatedContact : contact
      ));
      return updatedContact;
    } catch (err) {
      setError('Failed to update contact');
      throw err;
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await contactService.delete(id);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (err) {
      setError('Failed to delete contact');
      throw err;
    }
  };

  // Search contacts
  const searchContacts = (searchTerm) => {
    if (!searchTerm.trim()) return contacts;
    
    return contacts.filter(contact => 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
    );
  };

  // Filter contacts
  const filterContacts = (contactsToFilter, filterType) => {
    const sorted = [...contactsToFilter];
    
    switch(filterType) {
      case 'firstName':
        return sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
      case 'lastName':
        return sorted.sort((a, b) => a.lastName.localeCompare(b.lastName));
      case 'oldest':
        return sorted.sort((a, b) => a.id - b.id);
      default:
        return sorted;
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const value = {
    contacts,
    loading,
    error,
    fetchContacts,
    addContact,
    updateContact,
    deleteContact,
    searchContacts,
    filterContacts
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};