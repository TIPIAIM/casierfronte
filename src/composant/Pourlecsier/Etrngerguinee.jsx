import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
};

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
    transform: translateY(-20px);
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
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${colors.blueMarine},
    ${colors.greenDark},
    ${colors.goldenYellow}
  );
  background-size: 300% 300%;
  animation: ${backgroundAnimation} 10s ease infinite; /* Animation de fond */
  color: ${colors.white};
  text-align: center;
  padding: 20px;
`;

// Titre principal
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${colors.goldenYellow};
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1.5s ease;

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

// Bouton de connexion
const ConnectButton = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background-color: ${colors.goldenYellow};
  color: ${colors.blueMarine};
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 50px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;
  animation: ${fadeIn} 2.5s ease;

  &:hover {
    background-color: ${colors.greenDark};
    color: ${colors.white};
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Etrngerguinee = () => {
  return (
    <Container>
      <Title>Bienvenue sur la plateforme officielle</Title>
      <Description>
        Simplifiez vos démarches administratives en ligne. Connectez-vous pour
        commencer votre demande de casier judiciaire en toute sécurité et
        confidentialité.
      </Description>
      <ConnectButton to="/seconnecter">Se Connecter</ConnectButton>
    </Container>
  );
};

export default Etrngerguinee;
