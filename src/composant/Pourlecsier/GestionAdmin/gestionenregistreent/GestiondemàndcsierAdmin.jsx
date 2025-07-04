import DemandesList from "./DemandesList";
import Commencerdemdmin from "./Commencerdemdmin";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ClipboardList, FilePlus } from "lucide-react";

// ========== ANIMATIONS ==========
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// ========== STYLED COMPONENTS ==========

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  // margin-bottom: 2rem;
  animation: ${slideIn} 0.4s ease-out;

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.1rem;
  animation: ${fadeIn} 0.7s ease-out;

  @media (max-width: 640px) {
    width: 100%;
    padding: 0 0.5rem;
    flex-direction: column;
  }
`;

const TabButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #cbd5e0;
  cursor: pointer;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: #F2C94C;
  color: #4a5568;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #1a4d2e;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #f0f4f8;
    transform: translateY(-2px);

    &::after {
      transform: scaleX(1);
    }
  }

  &.active {
    background-color: #1a4d2e;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: none;
    animation: ${pulse} 0.5s ease;

    &::after {
      transform: scaleX(1);
      background-color: white;
    }
  }

  @media (max-width: 640px) {
    flex: 1;
    padding: 0.8rem;
    font-size: 0.85rem;
    justify-content: center;
  }
`;

const MainContent = styled.main`
  background-color: white/10;

  box-shadow:  2px 2px rgba(0, 0, 0, 0.09);
  padding: 2rem;
  min-height: 60vh;
  animation: ${fadeIn} 0.8s ease-out;

  @media (min-width: 768px) {
    padding: 2.5rem;
  }
  @media (max-width: 640px) {
    padding: 0rem;
    border-radius: 0;
    box-shadow: none;
    margin-top: 0.5rem;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  color: #002b5b;
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 640px) {
  padding: 0rem ;
  }
`;

export default function GestiondemàndcsierAdmin() {
  const [activeView, setActiveView] = useState("form");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderTop>
           
        </HeaderTop>

        <ButtonGroup style={{ animationDelay: "0.3s" }}>
          <TabButton
            className={activeView === "form" ? "active" : ""}
            onClick={() => handleViewChange("form")}
          >
            <FilePlus size={18} />
            Enregistrer
          </TabButton>
          <TabButton
            className={activeView === "list" ? "active" : ""}
            onClick={() => handleViewChange("list")}
          >
            <ClipboardList size={18} />
            Liste
          </TabButton>
        </ButtonGroup>
      </HeaderContainer>

      <MainContent style={{ animationDelay: "0.4s" }}>
        {isMounted &&
          (activeView === "form" ? <Commencerdemdmin /> : <DemandesList />)}
      </MainContent>
    </Container>
  );
}
