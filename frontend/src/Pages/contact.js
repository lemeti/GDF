import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container>
      <main>
        <h1>Nous Contacter</h1>
        <section className="contact-info">
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Adresse</Card.Title>
              <Card.Text>
                123 Rue du Congo<br />
                Yaoundé, Cameroun<br />
                BP : 2816 Ydé
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Téléphone</Card.Title>
              <Card.Text>+237 691991650</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Email</Card.Title>
              <Card.Text>gouttedeaufoods@gmail.com</Card.Text>
            </Card.Body>
          </Card>
        </section>
        <h1>Localisation</h1>
        <div id="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.348962936078!2d-122.08417378468115!3d37.42199997981032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806a5a7d5a73%3A0x8e9c8b6a7b8e4b96!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1634045260393!5m2!1sen!2sus"
            width="100%"
            height="550"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
      </main>
    </Container>
  );
};

export default Contact;
