import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";
import DemandesList from "./DemandesList";
import Commencerdemdmin from "./Commencerdemdmin";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  color: #002b5b;
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
  
  @media (max-width: 640px) {
    padding: 0.5rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #1A4D2E;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: #e8f3ee;
    transform: translateX(-2px);
  }

  &:focus {
    outline: 2px solid #1A4D2E;
    outline-offset: 2px;
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;

  }

  @media (max-width: 640px) {
    font-size: 1.5rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 640px) {
    width: 100%;
    padding: 0 1.5rem;
  }
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 1px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${({ active }) => active
    ? `
      background-color: #1A4D2E;
      color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    `
    : `
      background-color: #e2e8f0;
      color: #4a5568;
      border: 1px solid #cbd5e0;

      &:hover {
        background-color: #f0f4f8;
      }
    `
  }

  @media (max-width: 640px) {
    flex: 1;
    padding: 0.8rem;
    font-size: 0.8rem;
    justify-content: center;
  }
`;

const MainContent = styled.main`
  background-color: white;
  
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 640px) {
    padding: 1rem;
    border-radius: 0;
    box-shadow: none;
    margin-top: 0.5rem;
  }
`;

export default function GestiondemàndcsierAdmin() {
  const [vueActive, setVueActive] = useState("formulaire");
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Retour à la page précédente
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderTop>
          <BackButton onClick={handleGoBack} aria-label="Retour">
            <ArrowLeft size={24} />
          </BackButton>
          <Title>
            <span role="img" aria-label="Clipboard">📋</span>
            Gestion des demandes
          </Title>
        </HeaderTop>
        
        <ButtonGroup>
          <TabButton
            active={vueActive === "formulaire"}
            onClick={() => setVueActive("formulaire")}
          >
            Enregistrer
          </TabButton>
          <TabButton
            active={vueActive === "liste"}
            onClick={() => setVueActive("liste")}
          >
            Lister
          </TabButton>
        </ButtonGroup>
      </HeaderContainer>

      <MainContent>
        {vueActive === "formulaire" ? <Commencerdemdmin /> : <DemandesList />}
      </MainContent>
    </Container>
  );
}