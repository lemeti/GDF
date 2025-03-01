import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons'; 
import { faPhone, faEnvelope, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './Footer.css'; // Importer le fichier CSS

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false); // Ajout d'un état pour vérifier l'abonnement

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Veuillez entrer une adresse email valide.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/subscribe', { email });
      if (response.status === 200) {
        setSubscribed(true); // L'utilisateur a été abonné
        setMessage('Abonnement réussi.');
        setEmail(''); // Réinitialiser le champ email
      }
    } catch (error) {
      setMessage('Erreur lors de l\'abonnement.');
    }
  };

  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={3}> 
            <h4>Nos Menus</h4> 
            <ListGroup variant="flush"> 
              <ListGroup.Item as={Link} to="/entrees" action>Entrées</ListGroup.Item> 
              <ListGroup.Item as={Link} to="/principaux" action>Plats Principaux</ListGroup.Item> 
              <ListGroup.Item as={Link} to="/grillades" action>Grillades</ListGroup.Item> 
              <ListGroup.Item as={Link} to="/dejeuner" action>Petit-Déjeuner</ListGroup.Item> 
              <ListGroup.Item as={Link} to="/exotique" action>Plats Exotiques</ListGroup.Item> 
              <ListGroup.Item as={Link} to="/boisson" action>Boissons</ListGroup.Item> 
            </ListGroup>
          </Col> 
          <Col md={3}> 
            <h4>Informations</h4> 
            <ListGroup variant="flush"> 
              <ListGroup.Item as={Link} to="/propos" action>A Propos</ListGroup.Item> 
              <ListGroup.Item as={Link} to="/menu" action>Nos Menus</ListGroup.Item> 
              <ListGroup.Item as={Link} to="/faq" action>FAQ</ListGroup.Item>  
              <ListGroup.Item as={Link} to="/contact" action>Contact</ListGroup.Item> 
            </ListGroup> 
          </Col>
          <Col md={3}>
            <h4>Newsletter</h4>
            <p>Inscrivez-vous aujourd'hui pour les dernières nouvelles et mises à jour.</p>
            {subscribed ? (
              <p>Abonnement réussi !</p>
            ) : (
              <Form onSubmit={handleSubscribe}>
                <Form.Control 
                  type="email" 
                  placeholder="Entrer votre E-mail" 
                  className="mb-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button variant="light" type="submit">S'abonner</Button>
              </Form>
            )}
            {message && <p>{message}</p>}
          </Col>
          <Col md={3}>
            <h4>Contactez-nous</h4>
            <p>
              <FontAwesomeIcon icon={faPhone} className="me-2 footer-icon" />
              <a href="tel:691991650" className="text-light">+237 6 91 99 16 50</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="me-2 footer-icon" />
              <a href="mailto:gouttedeaufoods@gmail.com" className="text-light">gouttedeaufoods@gmail.com</a>
            </p>
            <div>
              <a href="https://www.facebook.com" className="text-light me-2">
                <FontAwesomeIcon icon={faFacebook} className="footer-icon" />
              </a>
              <a href="https://www.instagram.com" className="text-light me-2">
                <FontAwesomeIcon icon={faInstagram} className="footer-icon" />
              </a>
              <a href="https://www.twitter.com" className="text-light me-2">
                <FontAwesomeIcon icon={faTwitter} className="footer-icon" />
              </a>
              <a href="https://www.google.com" className="text-light">
                <FontAwesomeIcon icon={faGoogle} className="footer-icon" />
              </a>
            </div>
          </Col>
        </Row>
        <div className="text-center mt-3">
          <a href="#top">
            <FontAwesomeIcon icon={faArrowUp} className="footer-icon" />
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
