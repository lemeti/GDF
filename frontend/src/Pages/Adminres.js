import React, { useEffect, useState } from 'react';

const Adminres = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/reservations')
      .then((response) => response.json())
      .then((data) => setReservations(data))
      .catch((error) =>
        console.error('Erreur lors du chargement des réservations :', error)
      );
  }, []);

  const handleApprove = (id) => {
    fetch(`http://localhost:8080/api/reservations/${id}/approve`, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.ok) {
          setReservations(
            reservations.map((res) =>
              res.id === id ? { ...res, statut: 'approuvé' } : res
            )
          );
        }
      })
      .catch((error) =>
        console.error("Erreur lors de l'approbation de la réservation :", error)
      );
  };

  const handleCancel = (id) => {
    fetch(`http://localhost:8080/api/reservations/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setReservations(reservations.filter((res) => res.id !== id));
        }
      })
      .catch((error) =>
        console.error("Erreur lors de l'annulation de la réservation :", error)
      );
  };

  const approvedReservations = reservations.filter(res => res.statut === 'approuvé');
  const pendingReservations = reservations.filter(res => res.statut !== 'approuvé');

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Réservations Approuvées</h3>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {approvedReservations.map((res) => (
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>{res.noms}</td>
              <td>{res.email}</td>
              <td>{res.telephone}</td>
              <td>{res.date_reservation}</td>
              <td>{res.heure_reservation}</td>
              <td><span className="badge bg-success">{res.statut}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mb-3">Réservations en Attente</h3>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingReservations.map((res) => (
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>{res.noms}</td>
              <td>{res.email}</td>
              <td>{res.telephone}</td>
              <td>{res.date_reservation}</td>
              <td>{res.heure_reservation}</td>
              <td><span className="badge bg-warning text-dark">{res.statut}</span></td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleApprove(res.id)}
                >
                  Approuver
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancel(res.id)}
                >
                  Annuler
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminres;
