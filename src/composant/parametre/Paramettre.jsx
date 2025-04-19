import React, { useState } from 'react';
import './Parametre.css'; // Fichier CSS pour les styles

const Parametre = () => {
  const [activeTab, setActiveTab] = useState('Profil');
  const [lastName, setLastName] = useState('Alpha ousmane');
  const [firstName, setFirstName] = useState('');
  const [emailOptions, setEmailOptions] = useState([
    { email: 'oumarsuite@gmail.com', checked: false },
    { email: 'oumarsuite@gmail.com', checked: true },
  ]);
  const [connected, setConnected] = useState(false);

  const handleEmailToggle = (index) => {
    const newOptions = [...emailOptions];
    newOptions[index].checked = !newOptions[index].checked;
    setEmailOptions(newOptions);
  };

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h2>Paramètres</h2>
        <ul>
          <li 
            className={activeTab === 'Profil' ? 'active' : ''}
            onClick={() => setActiveTab('Profil')}
          >
            Profil
          </li>
          <li 
            className={activeTab === 'Général' ? 'active' : ''}
            onClick={() => setActiveTab('Général')}
          >
            Général
          </li>
          <li 
            className={activeTab === 'Facturation' ? 'active' : ''}
            onClick={() => setActiveTab('Facturation')}
          >
            Facturation
          </li>
          <li 
            className={activeTab === 'Stockage' ? 'active' : ''}
            onClick={() => setActiveTab('Stockage')}
          >
            Stockage
          </li>
          <li 
            className={activeTab === 'Exporter' ? 'active' : ''}
            onClick={() => setActiveTab('Exporter')}
          >
            Exporter
          </li>
        </ul>
      </div>

      <div className="settings-content">
        {activeTab === 'Profil' && (
          <div className="profile-section">
            <h2>Profil</h2>
            
            <div className="form-group">
              <label>Nom de famille (facultatif)</label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Prénom</label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nom de famille (facultatif)"
              />
            </div>

            <div className="login-options">
              <h3>Options de connexion</h3>
              
              {emailOptions.map((option, index) => (
                <div key={index} className="email-option">
                  <input
                    type="checkbox"
                    id={`email-${index}`}
                    checked={option.checked}
                    onChange={() => handleEmailToggle(index)}
                  />
                  <label htmlFor={`email-${index}`}>{option.email}</label>
                </div>
              ))}
              
              <div className="connection-status">
                <input
                  type="checkbox"
                  id="connected"
                  checked={connected}
                  onChange={() => setConnected(!connected)}
                />
                <label htmlFor="connected">CONNECTÉ</label>
              </div>
            </div>
          </div>
        )}
        
        {/* Autres sections pour les autres onglets */}
      </div>
    </div>
  );
};

export default Parametre;