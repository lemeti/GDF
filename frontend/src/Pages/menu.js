import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <Container>
      <h1 className= "text-center my-5">Veuillez sélectionner un menu</h1>
      <Row className="menu-section">
        <Col md={4} className="pdp-1 mb-4">
          <Card className='shadow'>
          <Link to="/entrees"><Card.Img variant="top" src="/asset/img/entree.png" /></Link>
          </Card>
        </Col>
        <Col md={4} className="pdp-1">
          <Card className='shadow'>
          <Link to="/principaux"><Card.Img variant="top" src="/asset/img/principaux.png" /></Link>
          </Card>
        </Col>
        <Col md={4} className="pdp-1">
          <Card className='shadow'>
          <Link to="/grillades"><Card.Img variant="top" src="/asset/img/grillade.png" /></Link>
          </Card>
        </Col>
      </Row>
      <Row className="menu-section">
        <Col md={4} className="pdp-1 mb-4">
          <Card className='shadow'>
          <Link to="/dejeuner"><Card.Img variant="top" src="/asset/img/petit-dejeuner.png" /></Link>
          </Card>
        </Col>
        <Col md={4} className="pdp-1">
          <Card className='shadow'>
          <Link to="/exotique"><Card.Img variant="top" src="/asset/img/exotique.png" /></Link>
          </Card>
        </Col>
        <Col md={4} className="pdp-1">
          <Card className='shadow'>
          <Link to="/boisson"><Card.Img variant="top" src="/asset/img/boisson.png" /></Link>
          </Card>
        </Col>
      </Row>
      </Container>

  );
  };
export default Menu;