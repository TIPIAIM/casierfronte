// InstallPWAButton.jsx

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiDownloadCloud } from "react-icons/fi";

const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
};

// Animation du gradient sur le texte
const shine = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

// Rayon lumineux mobile sur le texte
const lightRay = keyframes`
  0% { left: -30%; }
  60% { left: 100%; }
  100% { left: 130%; }
`;

const Btn = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 14px 30px;
  background: linear-gradient(100deg, ${colors.blueMarine} 0%, ${colors.greenDark} 70%, ${colors.goldenYellow} 100%);
  border: none;
  border-radius: 20px;
  font-weight: 900;
  font-size: 1.13em;
  box-shadow: 0 2px 24px ${colors.blueMarine}33, 0 2px 1px ${colors.goldenYellow}22;
  z-index: 9999;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  gap: 13px;
  transition: transform 0.17s cubic-bezier(0.2, 0.9, 0.4, 1), box-shadow 0.18s;
  overflow: hidden;

  &:hover,
  &:focus {
    transform: translateY(-5px) scale(1.04);
    box-shadow: 0 8px 32px ${colors.goldenYellow}55, 0 2px 8px ${colors.blueMarine}33;
  }
`;

const AnimatedText = styled.span`
  position: relative;
  background: linear-gradient(
    90deg,
    ${colors.white} 15%,
    ${colors.goldenYellow} 40%,
    ${colors.greenDark} 60%,
    ${colors.blueMarine} 85%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: ${shine} 2.2s linear infinite;
  font-weight: 900;
  letter-spacing: -0.01em;

  &::after {
    content: "";
    position: absolute;
    left: -30%;
    top: 0;
    width: 70%;
    height: 100%;
    background: linear-gradient(
      100deg,
      rgba(255,255,255,0.12) 15%,
      rgba(255,255,255,0.68) 32%,
      transparent 82%
    );
    filter: blur(2.5px);
    transform: skewX(-13deg);
    animation: ${lightRay} 2.7s cubic-bezier(.15,.68,.31,1) infinite;
    pointer-events: none;
  }

  ${Btn}:hover &,
  ${Btn}:focus & {
    animation-duration: 1s;
    filter: drop-shadow(0 0 8px ${colors.goldenYellow}99) drop-shadow(0 0 6px ${colors.blueMarine}88);

    &::after {
      animation-duration: 1.2s;
    }
  }
`;

const IconCloud = styled(FiDownloadCloud)`
  font-size: 1.5em;
  margin-right: 6px;
  vertical-align: middle;
  color: ${colors.white};
  filter: drop-shadow(0 1px 3px ${colors.blueMarine}33);
  transition: transform 0.2s;
  ${Btn}:hover &,
  ${Btn}:focus & {
    transform: scale(1.18) rotate(-12deg);
    filter: drop-shadow(0 0 8px ${colors.goldenYellow}88);
  }
`;

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(true); // Toujours visible !
  const [installed, setInstalled] = useState(false);

  // On tracke manuellement si c'est installé (en plus de l'événement natif)
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstalled(false);
      setShowButton(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setShowButton(true); // Le bouton reste, mais état différent
      localStorage.setItem("pwa_installed", "yes"); // Pour plus de contrôle
    });

    // Vérifie déjà installé (prévient le bouton sur les navigateurs modernes)
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
      setInstalled(true);
      localStorage.setItem("pwa_installed", "yes");
    } else if (localStorage.getItem("pwa_installed") === "yes") {
      setInstalled(true);
    }
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setInstalled(true);
        localStorage.setItem("pwa_installed", "yes");
      }
      setDeferredPrompt(null);
    } else {
      // Si le prompt n'est pas dispo, donne une astuce
      alert(
        "Pour installer l'application, ouvrez le menu de votre navigateur et choisissez 'Ajouter à l'écran d'accueil'."
      );
    }
    if (window.navigator.vibrate) window.navigator.vibrate(18);
  };

  if (!showButton) return null;

  return (
    <Btn
      onClick={installed ? undefined : handleInstallClick}
      aria-label={installed ? "Déjà installée" : "Installer"}
      disabled={installed}
      style={{
        opacity: installed ? 0.62 : 1,
        cursor: installed ? "not-allowed" : "pointer",
      }}
    >
      <IconCloud />
      <AnimatedText>
        {installed ? "Déjà installée" : "Installer"}
      </AnimatedText>
    </Btn>
  );
};

export default InstallPWAButton;