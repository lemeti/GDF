import React, { useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Entrees = () => {
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
      <h2 className="mt-4 mb-4 fs-1 fw-bolder"><strong>ENTRÉES</strong></h2>
      <Row>
        {[
          { name: "Salade Cesar", price: 2000, img: "/asset/img/salade cesar.png" },
          { name: "Carpaccio", price: 2500, img: "/asset/img/carpaccio.png" },
          { name: "Huitre Gratinée", price: 2000, img: "/asset/img/huitre.png" },
          { name: "Assiette Cruditées", price: 1500, img: "/asset/img/crudite.png" },
          { name: "Brick à la viande", price: 1500, img: "/asset/img/brick.png" },
          { name: "Cake Jambon Olive", price: 1000, img: "/asset/img/cake.png" },
          { name: "Millefeuilles de Mer", price: 1500, img: "/asset/img/millefeuille.png" },
          { name: "Cake aux courgettes et Parmesan", price: 1000, img: "/asset/img/courgette.png" },
          { name: "Paté de Pâques", price: 2000, img: "/asset/img/paté.png" },
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

export default Entrees;