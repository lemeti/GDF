import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const GestionUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [show, setShow] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', password: '' });

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/utilisateurs');
      setUtilisateurs(response.data);
    } catch (error) {
      console.error('Erreur de la récupération des utilisateurs :', error);
    }
  };

  const handleShow = (user = null) => {
    setEditingUser(user);
    setFormData(user ? { username: user.username, password: '' } : { username: '', password: '' });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditingUser(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`http://localhost:8080/api/utilisateurs/${editingUser.id}`, formData);
      } else {
        await axios.post('http://localhost:8080/api/utilisateurs', formData);
      }
      fetchUtilisateurs();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de l\enregistrement :', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`http://localhost:8080/api/utilisateurs/${id}`);
        fetchUtilisateurs();
      } catch (error) {
        console.error('Erreur lors de la suppression :', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestion des Utilisateurs</h2>
      <Button variant="primary" onClick={() => handleShow()}>Ajouter un utilisateur</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom d'utilisateur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(user)}>Modifier</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal d'ajout/modification */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? 'Modifier' : 'Ajouter'} un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Enregistrer</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GestionUtilisateurs;
