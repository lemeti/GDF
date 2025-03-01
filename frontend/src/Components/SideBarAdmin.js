import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SideBarAdmin() {
  return (
    <div className="d-flex flex-column" style={{ width: '250px', height: '100vh', backgroundColor: '#343a40' }}>
      <Container className="px-0">
        <Nav className="flex-column text-light py-3">
          <Nav.Link as={Link} to="/" className="text-light">Home</Nav.Link>
          <Nav.Link as={Link} to="/Adminstat" className="text-light">Statistiques</Nav.Link>
          <Nav.Link as={Link} to="/Adminuser" className="text-light">Gestion des utilisateurs</Nav.Link>
          <Nav.Link as={Link} to="/Adminmenu" className="text-light">Gestion des menus</Nav.Link>
          <Nav.Link as={Link} to="/Adminres" className="text-light">Gestion des réservations</Nav.Link>
          <Nav.Link as={Link} to="/Admincom" className="text-light">Gestion des commandes</Nav.Link>
        </Nav>
      </Container>
    </div>
  );
}

export default SideBarAdmin;
