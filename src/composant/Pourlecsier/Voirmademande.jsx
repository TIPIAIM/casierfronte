import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaSearch } from "react-icons/fa"; // Import de l'icône pour le bouton

// Animation pour le texte
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animation pour la main qui pointe
const handBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Conteneur principal
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("/img/guin2.avif"); /* Remplace avec le bon chemin */
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Overlay noir transparent
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1;
`;

// Contenu principal
const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 20px;
  animation: ${fadeInUp} 1.2s ease-out;
`;

// Titre principal
const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Texte descriptif
const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: 500;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Conteneur pour le champ de saisie et le bouton
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
 // gap: 10px; /* Espacement entre le champ et le bouton */

  @media (max-width: 768px) {
    gap: 0px;
  }
`;

// Champ de saisie
const InputField = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: none;
  width: 100%;
  max-width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

// Bouton de soumission avec une icône
const IconButton = styled.button`
  padding: 0.8rem;
  font-size: 1.2rem;
  background-color: #f2c94c;
  color: #1a4d2e;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #e0b939;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Icône de la main animée
const HandIcon = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #f2c94c;
  animation: ${handBounce} 1.5s infinite;
`;

const Voirmademande = () => {
  const [idNumber, setIdNumber] = useState("");

  const handleInputChange = (e) => {
    setIdNumber(e.target.value);
  };

  const handleSubmit = () => {
    alert(`Recherche pour le numéro : ${idNumber}`);
  };

  return (
    <Wrapper>
      <Overlay />
      <Content>
        <Title>Vérifiez votre casier judiciaire</Title>
        <Subtitle>
          Entrez votre numéro de passeport ou de carte d'identité pour vérifier
          si votre casier judiciaire est disponible.
        </Subtitle>

        {/* Icône de la main animée au-dessus du champ de saisie */}
        <HandIcon>👇</HandIcon>

        {/* Champ de saisie et bouton sur la même ligne */}
        <InputGroup>
          <InputField
            type="text"
            placeholder="Numéro de passeport ou carte d'identité"
            value={idNumber}
            onChange={handleInputChange}
          />
          <IconButton onClick={handleSubmit}>
            <FaSearch />
          </IconButton>
        </InputGroup>
      </Content>
    </Wrapper>
  );
};

export default Voirmademande;