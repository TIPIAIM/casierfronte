import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import de l'icône de retour

// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",

  bleuProfond: "#003566",
  beigeSableux: "#F2E9DC",
};

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 20px 10px;
  padding: 10px 10px;
  //background-color: ${colors.goldenYellow};
  color: ${colors.goldenYellow};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50%;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    // background-color: ${colors.greenDark};
    color: ${colors.white};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    margin-right: 8px; /* Ajoute un espace entre l'icône et le texte */
  }
`;

// Animation de changement de couleur
const colorAnimation = keyframes`
  0% {
    color: ${colors.jauneOcre};
  }
  33% {
    color: ${colors.goldenYellow};
  }
  66% {
    color: ${colors.bleuProfond};
  }
  100% {
    color: ${colors.beigeSableux};
  }
    
`;
// Animation de fond
const backgroundAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Animation pour le texte
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Conteneur principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  background: linear-gradient(
    150deg,
    ${colors.blueMarine},
    ${colors.greenDark},
    ${colors.blueMarine}
  );
  background-size: 300% 300%;
  animation: ${backgroundAnimation} 5s ease infinite; /* Animation de fond */
  color: ${colors.white};
  text-align: center;
  padding: 20px;
`;

// Titre principal
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
  //color: ${colors.goldenYellow};
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
  animation: ${fadeIn} 1.5s ease;

  animation: ${colorAnimation} 10s infinite; /* Animation de 5 secondes en boucle */

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

// Message descriptif
const Description = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  line-height: 1.8;

  max-width: 800px;
  color: ${colors.white};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 2s ease;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Interfcehecsier = () => {
  return (
    <Container>
      <Title>L'espace personnel de telechargement</Title>
      <Description>
        Besoin d’un extrait de casier ? 📄 Téléchargez-le dès maintenant sans
        vous déplacer
      </Description>
    </Container>
  );
};

export default Interfcehecsier;
