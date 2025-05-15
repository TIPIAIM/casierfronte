import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPlay, FaExpand, FaInfoCircle, FaVideo } from "react-icons/fa";
import tutosvoct from "../../assets/videos/tutosvoct.mp4";
import casier from "../../assets/videos/càsier.mp4";

// Palette de couleurs
const colors = {
  primary: "#002B5B",
  secondary: "#1A4D2E",
  accent: "#F2C94C",
  light: "#FFFFFF",
  background: "#F8F9FA",
  textDark: "#333333",
  textLight: "#6C757D"
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styles
const PageContainer = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
`;

const HeroHeader = styled.header`
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  color: ${colors.light};
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: ${gradientBackground} 15s ease infinite;
  background-size: 200% 200%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23f2c94c' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    opacity: 0.3;
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

 

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  background-color: ${colors.accent};
  color: ${colors.primary};
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  position: absolute;
  left: 2rem;
  top: 2rem;
  
  &:hover {
    background-color: ${colors.light};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0,0,0,0.15);
  }

  @media (max-width: 768px) {
    position: relative;
    left: auto;
    top: auto;
    margin-bottom: 1rem;
  }
`;

const TutorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    padding: 20px 15px;
  }
`;

const VideoCard = styled.div`
  background: ${colors.light};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease forwards;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background-color: #000;
`;

const VideoPlayer = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.3);
  opacity: 1;
  transition: opacity 0.3s ease;
  cursor: pointer;
  
  &.playing {
    opacity: 0;
    pointer-events: none;
  }
`;

const PlayIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: rgba(242, 201, 76, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s infinite;
  
  svg {
    color: ${colors.primary};
    font-size: 24px;
  }
`;

const VideoInfo = styled.div`
  padding: 20px;
`;

const VideoTitle = styled.h3`
  color: ${colors.primary};
  font-size: 1.2rem;
  margin: 0 0 10px 0;
  font-weight: 600;
`;

const VideoDescription = styled.p`
  color: ${colors.textLight};
  font-size: 0.95rem;
  margin-bottom: 15px;
  line-height: 1.5;
`;

const VideoMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.textLight};
  font-size: 0.85rem;
`;

const VideoDuration = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const FullscreenButton = styled.button`
  background: none;
  border: none;
  color: ${colors.textLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${colors.accent};
  }
`;

const InfoSection = styled.div`
  background-color: ${colors.light};
  border-radius: 10px;
  padding: 25px;
  margin: -20px auto 30px;
  max-width: 800px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  position: relative;
  z-index: 3;
  
  svg {
    color: ${colors.accent};
    font-size: 2rem;
    margin-right: 15px;
  }
  
  @media (max-width: 768px) {
    margin: 0 auto 20px;
    padding: 20px;
  }
`;

const InfoContent = styled.div`
  h3 {
    color: ${colors.primary};
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  p {
    color: ${colors.textLight};
    line-height: 1.6;
    margin: 0;
  }
`;

const Videoexpli = () => {
  const videoRefs = useRef([]);
  const overlayRefs = useRef([]);

  const videos = [
    {
      title: "Introduction au Casier Judiciaire",
      description: "Découvrez les bases du casier judiciaire, son utilité et son importance dans les démarches administratives et professionnelles.",
      src: tutosvoct,
      duration: "2:45"
    },
    {
      title: "Procédure Complète de Demande",
      description: "Guide étape par étape pour faire une demande de casier judiciaire en ligne, avec les documents requis.",
      src: casier,
      duration: "4:20"
    },
    {
      title: "Types de Casiers Judiciaires",
      description: "Comprenez les différences entre le bulletin n°1, n°2 et n°3 et leurs utilisations respectives.",
      src: tutosvoct,
      duration: "3:15"
    },
    {
      title: "Confidentialité et Sécurité",
      description: "Comment vos données personnelles sont protégées lors de la demande de votre casier judiciaire.",
      src: casier,
      duration: "2:30"
    },
    {
      title: "Lecture et Interprétation",
      description: "Apprenez à lire et comprendre les informations contenues dans votre casier judiciaire.",
      src: tutosvoct,
      duration: "3:50"
    },
    {
      title: "FAQ - Questions Fréquentes",
      description: "Réponses aux questions les plus courantes sur les casiers judiciaires et la procédure de demande.",
      src: casier,
      duration: "5:10"
    }
  ];

  const handlePlay = (index) => {
    const video = videoRefs.current[index];
    const overlay = overlayRefs.current[index];
    
    if (video.paused) {
      video.play();
      overlay.classList.add('playing');
    } else {
      video.pause();
      overlay.classList.remove('playing');
    }
  };

  const handleFullscreen = (index) => {
    const video = videoRefs.current[index];
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  return (
    <PageContainer>
      <HeroHeader>
        <BackButton to="/debut">
          <FaArrowLeft /> Retour
        </BackButton>
        
        <HeaderContent>
        
          <HeaderTitle>Tutoriels Vidéo - Casier Judiciaire</HeaderTitle>
          <HeaderSubtitle>
            Guide complet pour comprendre et demander votre casier judiciaire en ligne
          </HeaderSubtitle>
        </HeaderContent>
      </HeroHeader>

      <InfoSection>
        <FaInfoCircle />
        <InfoContent>
          <h3>Guide Complet en Vidéo</h3>
          <p>
            Ces tutoriels vidéo vous guideront à travers chaque étape du processus 
            de demande de casier judiciaire. Appuyez sur lecture pour visionner 
            chaque vidéo et utilisez le bouton plein écran pour une meilleure visibilité.
          </p>
        </InfoContent>
      </InfoSection>

      <TutorialGrid>
        {videos.map((video, index) => (
          <VideoCard key={index}>
            <VideoContainer>
              <VideoPlayer 
                ref={el => videoRefs.current[index] = el}
                src={video.src} 
                controls 
                preload="metadata"
                onClick={() => handlePlay(index)}
              />
              <PlayOverlay 
                ref={el => overlayRefs.current[index] = el}
                onClick={() => handlePlay(index)}
              >
                <PlayIcon>
                  <FaPlay />
                </PlayIcon>
              </PlayOverlay>
            </VideoContainer>
            <VideoInfo>
              <VideoTitle>{video.title}</VideoTitle>
              <VideoDescription>{video.description}</VideoDescription>
              <VideoMeta>
                <VideoDuration>
                  <FaPlay size={12} /> {video.duration}
                </VideoDuration>
                <FullscreenButton onClick={() => handleFullscreen(index)}>
                  <FaExpand size={14} /> Plein écran
                </FullscreenButton>
              </VideoMeta>
            </VideoInfo>
          </VideoCard>
        ))}
      </TutorialGrid>
    </PageContainer>
  );
};

export default Videoexpli;