import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

const SignUp = () => { 
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({ 
    nom: '',
    prenom: '',
    dateDeNaissance: '',
    sexe: '',
    ville: '', 
    quartier: '', 
    email: '', 
    numeroDeTelephone: '',
    motDePasse: '', 
    confirmerMotDePasse: '', 
  }); 

  const handleChange = (e) => { 
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value, 
    }); 
  }; 


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.motDePasse !== formData.confirmerMotDePasse) { 
      alert('Les mots de passe ne correspondent pas'); 
      return; 
    }
    Axios.post('http://localhost:8080/api/inscription', formData).then(response => { 
      console.log(response.data); }) 
      .catch(error => { 
        console.error('There was an error!', error); 
      }); 
      
      navigateTo('/login');
  };

  return (
    <div className="container">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Noms</label>
          <input 
          type="text" 
          className="form-control" 
          name="nom" 
          placeholder="Votre nom" 
          value={formData.nom} 
          onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">Prénoms</label>
          <input 
          type="name" 
          className="form-control" 
          placeholder="Votre prénom" 
          name="prenom" 
          value={formData.prenom} 
          onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="dateDeNaissance" className="form-label">Date de naissance</label>
          <input 
          type="date" 
          className="form-control" 
          name="dateDeNaissance" 
          value={formData.dateDeNaissance} 
          onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="sexe" className="form-label">Sexe</label>
          <select 
          className="form-control" 
          name="sexe" 
          value={formData.sexe} 
          onChange={handleChange}>
            <option className="form-control" value="">Sélectionner</option> 
            <option className="form-control" value="M">Masculin</option> 
            <option className="form-control" value="F">Féminin</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="ville" className="form-label">Ville</label>
          <input 
          type="text" 
          className="form-control" 
          name="ville" 
          value={formData.ville} 
          onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="quartier" className="form-label">Quartier</label>
          <input 
          type="text" 
          className="form-control" 
          name="quartier" 
          value={formData.quartier} 
          onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="telephone" className="form-label">Telephone</label>
          <input 
          type="number" 
          className="form-control" 
          name="telephone" 
          value={formData.telephone} 
          onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
          type="email" 
          className="form-control" 
          name="email" 
          placeholder="Votre email" 
          value={formData.email} 
          onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input 
          type="password" 
          className="form-control" 
          placeholder="Votre mot de passe" 
          name="motDePasse" 
          value={formData.motDePasse} 
          onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">Confirmer le mot de passe</label>
          <input 
          type="password" 
          className="form-control" 
          placeholder="Confirmer le mot de passe" 
          name="confirmerMotDePasse" 
          value={formData.confirmerMotDePasse} onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary mb-4">S'inscrire</button>
      </form>
    </div>
  );
}

export default SignUp;
