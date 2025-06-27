import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa";
import LogoutButton from "../identification/Deconne";
import { motion } from "framer-motion";
import AvatarProfileButton from "../Profile/AvatarProfileButton";

// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
};

// Animations
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

// Styles
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 100vh;
  padding: 20px;
  background-image: url("/img/jurid1.avif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: ${colors.white};
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

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
  animation: ${glowAnimation} 2s infinite;
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
const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 767px) {
    gap: 0.5rem;
    width: 100%;
    justify-content: flex-start;
  }
`;

const Button = styled(motion.button).attrs(() => ({
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}))`
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  white-space: nowrap;

  &.primary {
    background: ${colors.greenDark};
    color: ${colors.white};
    box-shadow: 0 2px 4px rgba(26, 77, 46, 0.2);
  }

  &.accent {
    background: ${colors.goldenYellow};
    color: ${colors.blueMarine};
    box-shadow: 0 2px 4px rgba(242, 201, 76, 0.3);
  }

  &.outline {
    background: transparent;
    border: 1px solid ${colors.blueMarine};
    color: ${colors.blueMarine};
  }

  @media (max-width: 767px) {
    padding: 0.5rem 0.9rem;
    font-size: 0.85rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 479px) {
    flex-grow: 1;
    justify-content: center;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 5px;
  max-height: ${(props) => (props.isOpen ? "200px" : "0")};
  overflow: hidden;
  animation: ${(props) => (props.isOpen ? dropdownFadeIn : "none")} 0.3s
    ease-out;
`;

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
<div>
 <AvatarProfileButton/>
 <Container>  
      <ButtonGroup>
     
        <Button className="">
          <LogoutButton /> {/* Utilisation de votre composant LogoutButton */}
          Deconexion
        </Button>
      </ButtonGroup>

      <Heading>
        Sécurité et légalité depuis chez vous sans file d'attente.
      </Heading>

      <MainButton onClick={toggleDropdown}>
        <span>Commencer </span>
        <FaLayerGroup />
      </MainButton>

      <DropdownContainer isOpen={isOpen}>
        <DropdownButton to="/demande">Commencer ma démarche</DropdownButton>
        <DropdownButton to="/voir-mes-demandes">
          Voir mes demandes
        </DropdownButton>
      </DropdownContainer>
    </Container>
</div>
  
  );
};

export default Adminfils;
