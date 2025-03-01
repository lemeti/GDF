import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function NavigationBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };  

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/">G-D FOODS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-responsive" />
        <Navbar.Collapse id="navbar-responsive">
          <Form className="d-flex me-auto" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Rechercher un plat..."
              className="me-2"
              aria-label="Rechercher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-light" type="submit">Rechercher</Button>
          </Form>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
            <Nav.Link as={Link} to="/reservation">Réservation</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <div className="ms-auto">
            {!isAuthenticated ? (
              <>
                <Button variant="outline-light" className="me-2" as={Link} to="/login">Se connecter</Button>
                <Button variant="light" as={Link} to="/sign-up">S'inscrire</Button>
              </>
            ) : (
              <NavDropdown title={user.name} align="end" className="text-light">
                <NavDropdown.Item as={Link} to="/profile">Profil</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/commande">Mes commandes</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} as={Link} to="/">Déconnexion</NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
