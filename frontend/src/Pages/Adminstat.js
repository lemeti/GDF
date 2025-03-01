import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminStat = () => {
  const [stats, setStats] = useState({
    totalUtilisateurs: 0,
    totalCommandes: 0,
    totalVentes: 0,
    totalReservations: 0,
    commandesParMois: [],
    ventesParMois: [],
    reservationsParMois: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/statistiques');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques', error);
      }
    };
    fetchStats();
  }, []);

  // Préparer les données pour les graphiques
  const moisLabels = [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
    'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'
  ];

  const commandesData = {
    labels: moisLabels,
    datasets: [{
      label: 'Commandes par mois',
      data: moisLabels.map((_, i) => {
        const moisData = stats.commandesParMois.find(m => m.mois === i + 1);
        return moisData ? moisData.nombre : 0;
      }),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  const ventesData = {
    labels: moisLabels,
    datasets: [{
      label: 'Ventes par mois',
      data: moisLabels.map((_, i) => {
        const moisData = stats.ventesParMois.find(m => m.mois === i + 1);
        return moisData ? moisData.somme : 0;
      }),
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    }],
  };

  const reservationsData = {
    labels: moisLabels,
    datasets: [{
      label: 'Réservations par mois',
      data: moisLabels.map((_, i) => {
        const moisData = stats.reservationsParMois.find(m => m.mois === i + 1);
        return moisData ? moisData.nombre : 0;
      }),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true },
    },
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Statistiques</h2>
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Utilisateurs</Card.Title>
              <Card.Text>{stats.totalUtilisateurs}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Commandes</Card.Title>
              <Card.Text>{stats.totalCommandes}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Ventes Totales</Card.Title>
              <Card.Text>{stats.totalVentes} FCFA</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Réservations</Card.Title>
              <Card.Text>{stats.totalReservations}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Bar options={{ ...options, plugins: { ...options.plugins, title: { text: 'Commandes par mois' } } }} data={commandesData} />
        </Col>
        <Col md={4}>
          <Bar options={{ ...options, plugins: { ...options.plugins, title: { text: 'Ventes par mois' } } }} data={ventesData} />
        </Col>
        <Col md={4}>
          <Bar options={{ ...options, plugins: { ...options.plugins, title: { text: 'Réservations par mois' } } }} data={reservationsData} />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminStat;