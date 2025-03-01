import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bodyParser from "body-parser";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const database = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'food',
    },
  });

app.listen(PORT, () => {
    console.log("Listening Goutte D'eau Foods " + PORT + "...");
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Recherche de l'utilisateur avec le nom d'utilisateur fourni
    const user = await database('users')
      .select()
      .where('username', username)
      .first();

    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    // Vérifie si l'utilisateur est un administrateur
    const admin = await database('admin')
      .select()
      .where('userId', user.id)
      .first();

    if (admin) {
      // Comparaison directe du mot de passe pour les administrateurs
      if (password === user.password) {
        const token = jwt.sign({ id: user.id, role: 'admin' }, 'jwtadmin', { expiresIn: '1h' });
        res.send({ token, is_admin: true });
        return;
      } else {
        return res.status(401).send({ message: 'Invalid credentials' });
      }
    }

    // Vérifie si l'utilisateur est un client
    const client = await database('client')
      .select()
      .where('userId', user.id)
      .first();

    if (client) {
      // Comparaison avec bcrypt pour les clients
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, role: 'client' }, 'jwtclient', { expiresIn: '1h' });
        res.send({ token, is_client: true });
        return;
      } else {
        return res.status(401).send({ message: 'Invalid credentials' });
      }
    }

    // Aucun rôle spécifique trouvé pour l'utilisateur
    res.status(403).send({ message: 'Unauthorized role' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Route pour enregistrer les clients 
app.post('/api/inscription', async (req, res) => { 
  try {
    console.clear()
    console.log(req.body);
    const { 
      nom, 
      prenom, 
      dateDeNaissance, 
      sexe, 
      ville, 
      quartier, 
      email, 
      telephone,
      motDePasse
    } = req.body; 

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

  const [userId] = await database('users').insert({
    username: email,
    password: hashedPassword,
  });

  const [clientId] = await database('client').insert({
    code: email, 
    firstname: prenom, 
    lastname: nom, 
    dateOfBirth: dateDeNaissance, 
    sexe: sexe, 
    ville: ville, 
    quartier: quartier, 
    email: email, 
    phoneNumber: telephone,
    userId: userId,
  })
  res.status(200).send({msg:'Inscription reussie'});
  }
  catch (error) {
    console.error('Erreur lors de l\'inscription du client :', error);
    res.status(500).send({msg:'Une erreur s\'est produite lors de l\'inscription du client.', err:error});
  }
});

// Enregistrer une commande
app.post('/api/commande', async (req, res) => {
  const { userId, 
          commande, 
          prix, 
          adresse 
        } = req.body;

  const datecom = new Date();
  const statut = 'en attente';

  try {
    const [commandeId] = await database('commande').insert({
      userId,
      commande,
      datecom,
      prix,
      statut,
      adresse,
    });

    res.status(200).send({ msg: 'Commande enregistrée avec succès', commandeId });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la commande :', error);
    res.status(500).send({ msg: 'Une erreur s\'est produite lors de l\'enregistrement de la commande.', err: error });
  }
});

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    // Vérifier si l'email est déjà enregistré
    const existingEmail = await database('subscribers')
      .select()
      .where('email', email)
      .first();

    if (existingEmail) {
      return res.status(200).send({ message: 'Vous êtes déjà abonné.' });
    }

    // Enregistrer l'email dans la base de données
    await database('subscribers').insert({ email });

    res.status(200).send({ message: 'Abonnement réussi.' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'email :', error);
    res.status(500).send({ message: 'Erreur interne du serveur.' });
  }
});

app.get('/api/commandes', async (req, res) => {
  try {
    const commandes = await database('commande').select();
    res.status(200).send(commandes);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes :', error);
    res.status(500).send({ msg: 'Erreur lors de la récupération des commandes.' });
  }
});

app.put('/api/commandes/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    await database('commande')
      .where({ id })
      .update({ statut: 'approuvé' });
    res.status(200).send({ msg: 'Commande approuvée.' });
  } catch (error) {
    console.error('Erreur lors de l\'approbation de la commande :', error);
    res.status(500).send({ msg: 'Erreur lors de l\'approbation de la commande.' });
  }
});

app.delete('/api/commandes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await database('commande')
      .where({ id })
      .del();
    res.status(200).send({ msg: 'Commande annulée.' });
  } catch (error) {
    console.error('Erreur lors de l\'annulation de la commande :', error);
    res.status(500).send({ msg: 'Erreur lors de l\'annulation de la commande.' });
  }
});

app.post('/api/reservation', async (req, res) => {
  try {
    const { noms, prenoms, email, telephone, date, heure, qualite } = req.body;

    if (!noms || !prenoms || !email || !telephone || !date || !heure || !qualite) {
      return res.status(400).send({ msg: 'Tous les champs sont obligatoires.' });
    }

    const [reservationId] = await database('reservations').insert({
      noms,
      prenoms,
      email,
      telephone,
      date_reservation: date,
      heure_reservation: heure,
      qualite_reservation: qualite,
      statut: 'en attente',
    });

    res.status(200).send({ msg: 'Réservation enregistrée avec succès', reservationId });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la réservation :', error);
    res.status(500).send({ msg: 'Erreur interne du serveur.', err: error });
  }
});

// Récupérer la liste des utilisateurs
app.get('/api/utilisateurs', async (req, res) => {
  try {
    const utilisateurs = await database('users').select('id', 'username');
    res.status(200).json(utilisateurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ msg: 'Erreur interne du serveur' });
  }
});

// Ajouter un utilisateur
app.post('/api/utilisateurs', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await database('users').insert({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ msg: 'Utilisateur créé avec succès', userId });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ msg: 'Erreur interne du serveur' });
  }
});

// Modifier un utilisateur
app.put('/api/utilisateurs/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await database('users').where({ id }).update({
      username,
      password: hashedPassword,
    });

    res.status(200).json({ msg: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    res.status(500).json({ msg: 'Erreur interne du serveur' });
  }
});

// Supprimer un utilisateur
app.delete('/api/utilisateurs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await database('users').where({ id }).del();
    res.status(200).json({ msg: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).json({ msg: 'Erreur interne du serveur' });
  }
});

// Récupérer toutes les réservations
app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await database('reservations').select('id', 'noms', 'prenoms', 'email', 'telephone', 'date_reservation', 'heure_reservation', 'qualite_reservation', 'statut');
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations :', error);
    res.status(500).json({ msg: 'Erreur interne du serveur' });
  }
});

// Approuver une réservation
app.put('/api/reservations/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    await database('reservations')
      .where({ id })
      .update({ statut: 'approuvé' });
    res.status(200).json({ msg: 'Réservation approuvée.' });
  } catch (error) {
    console.error('Erreur lors de l\'approbation de la réservation :', error);
    res.status(500).json({ msg: 'Erreur interne du serveur' });
  }
});

// Supprimer une réservation
app.delete('/api/reservations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await database('reservations')
      .where({ id })
      .del();
    res.status(200).json({ msg: 'Réservation supprimée.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la réservation :', error);
    res.status(500).json({ msg: 'Erreur interne du serveur' });
  }
});

app.get('/api/statistiques', async (req, res) => {
  try {
    // Nombre total d'utilisateurs
    const totalUtilisateurs = await database('users').count('id as count').first();

    // Nombre total de commandes
    const totalCommandes = await database('commande').count('id as count').first();

    // Total des ventes (somme des prix des commandes approuvées)
    const totalVentes = await database('commande')
      .where('statut', 'approuvé')
      .sum('prix as somme')
      .first();

    // Nombre total de réservations
    const totalReservations = await database('reservations').count('id as count').first();

    // Données mensuelles pour les graphiques (par exemple, commandes par mois)
    const commandesParMois = await database('commande')
      .select(database.raw('MONTH(datecom) as mois, COUNT(*) as nombre'))
      .groupBy(database.raw('MONTH(datecom)'))
      .orderBy('mois');

    const ventesParMois = await database('commande')
      .where('statut', 'approuvé')
      .select(database.raw('MONTH(datecom) as mois, SUM(prix) as somme'))
      .groupBy(database.raw('MONTH(datecom)'))
      .orderBy('mois');

    const reservationsParMois = await database('reservations')
      .select(database.raw('MONTH(date_reservation) as mois, COUNT(*) as nombre'))
      .groupBy(database.raw('MONTH(date_reservation)'))
      .orderBy('mois');

    res.status(200).json({
      totalUtilisateurs: totalUtilisateurs.count,
      totalCommandes: totalCommandes.count,
      totalVentes: totalVentes.somme || 0,
      totalReservations: totalReservations.count,
      commandesParMois,
      ventesParMois,
      reservationsParMois,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error);
    res.status(500).json({ msg: 'Erreur interne du serveur' });
  }
});


/*app.post('/api/orders', async (req, res) => {
  try {
    const { userId, commande, statut, datecom, prix } = req.body;
    const [orderId] = await database('commande').insert({
      userId,
      commande,
      statut,
      datecom,
      prix
    });
    res.status(200).send({ orderId });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la commande :', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});


app.post('/api/orders/pay', async (req, res) => {
  const { orderId } = req.body;
  try {
    await database('commande')
      .where({ id: orderId })
      .update({ status: 'paid' });
    res.status(200).send({ message: 'Order paid' });
  } catch (error) {
    console.error('Erreur lors du paiement de la commande :', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});


app.delete('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await database('commande')
      .where({ no_commande })
      .del();
    res.status(200).send({ message: 'Order cancelled' });
  } catch (error) {
    console.error('Erreur lors de l\'annulation de la commande :', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});*/
