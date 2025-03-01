import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [wantDelivery, setWantDelivery] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(''); // Nouvelle state pour l'adresse
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, order) => sum + order.price, 0);
    setTotalPrice(total);
  }, []);

  const handlePayment = async (event) => {
    event.preventDefault();

    const userId = JSON.parse(localStorage.getItem('userId'));
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const commande = cart.map(order => order.dish).join(', ');

    try {
      await axios.post('http://localhost:8080/api/commande', {
        userId,
        commande,
        prix: totalPrice,
        adresse: wantDelivery ? deliveryAddress : null, // Envoi de l'adresse si livraison
      });

      alert('Commande enregistrée avec succès.');

      if (paymentMethod === 'card') {
        alert('Paiement par carte bancaire pris en compte.');
      } else {
        alert('Paiement électronique pris en compte.');
      }
        navigate('/');


      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la commande :', error);
      alert('Une erreur s\'est produite lors du paiement.');
    }
  };

  return (
    <Container className="my-5">
      <h1>Paiement</h1>
      <h3>Total: {totalPrice}f</h3>
      <Form onSubmit={handlePayment} className="my-4">
        <h4>Choisissez votre mode de paiement</h4>
        <Form.Group>
          <Form.Check
            type="radio"
            label="Carte Bancaire"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
          />
          <Form.Check
            type="radio"
            label="Paiement Mobile"
            name="paymentMethod"
            value="electronic"
            checked={paymentMethod === 'electronic'}
            onChange={() => setPaymentMethod('electronic')}
          />
        </Form.Group>

        {paymentMethod === 'card' && (
          <>
            <Form.Group controlId="cardNumber">
              <Form.Label>Numéro de Carte</Form.Label>
              <Form.Control type="text" placeholder="Entrez le numéro de votre carte" required />
            </Form.Group>
            <Form.Group controlId="cardName">
              <Form.Label>Nom sur la Carte</Form.Label>
              <Form.Control type="text" placeholder="Entrez le nom figurant sur la carte" required />
            </Form.Group>
            <Form.Group controlId="expiryDate">
              <Form.Label>Date d'Expiration</Form.Label>
              <Form.Control type="text" placeholder="MM/AA" required />
            </Form.Group>
            <Form.Group controlId="cvv">
              <Form.Label>CVV</Form.Label>
              <Form.Control type="text" placeholder="Entrez le CVV" required />
            </Form.Group>
          </>
        )}

        {paymentMethod === 'electronic' && (
          <>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Numéro de Téléphone</Form.Label>
              <Form.Control type="text" placeholder="Entrez votre numéro de téléphone" required />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Entrez votre nom" required />
            </Form.Group>
          </>
        )}

        <Form.Group controlId="deliveryCheck" className="mt-3">
          <Form.Check
            type="checkbox"
            label="Je souhaite être livré"
            checked={wantDelivery}
            onChange={(e) => setWantDelivery(e.target.checked)}
          />
        </Form.Group>

        {wantDelivery && (
          <Form.Group controlId="deliveryAddress">
            <Form.Label>Adresse de livraison</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre adresse complète"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit" className="mt-3">
          Valider
        </Button>
      </Form>
    </Container>
  );
};

export default Payment;
