import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Principaux = () => {
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
        <h2 className="mt-4 mb-4 fs-1 fw-bolder"><strong>PLATS PRINCIPAUX</strong></h2>
        <Row>
          {[
            { name: "Ndolet", price: 3000, img: "/asset/img/ndolet.png" },
            { name: "Okok", price: 1500, img: "/asset/img/okok.png" },
            { name: "Taro", price: 5000, img: "/asset/img/taro.png" },
            { name: "Mets de Pistache", price: 3500, img: "/asset/img/met.png" },
            { name: "Banane Malaxée", price: 2000, img: "/asset/img/banane.png" },
            { name: "Couscous Sauce Gombo", price: 1500, img: "/asset/img/gombo.png" },
            { name: "Kati-Kati", price: 2500, img: "/asset/img/kati.png" },
            { name: "Koki", price: 1500, img: "/asset/img/koki.png" },
            { name: "Sanga", price: 1000, img: "/asset/img/sanga.png" },
            { name: "Bongo Tchobi", price: 3000, img: "/asset/img/bongo.png" },
            { name: "Kondre", price: 5000, img: "/asset/img/kondre.png" },
            { name: "Corn-Tchap", price: 1500, img: "/asset/img/corn.png" },
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

export default Principaux;
