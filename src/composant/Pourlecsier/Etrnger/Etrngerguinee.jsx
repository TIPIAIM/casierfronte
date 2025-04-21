import React, { useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";

// Couleurs premium
const colors = {
  deepBlue: "#001A3A",
  emerald: "#0E7146",
  gold: "#FFD700",
  platinum: "#E5E4E2",
  electricBlue: "#00B4FF",
};

// Animations avancées
const particleExplosion = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
`;

const cyberGlow = keyframes`
  0% { text-shadow: 0 0 5px ${colors.electricBlue}; }
  50% { text-shadow: 0 0 20px ${colors.electricBlue}, 0 0 30px ${colors.gold}; }
  100% { text-shadow: 0 0 5px ${colors.electricBlue}; }
`;

const binaryRain = keyframes`
  from { background-position: 0 0; }
  to { background-position: 0 100vh; }
`;

// Composant de particules animées
const Particle = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${colors.electricBlue};
  opacity: 0;
  animation: ${particleExplosion} 1.5s ease-out;
`;

// Overlay binaire futuriste
const BinaryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(transparent 95%, rgba(0, 180, 255, 0.05) 95%),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 1px,
      rgba(0, 180, 255, 0.03) 1px,
      rgba(0, 180, 255, 0.03) 2px
    );
  background-size: 100% 30px;
  animation: ${binaryRain} 40s linear infinite;
  pointer-events: none;
  mix-blend-mode: screen;
`;

// Conteneur principal avec effet de profondeur
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: 
    radial-gradient(circle at 20% 30%, ${colors.deepBlue} 0%, #000 70%),
    linear-gradient(135deg, ${colors.deepBlue} 0%, ${colors.emerald} 100%);
  color: ${colors.platinum};
  text-align: center;
  padding: 2rem;
  overflow: hidden;
  position: relative;
  perspective: 1000px;
`;

// Titre avec effet 3D et lueur cybernétique
const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 2rem;
  letter-spacing: 3px;
  color: ${colors.gold};
  text-transform: uppercase;
  transform-style: preserve-3d;
  animation: ${cyberGlow} 3s ease-in-out infinite, float3D 6s ease-in-out infinite;
  position: relative;
  z-index: 2;

  @keyframes float3D {
    0%, 100% { transform: rotateY(0deg) translateY(0); }
    50% { transform: rotateY(5deg) translateY(-10px); }
  }
`;

// Description avec apparition séquentielle des mots
const Description = styled.p`
  font-size: clamp(1.1rem, 2.2vw, 1.4rem);
  margin-bottom: 3rem;
  line-height: 1.8;
  max-width: 800px;
  color: ${colors.platinum};
  opacity: 0;
  animation: fadeInUp 1s ease 1.5s forwards;
  position: relative;
  z-index: 2;

  span {
    display: inline-block;
    opacity: 0;
    animation: wordFadeIn 0.5s ease forwards;
  }

  @keyframes wordFadeIn {
    to { opacity: 1; }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Bouton futuriste avec effet d'onde
const ConnectButton = styled(Link)`
  position: relative;
  padding: 1.2rem 3rem;
  background: transparent;
  color: ${colors.platinum};
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  border: 2px solid ${colors.electricBlue};
  border-radius: 0;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  opacity: 0;
  animation: fadeIn 1s ease 3s forwards;
  z-index: 2;
  transform-style: preserve-3d;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(0, 180, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &:hover {
    color: ${colors.gold};
    border-color: ${colors.gold};
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5),
                0 0 40px rgba(0, 180, 255, 0.3);
    transform: translateY(-3px) rotateX(5deg);

    &::before {
      transform: translateX(100%);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Etrngerguinee = () => {
  const containerRef = useRef(null);
  const descriptionRef = useRef(null);

  // Effet de particules au chargement
  useEffect(() => {
    const container = containerRef.current;
    const description = descriptionRef.current;

    // Animation des mots de la description
    if (description) {
      const words = description.textContent.split(" ");
      description.innerHTML = words.map(word => `<span>${word}</span>`).join(" ");
      
      const spans = description.querySelectorAll("span");
      spans.forEach((span, i) => {
        span.style.animationDelay = `${1.5 + (i * 0.1)}s`;
      });
    }

    // Effet de particules
    const createParticles = () => {
      if (!container) return;
      
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 0.5}s`;
      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1500);
    };

    const interval = setInterval(createParticles, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container ref={containerRef}>
      <BinaryOverlay />
      
      <Title>Bienvenue sur la plateforme officielle</Title>
      <Description ref={descriptionRef}>
        Simplifiez vos démarches administratives en ligne. Connectez-vous pour
        commencer votre demande de casier judiciaire en toute sécurité et
        confidentialité.
      </Description>
      <ConnectButton to="/seconnecter">Se Connecter</ConnectButton>
    </Container>
  );
};

export default Etrngerguinee;