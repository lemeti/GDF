import React from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';

const Reservation = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const reservationData = {
      noms: document.getElementById("NOMSINPUT").value,
      prenoms: document.getElementById("PRENOMSINPUT").value,
      email: document.getElementById("emailinput").value,
      telephone: document.getElementById("téléphone").value,
      date: document.getElementById("start").value,
      heure: document.getElementById("appt-time").value,
      qualite: document.querySelector('input[name="qualité"]:checked').value,
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Réservation réussie !');
      } else {
        alert(result.msg);
      }
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      alert("Une erreur s'est produite.");
    }
  };
  
  return (
    <Container>
      <br />
      <div className="text-center">
        <h1><strong>BIENVENUE CHEZ GOUTTE D'EAU FOODS</strong></h1>
        <p><i>————— Restaurant camerounais & C.O —————</i></p>
        <h1><u>RESERVER UNE TABLE</u></h1>
      </div>
      <p>POUR toute réservation que vous souhaitez effectuer dans l'établissement <strong>GOUTTE D'EAU FOODS</strong>, veuillez remplir le formulaire suivant.</p>
      
      <Form>
        <fieldset>
          <legend>FORMULAIRE DE RESERVATION</legend>
          
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} htmlFor="NOMSINPUT">NOMS</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" id="NOMSINPUT" placeholder="NOMS" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} htmlFor="PRENOMSINPUT">PRENOMS</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" id="PRENOMSINPUT" placeholder="PRENOMS" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} htmlFor="emailinput">Adresse Email :</Form.Label>
            <Col sm={10}>
              <Form.Control type="email" id="emailinput" placeholder="ex: gouttedeaufoods@gmail.com" required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} htmlFor="téléphone">Téléphone</Form.Label>
            <Col sm={10}>
              <Form.Control type="tel" id="téléphone" required />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} htmlFor="start">Jour de la réservation :</Form.Label>
            <Col sm={10}>
              <Form.Control type="date" id="start" name="trip-start" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2} htmlFor="appt-time">Veuillez choisir une heure de rendez-vous :</Form.Label>
            <Col sm={10}>
              <Form.Control type="time" id="appt-time" name="appt-time" defaultValue="13:30" />
            </Col>
          </Form.Group>
          
          <fieldset>
            <legend>Qualité de la réservation</legend>
            <Form.Check 
              type="radio"
              id="VIP"
              label="VIP"
              name="qualité"
              value="VIP"
              defaultChecked
            />
            <Form.Check 
              type="radio"
              id="STANDAR"
              label="STANDARD"
              name="qualité"
              value="STANDARD"
            />
          </fieldset>
          
          <p className="mb-4">⚠️ Si l'heure de réservation n'est pas respectée, un délai de 30 minutes vous sera accordé. Ce délai dépassé, la réservation sera annulée.</p>
          
          <div className="text-center mb-4">
            <Button onClick={handleSubmit} variant="primary" className="me-4" type="submit">Reserver</Button>
            <Button variant="secondary" className="me-4" type="reset">Annuler</Button>
            <Button variant="info" className="me-4" onClick={() => window.print()}>Imprimer</Button>
          </div>
        </fieldset>
      </Form>
    </Container>
  );
};

export default Reservation;
