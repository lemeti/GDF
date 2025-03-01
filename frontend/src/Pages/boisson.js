import React, { useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Boisson = () => {
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
      <h2 className="mt-4 mb-4 fs-1 fw-bolder"><strong>BOISSONS</strong></h2>
      
      <h3 className="p-menu">Bières</h3>
      <Row>
        {[
          { name: "Mutzig", price: 1500, img: "/asset/img/mutzig.png" },
          { name: "Manyan", price: 1000, img: "/asset/img/manyan.png" },
          { name: "Beaufort", price: 1000, img: "/asset/img/beaufort.png" },
          { name: "Doppel Munich", price: 1500, img: "/asset/img/doppel.png" },
          { name: "Heineken", price: 1500, img: "/asset/img/heineken.png" },
          { name: "Kadji-Beer", price: 1500, img: "/asset/img/kadji.png" },
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

      <h3 className="p-menu-i">Eau</h3>
      <Row>
        {[
          { name: "Opur", price: 500, img: "/asset/img/opur.png" },
          { name: "Vitale", price: 1000, img: "/asset/img/vitale.png" },
          { name: "Supermont", price: 500, img: "/asset/img/supermont.png" },
          { name: "Sano", price: 500, img: "/asset/img/sano.png" },
          { name: "Tangui", price: 500, img: "/asset/img/tangui.png" },
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

      <h3 className="p-menu-i">Boissons Gazeuses</h3>
      <Row>
        {[
          { name: "Gamme Top", price: 1000, img: "/asset/img/top.png" },
          { name: "Planet", price: 1000, img: "/asset/img/planet.png" },
          { name: "Orangina", price: 1300, img: "/asset/img/orangina.png" },
          { name: "Spécial", price: 700, img: "/asset/img/special.png" },
          { name: "Malta", price: 3000, img: "/asset/img/malta.png" },
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

      <h3 className="p-menu-i">Whisky</h3>
      <Row>
        {[
          { name: "Sequoia", price: 45000, img: "/asset/img/sequoi.png" },
          { name: "Rhum Magoustan's Café", price: 7000, img: "/asset/img/rhum.png" },
          { name: "Jack Daniel's", price: 15000, img: "/asset/img/jack.png" },
          { name: "Chivas Régal", price: 22500, img: "/asset/img/chivas.png" },
          { name: "Dewar's", price: 48500, img: "/asset/img/dewar.png" },
          { name: "Rhum Bacardi Carta Oro", price: 12000, img: "/asset/img/bacardi.png" },
          { name: "Rhum Bacardi Carta blanca", price: 12700, img: "/asset/img/bacardi 2.png" },
          { name: "Martini Rosato 1984", price: 12000, img: "/asset/img/martini.png" },
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

      <h3 className="p-menu-i">Vins Rouges</h3>
      <Row>
        {[
          { name: "L'univers Louis Eschenauer", price: 38000, img: "/asset/img/louis.png" },
          { name: "Brut Cuvée", price: 6500, img: "/asset/img/brut.png" },
          { name: "Vinorico", price: 3000, img: "/asset/img/vinorico.png" },
          { name: "6eme Sens", price: 8000, img: "/asset/img/sens.png" },
          { name: "San Marzio", price: 3500, img: "/asset/img/marzio.png" },
          { name: "Souvenir", price: 3000, img: "/asset/img/souvenir.png" },
          { name: "CH Valac", price: 3000, img: "/asset/img/valac.png" },
          { name: "Cadelle Rose", price: 7500, img: "/asset/img/cadelle.png" },
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

export default Boisson;