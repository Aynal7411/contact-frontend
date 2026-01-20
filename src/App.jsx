import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { ContactProvider } from './context/ContactContext';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  return (
    <ContactProvider>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container">
            <a className="navbar-brand text-uppercase fw-bold" href="#">
             <h1 className="h5 m-0 text-danger">
  <strong>CONTACT APP</strong>
</h1>
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