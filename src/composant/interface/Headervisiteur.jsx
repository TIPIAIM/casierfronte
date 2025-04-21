import React from "react";
import styled, { keyframes } from "styled-components";
import { FaGavel, FaUserCheck, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import du composant Link pour les liens internes

const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
};

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

const colorCycle = keyframes`
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

const HeroSection = styled.section`
  background: linear-gradient(
    to right,
    ${colors.blueMarine},
    ${colors.greenDark}
  );
  padding: 100px 20px;
  text-align: center;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 20px;
  animation: ${colorCycle} 6s infinite;
  text-wrap: balance;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  max-width: 750px;
  margin-bottom: 30px;
  text-align: center;
`;

const ReaderContainer = styled.section`
  background: ${colors.white};
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInUp} 2s ease-in-out;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.blueMarine};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.7rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
    margin-bottom: 20px;
  }
`;

const Description = styled.p`
  font-size: 1.05rem;
  max-width: 780px;
  color: ${colors.greenDark};
  margin-bottom: 30px;
  @media (max-width: 768px) {
    text-align: left;
    margin-left: 1rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    text-align: left;
    margin-left: 1rem;
    margin-bottom: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 50px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ActionButton = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  margin: 10px;
  background-color: ${colors.goldenYellow}; /* Couleur bleu marine */
  color: ${colors.blueMarine}; /* Couleur blanche */
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 1px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${colors.blueMarine}; /* Couleur dorée */
    color: ${colors.goldenYellow}; /* Couleur bleu marine */
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
const StepsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
`;

const StepCard = styled.div`
  background: ${colors.blueMarine};
  color: ${colors.white};
  padding: 30px;
  width: 100%;
  max-width: 290px;
  box-shadow: 2px px ${colors.greenDark};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin: 1rem;
  }

  @media (max-width: 480px) {
    max-width: 320px;
  }

  &:hover {
    transform: translateY(-10px);
  }

  svg {
    font-size: 2.2rem;
    margin-bottom: 16px;
    color: ${colors.goldenYellow};
  }
 h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    text-align: center; /* Alignement par défaut */

    @media (max-width: 768px) {
      font-size: 1.1rem; /* Réduction de la taille sur tablette */
      text-align: left; /* Alignement à gauche sur tablette */
    }

    @media (max-width: 480px) {
      font-size: 1rem; /* Réduction de la taille sur mobile */
      text-align: center; /* Alignement à gauche sur mobile */
    }
  }


 p {
    font-size: 0.95rem;
    color: ${colors.white};
    text-align: center; /* Alignement par défaut */

    @media (max-width: 768px) {
      font-size: 0.9rem; /* Réduction de la taille sur tablette */
      text-align: left; /* Alignement à gauche sur tablette */
    }

    @media (max-width: 480px) {
      font-size: 0.85rem; /* Réduction de la taille sur mobile */
      text-align: center; /* Alignement à gauche sur mobile */
    }
  }
`;

const Reader = () => {
  return (
    <>
      <HeroSection>
        <HeroTitle>Votre Casier Judiciaire en Ligne</HeroTitle>
        <HeroSubtitle>
          Simplifiez vos démarches juridiques. Faites votre demande depuis chez
          vous, sans file d'attente, en toute sécurité et légalité.
        </HeroSubtitle>
        <ButtonContainer>
          <ActionButton to="/suivre-casier">Accéder au suivi</ActionButton>
          <ActionButton to="/videoexplic">Vidéo tutorielle ?</ActionButton>
        </ButtonContainer>
      </HeroSection>

      <ReaderContainer>
        <Title>Comment ça fonctionne ?</Title>
        <Description>
          Notre plateforme juridique en ligne vous permet de faire votre demande
          de casier judiciaire en toute autonomie, avec un accompagnement
          professionnel à chaque étape.
        </Description>

        <StepsContainer>
          <StepCard>
            <FaUserCheck />
            <h3>1. Créez votre compte</h3>
            <p>
              Inscrivez-vous avec votre pièce d'identité et vos informations
              personnelles.
            </p>
          </StepCard>
          <StepCard>
            <FaGavel />
            <h3>2. Déposez votre demande</h3>
            <p>
              Remplissez le formulaire en ligne et suivez les étapes intuitives
              de validation.
            </p>
          </StepCard>
        
          <StepCard>
            <FaDownload />
            <h3>3. Téléchargez votre casier</h3>
            <p>
              Recevez votre casier judiciaire validé par email ou téléchargez-le
              directement ici.
            </p>
          </StepCard>
        </StepsContainer>
      </ReaderContainer>
    </>
  );
};
{/** */}
export default Reader;
