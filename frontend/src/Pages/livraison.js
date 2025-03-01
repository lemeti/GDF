import React from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';

const Livraison = () => {
  return (
    <Container>
      <h1>Formulaire de Livraison</h1>
      <Form className="important" action="php/traitementformulaire.php" method="post">
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Nom:</Form.Label>
          <Form.Control type="text" name="name" />
        </Form.Group>

        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Adresse de Livraison:</Form.Label>
          <Form.Control type="text" name="address" />
        </Form.Group>

        <Form.Group controlId="phone" className="mb-3">
          <Form.Label>Téléphone:</Form.Label>
          <Form.Control type="text" name="phone" />
        </Form.Group>
        
        <div className="element text-center mb-4">
          <Button variant="primary" type="submit" className="me-4">Valider</Button>
          <Button variant="secondary" type="reset">Réinitialiser</Button>
        </div>
      </Form>

      <p className="important element text-center">Livraison gratuite pour les commandes de plus de 25 000F</p>
      <p className="element text-center">Dernière commande à 20h.</p>
    </Container>
  );
};

export default Livraison;
