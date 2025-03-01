import React, { useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Exotique = () => {
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
    } else {
      navigate('/commande');
    }
  };

  return (
    <Container className="text-center my-5">
      <h1><strong>BIENVENUE CHEZ GOUTTE D'EAU FOODS</strong></h1>
      <p><i>————— Restaurant camerounais & C.O —————</i></p>
      <h2 className="mt-4 mb-4 fs-1 fw-bolder"><strong>PLATS EXOTIQUES</strong></h2>
      <Row>
        {[
          { name: "Thai-Pad", price: 10000, img: "/asset/img/thai.png" },
          { name: "Sushi", price: 7500, img: "/asset/img/sushi.png" },
          { name: "Paella", price: 15000, img: "/asset/img/paella.png" },
          { name: "Empanadas", price: 3500, img: "/asset/img/empanadas.png" },
          { name: "Arepas", price: 5000, img: "/asset/img/arepas.png" },
          { name: "Mofongo", price: 7000, img: "/asset/img/mofongo.png" },
          { name: "Ceviche", price: 4000, img: "/asset/img/ceviche.png" },
          { name: "Pizza Italienne", price: 5000, img: "/asset/img/pizza italienne.png" },
        ].map((dish, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card className="shadow-lg">
              <Card.Img variant="top" src={dish.img} alt={dish.name} />
              <Card.Body className="text-center">
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>{dish.price}f</Card.Text>
                <Button variant="warning" onClick={() => handleOrderClick(dish.name, dish.price)}>
                  Commander
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="success" onClick={handleCheckout} className="mt-4">
        Procéder au paiement
      </Button>
    </Container>
  );
};

export default Exotique;