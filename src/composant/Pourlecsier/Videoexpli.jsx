import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom"; // Import du composant Link
import { FaArrowLeft } from "react-icons/fa"; // Import de l'icône de retour
import tutosvoct from "../../assets/videos/tutosvoct.mp4";
import càsier from "../../assets/videos/càsier.mp4";


// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
};

// Animation pour l'apparition des vidéos
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;
// Style pour le bouton retour avec icône
const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 20px 10px;
  padding: 10px 10px;
  //background-color: ${colors.goldenYellow};
  color: ${colors.blueMarine};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50%;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: ${colors.greenDark};
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
// Conteneur principal
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background-color:rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
     gap: 25px;
      padding: 30px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

// Style pour chaque vidéo ou image
const VideoItem = styled.div`
  
  overflow: hidden;
  box-shadow: 4px 1px  ${colors.greenDark};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: ${colors.white};
  padding: 10px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 1px  ${colors.blueMarine};
  }
`;

// Style pour le titre de la vidéo
const VideoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.blueMarine};
  margin: 10px 0;
  text-align: center;
`;

// Style pour la description de la vidéo
const VideoDescription = styled.p`
  font-size: 0.9rem;
  color: ${colors.greenDark};
  text-align: center;
  margin-bottom: 10px;
`;

// Style pour la vidéo
const Video = styled.video`
  animation: ${fadeIn} 0.5s ease-in;
  width: 100%;
  height: auto;
  cursor: pointer;
  border-radius: 2px;
`;

const Videoexpli = () => {
  // Fonction pour afficher la vidéo en plein écran
  const handleVideoClick = (e) => {
    const videoElement = e.target;
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen(); // Active le mode plein écran
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen(); // Pour Safari
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen(); // Pour IE/Edge
    }
  };

  // Liste des vidéos avec titre et description
  const videos = [
    {
      title: "Introduction au Casier Judiciaire",
      description:
        "Découvrez les bases du casier judiciaire et son importance.",
      src: tutosvoct,
    },
    {
      title: "Comment Obtenir un Casier Judiciaire",
      description: "Apprenez les étapes pour obtenir votre casier judiciaire.",
      src: càsier,
    },
    {
      title: "Les Types de Casier Judiciaire",
      description: "Comprenez les différents types de casiers judiciaires.",
      src: tutosvoct,
    },
    {
      title: "Confidentialité et Sécurité",
      description: "Découvrez comment vos données sont protégées.",
      src: càsier,
    },
    {
      title: "Utilisation de la Plateforme",
      description: "Guide pour utiliser notre plateforme efficacement.",
      src:tutosvoct,
    },
    {
      title: "Questions Fréquemment Posées",
      description: "Réponses aux questions les plus courantes.",
      src: càsier,
    },
  ];

  return (
    <>
      {/* Bouton Retour */}
      {/* Bouton Retour avec icône */}
      <BackButton to="/debut">
        <FaArrowLeft /> {/* Icône de retour */}
      </BackButton>
      {/* Conteneur des vidéos */}
      <Container>
        {videos.map((video, index) => (
          <VideoItem key={index}>
            <VideoTitle>{video.title}</VideoTitle>
            <VideoDescription>{video.description}</VideoDescription>
            <Video src={video.src} controls onClick={handleVideoClick} />
          </VideoItem>
        ))}
      </Container>
    </>
  );
};

export default Videoexpli;
