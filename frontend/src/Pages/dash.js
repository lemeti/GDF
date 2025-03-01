import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalOrders: 0, totalSales: 0, activeUsers: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1>Dashboard Admin</h1>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Commandes Totales</Card.Title>
                            <Card.Text>{stats.totalOrders}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Ventes Totales</Card.Title>
                            <Card.Text>{stats.totalSales} €</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Utilisateurs Actifs</Card.Title>
                            <Card.Text>{stats.activeUsers}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;