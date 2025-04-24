import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowRight, FaHandPaper, FaHandPeace, FaLayerGroup } from "react-icons/fa"; // Import d'une icône pour le bouton principal

// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
};

// Animation de gloire pour le bouton principal
const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 1px ${colors.goldenYellow}, 0 0 6px ${colors.white};
  }
  50% {
    box-shadow: 0 0 2px ${colors.greenDark}, 0 0 4px ${colors.blueMarine};
  }
  100% {
    box-shadow: 0 0 1px ${colors.goldenYellow}, 0 0 2px ${colors.greenDark};
  }
`;
// Conteneur principal avec une image en arrière-plan et un overlay noir
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 100vh;
  padding: 20px;
  background-image: url("/img/jurid1.avif"); /* Chemin de l'image */
  background-size: cover; /* L'image couvre tout l'écran */
  background-position: center; /* Centrer l'image */
  background-repeat: no-repeat; /* Pas de répétition de l'image */
  color: ${colors.white};
  text-align: center;

  /* Overlay noir transparent */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); /* Fond noir avec transparence */
    z-index: 1; /* Place l'overlay derrière le contenu */
  }

  /* Assure que le contenu est au-dessus de l'overlay */
  > * {
    position: relative;
    z-index: 2;
  }
`;

// Animation d'apparition pour le texte accrocheur
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

// Animation d'apparition pour le conteneur dépliable
const dropdownFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;



// Texte accrocheur
const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${colors.white};
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
  animation: ${fadeIn} 1s ease-in-out;

  &:hover {
    color: ${colors.goldenYellow};
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

// Bouton principal
const MainButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 60px;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.greenDark};
  background-color: ${colors.goldenYellow};
  border: none;
 
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${glowAnimation} 2s infinite; /* Animation de gloire */
  box-shadow: 2px 2px rgba(0, 0, 0, 0.9);

  &:hover {
    background-color: ${colors.greenDark};
    color: ${colors.goldenYellow};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Conteneur dépliable
const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 5px;
  max-height: ${(props) => (props.isOpen ? "200px" : "0")};
  overflow: hidden;
  animation: ${(props) => (props.isOpen ? dropdownFadeIn : "none")} 0.3s ease-out;
`;

// Boutons internes
const DropdownButton = styled(Link)`
  padding: 10px 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.blueMarine};
  background-color: ${colors.white};
  text-decoration: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.greenDark};
    color: ${colors.white};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Adminfils = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      {/* Texte accrocheur */}
      <Heading>Sécurité et légalité depuis chez vous sans file d'attente.</Heading>

      {/* Bouton principal */}
      <MainButton onClick={toggleDropdown}>
        <span>Commencer </span>
        <FaLayerGroup /> {/* Icône ajoutée */}
      </MainButton>

      {/* Contenu dépliable */}
      <DropdownContainer isOpen={isOpen}>
        <DropdownButton to="/demande">
          Commencer ma démarche
        </DropdownButton>
        <DropdownButton to="/voir-mes-demandes">
          Voir mes demandes
        </DropdownButton>
      </DropdownContainer>
    </Container>
  );
};

export default Adminfils;