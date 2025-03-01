import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const allDishes = [
  { name: "Thai-Pad", price: 10000, img: "/asset/img/thai.png", category: "exotique" },
  { name: "Sushi", price: 7500, img: "/asset/img/sushi.png", category: "exotique" },
  { name: "Paella", price: 15000, img: "/asset/img/paella.png", category: "exotique" },
  { name: "Empanadas", price: 3500, img: "/asset/img/empanadas.png", category: "exotique" },
  { name: "Pizza Italienne", price: 5000, img: "/asset/img/pizza italienne.png", category: "exotique" },
  { name: "Mutzig", price: 1500, img: "/asset/img/mutzig.png" },
  { name: "Manyan", price: 1000, img: "/asset/img/manyan.png" },
  { name: "Beaufort", price: 1000, img: "/asset/img/beaufort.png" },
  { name: "Doppel Munich", price: 1500, img: "/asset/img/doppel.png" },
  { name: "Heineken", price: 1500, img: "/asset/img/heineken.png" },
  { name: "Kadji-Beer", price: 1500, img: "/asset/img/kadji.png" },
  { name: "Opur", price: 500, img: "/asset/img/opur.png" },
  { name: "Vitale", price: 1000, img: "/asset/img/vitale.png" },
  { name: "Supermont", price: 500, img: "/asset/img/supermont.png" },
  { name: "Sano", price: 500, img: "/asset/img/sano.png" },
  { name: "Tangui", price: 500, img: "/asset/img/tangui.png" },
  { name: "Gamme Top", price: 1000, img: "/asset/img/top.png" },
  { name: "Planet", price: 1000, img: "/asset/img/planet.png" },
  { name: "Orangina", price: 1300, img: "/asset/img/orangina.png" },
  { name: "Spécial", price: 700, img: "/asset/img/special.png" },
  { name: "Malta", price: 3000, img: "/asset/img/malta.png" },
  { name: "Sequoia", price: 45000, img: "/asset/img/sequoi.png" },
  { name: "Rhum Magoustan's Café", price: 7000, img: "/asset/img/rhum.png" },
  { name: "Jack Daniel's", price: 15000, img: "/asset/img/jack.png" },
  { name: "Chivas Régal", price: 22500, img: "/asset/img/chivas.png" },
  { name: "Dewar's", price: 48500, img: "/asset/img/dewar.png" },
  { name: "Rhum Bacardi Carta Oro", price: 12000, img: "/asset/img/bacardi.png" },
  { name: "Rhum Bacardi Carta blanca", price: 12700, img: "/asset/img/bacardi 2.png" },
  { name: "Martini Rosato 1984", price: 12000, img: "/asset/img/martini.png" },
  { name: "L'univers Louis Eschenauer", price: 38000, img: "/asset/img/louis.png" },
  { name: "Brut Cuvée", price: 6500, img: "/asset/img/brut.png" },
  { name: "Vinorico", price: 3000, img: "/asset/img/vinorico.png" },
  { name: "6eme Sens", price: 8000, img: "/asset/img/sens.png" },
  { name: "San Marzio", price: 3500, img: "/asset/img/marzio.png" },
  { name: "Souvenir", price: 3000, img: "/asset/img/souvenir.png" },
  { name: "CH Valac", price: 3000, img: "/asset/img/valac.png" },
  { name: "Cadelle Rose", price: 7500, img: "/asset/img/cadelle.png" },
  { name: "Petit-Déjeuner Anglais", price: 1500, img: "/asset/img/anglais.png" },
  { name: "Churros avec Chocolat", price: 1500, img: "/asset/img/churro.png" },
  { name: "Pancakes", price: 700, img: "/asset/img/pancake.png" },
  { name: "Cappucino", price: 1500, img: "/asset/img/cappucino.png" },
  { name: "Morgenmad", price: 2500, img: "/asset/img/morgenmad.png" },
  { name: "Tartine Beurre-Confiture", price: 1000, img: "/asset/img/tartine.png" },
  { name: "Petit-Déjeuner Allemand", price: 3000, img: "/asset/img/allemand.png" },
  { name: "Salade Cesar", price: 2000, img: "/asset/img/salade cesar.png" },
  { name: "Carpaccio", price: 2500, img: "/asset/img/carpaccio.png" },
  { name: "Huitre Gratinée", price: 2000, img: "/asset/img/huitre.png" },
  { name: "Assiette Cruditées", price: 1500, img: "/asset/img/crudite.png" },
  { name: "Brick à la viande", price: 1500, img: "/asset/img/brick.png" },
  { name: "Cake Jambon Olive", price: 1000, img: "/asset/img/cake.png" },
  { name: "Millefeuilles de Mer", price: 1500, img: "/asset/img/millefeuille.png" },
  { name: "Cake aux courgettes et Parmesan", price: 1000, img: "/asset/img/courgette.png" },
  { name: "Paté de Pâques", price: 2000, img: "/asset/img/paté.png" },
  { name: "Brochettes", price: 200, img: "/asset/img/brochette.png" },
  { name: "Poisson Braisé", price: 2000, img: "/asset/img/poisson.png" },
  { name: "Gambas Braisée", price: 5000, img: "/asset/img/gambas.png" },
  { name: "Porc Braisé", price: 3500, img: "/asset/img/porc.png" },
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
];

const SearchResults = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query")?.toLowerCase() || "";

  // Filtrer les plats selon la recherche
  const filteredDishes = allDishes.filter(dish =>
    dish.name.toLowerCase().includes(searchQuery)
  );

  const handleOrderClick = (dish, price) => {
    const newDish = { dish, price, date: new Date(), status: 'pending' };
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, newDish];

    

    setCart(prevCart => [...prevCart, newDish]);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Commande ajoutée au panier');
  };

  return (
    <Container className="my-5">
      <h2>Résultats de recherche pour "{searchQuery}"</h2>
      <Row>
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish, index) => (
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
          ))
        ) : (
          <p>Aucun plat trouvé.</p>
        )}
      </Row>
    </Container>
  );
};

export default SearchResults;
