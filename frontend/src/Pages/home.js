import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleOrderClick = (dish, price) => {
    const newDish = { dish, price, date: new Date(), status: 'pending' };
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, newDish];

    setCart(prevCart => [...prevCart, newDish]);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Commande ajoutée au panier');
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Veuillez vous connecter d\'abord');
      navigate('/Login'); // Rediriger vers la page de connexion
      return;
    }
    navigate('/commande');
  };

  return (
    <Container className="text-center my-5">
      <h1><strong>BIENVENUE CHEZ GOUTTE D'EAU FOODS</strong></h1>
      <p><i>————— Restaurant camerounais & C.O —————</i></p>
      <p>Découvrez nos délicieux plats livrés directement chez vous.</p>
      <Button variant="primary" href="/menu">Voir le menu</Button>

      <div className="mt-5">
        <section className="featured-dishes mt-4">
          <h2 className="text-center">NOS PLATS PHARES</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="shadow-lg">
                <Card.Img variant="top" src="/asset/img/ndolet.png" alt="Ndolet" />
                <Card.Body className="text-center">
                  <Card.Title>Ndolet</Card.Title>
                  <Card.Text>3000f</Card.Text>
                  <Button variant="warning" onClick={() => handleOrderClick('Ndolet', 3000)}>Commander</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="shadow-lg">
                <Card.Img variant="top" src="/asset/img/okok.png" alt="Okok" />
                <Card.Body className="text-center">
                  <Card.Title>Okok</Card.Title>
                  <Card.Text>1500f</Card.Text>
                  <Button variant="warning" onClick={() => handleOrderClick('Okok', 1500)}>Commander</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="shadow-lg">
                <Card.Img variant="top" src="/asset/img/taro.png" alt="Taro" />
                <Card.Body className="text-center">
                  <Card.Title>Taro</Card.Title>
                  <Card.Text>5000f</Card.Text>
                  <Button variant="warning" onClick={() => handleOrderClick('Taro', 5000)}>Commander</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </div>

      <Button variant="success" onClick={handleCheckout} className="mt-4">Procéder au paiement</Button>
    </Container>
  );
};

export default Home;