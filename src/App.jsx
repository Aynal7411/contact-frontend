import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { ContactProvider } from './context/ContactContext';
import ContactList from './components/ContactList';


function App() {
  return (
    <ContactProvider>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container">
            <a className="navbar-brand text-uppercase fw-bold" href="#">
              <span className="text-primary">Contact</span> App
            </a>
          </div>
        </nav>
        
        {/* Main Content */}
        <ContactList />
      </div>
    </ContactProvider>
  );
}

export default App;