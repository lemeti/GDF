import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    orders: [],
    sales: [],
    activeUsers: 0,
    inactiveUsers: 0,
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/statistiques');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    };
  
    fetchStats();
  }, []);

  const orderData = {
    labels: stats.orders.map((order) => order.date),
    datasets: [
      {
        label: 'Nombre de commandes',
        data: stats.orders.map((order) => order.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const salesData = {
    labels: stats.sales.map((sale) => sale.date),
    datasets: [
      {
        label: 'Ventes totales (€)',
        data: stats.sales.map((sale) => sale.total),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const userData = {
    labels: ['Utilisateurs Actifs', 'Utilisateurs Inactifs'],
    datasets: [
      {
        data: [stats.activeUsers, stats.inactiveUsers],
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vue d'ensemble des statistiques clés</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <h3>Nombre de commandes</h3>
          <Bar data={orderData} />
        </div>
        <div className="col-md-6">
          <h3>Ventes totales</h3>
          <Bar data={salesData} />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <h3>Utilisateurs actifs</h3>
          <Pie data={userData} />
        </div>
      </div>

      
    </div>
  );
};

export default AdminDashboard;