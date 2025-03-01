import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Commande = () => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setOrders(cart);
    const total = cart.reduce((sum, order) => sum + order.price, 0);
    setTotalPrice(total);
  }, []);

  const handlePay = () => {
    if (totalPrice === 0) {
      alert('veuillez passer une commande');
      return;
    }
    navigate('/payment');
  };

  const handleCancel = (index) => {
    const updatedOrders = orders.filter((order, i) => i !== index);
    setOrders(updatedOrders);
    localStorage.setItem('cart', JSON.stringify(updatedOrders));
    const total = updatedOrders.reduce((sum, order) => sum + order.price, 0);
    setTotalPrice(total);
  };

  return (
    <Container className="my-5">
      <h1>Mes Commandes</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Plat</th>
            <th>Date</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.dish}</td>
              <td>{new Date(order.date).toLocaleString()}</td>
              <td>{order.price}f</td>
              <td>
                <Button variant="danger" onClick={() => handleCancel(index)}>Annuler</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total: {totalPrice}f</h3>
      <Button variant="success" onClick={handlePay}>Payer</Button>
    </Container>
  );
};

export default Commande;
