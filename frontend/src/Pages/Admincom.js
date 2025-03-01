import React, { useEffect, useState } from 'react';
import 'chart.js/auto';

const Admincom = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetch('http://localhost:8080/api/commandes')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) =>
        console.error('Erreur lors de la récupération des commandes :', error)
      );
  }, []);

  const handleApprove = (id) => {
    fetch(`http://localhost:8080/api/commandes/${id}/approve`, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.ok) {
          setOrders(
            orders.map((order) =>
              order.id === id ? { ...order, statut: 'approuvé' } : order
            )
          );
        }
      })
      .catch((error) =>
        console.error('Erreur lors de l\'approbation de la commande :', error)
      );
  };

  const handleCancel = (id) => {
    fetch(`http://localhost:8080/api/commandes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setOrders(orders.filter((order) => order.id !== id));
        }
      })
      .catch((error) =>
        console.error('Erreur lors de l\'annulation de la commande :', error)
      );
  };

  const approvedOrders = orders.filter(order => order.statut === 'approuvé');
  const pendingOrders = orders.filter(order => order.statut !== 'approuvé');


  return (
    <div className="container mt-4">
      <div>
        <h3 className="mb-3">Commandes Approuvées</h3>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Commande</th>
              <th>Prix (FCFA)</th>
              <th>Adresse</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {approvedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.commande}</td>
                <td>{order.prix}</td>
                <td>{order.adresse}</td>
                <td>
                  <span className="badge bg-success">{order.statut}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mb-3">Commandes en Attente</h3>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Commande</th>
              <th>Prix (FCFA)</th>
              <th>Adresse</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.commande}</td>
                <td>{order.prix}</td>
                <td>{order.adresse}</td>
                <td>
                  <span className="badge bg-warning text-dark">{order.statut}</span>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApprove(order.id)}
                  >
                    Approuver
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCancel(order.id)}
                  >
                    Annuler
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admincom;