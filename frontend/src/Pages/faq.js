import React from 'react';
import { Container, Button, Row, Col, Form} from 'react-bootstrap';

const Faq = () => {
  return (
    <Container>
      <h1 className="text-center shadow">Contactez-Nous</h1>
      <Form>
        <fieldset>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} htmlFor="NOMSINPUT">Nom</Form.Label>
            <Col sm={10}>
               <Form.Control type="text" id="NOMSINPUT" placeholder="Nom" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} htmlFor="emailinput">Email :</Form.Label>
            <Col sm={10}>
              <Form.Control type="email" id="emailinput" placeholder="ex: gouttedeaufoods@gmail.com" required />
           </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} htmlFor="emailinput">Votre message :</Form.Label>
            <Col sm={10}>
            <div className="form-floating">
              <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
              <label for="floatingTextarea">Comments</label>
            </div>
           </Col>
          </Form.Group>
          <div className="text-center mb-4">
            <Button variant="primary" className="me-4" type="submit">Envoyer</Button>
          </div>
        </fieldset>
      </Form>
    </Container>
  );  
};

export default Faq;