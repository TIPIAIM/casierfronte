import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
`;

const handBounce = keyframes`
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(-10px);}
`;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-image: url("/img/guin2.avif");
  background-size: cover;
  background-position: center;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1;
`;

// Bouton retour "frosted glass"
const BackButton = styled.button`
  position: fixed;
  top: 1.8rem;
  left: 1.3rem;
  gap: 8px;
  padding: 7px 20px;
  background: rgba(255, 255, 255, 0.55);
  color: #002b5b;
  border-radius: 50px;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(12px);
  transition: all 0.22s;

  &:hover {
    background-color: #f2c94c;
    color: #002b5b;
    border: 1.5px solid #ffe082;
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.19);
  }

  @media (max-width: 600px) {
    top: 2rem;
    left: 1rem;
    padding: 7px 15px;
    font-size: 0.95rem;
  }
`;

const ContentContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 82vh;
  z-index: 2;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  //background: rgba(255, 255, 255, 0.35);
  border-radius: 0.1rem;
  box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.52);
  padding: 2rem 2rem 2rem 2rem;
  width: 96vw;
  max-width: 450px;
  margin-top: 4rem; /* espace en haut pour ne pas passer sous le bouton */
  text-align: center;
  color: #232e3a;
  animation: ${fadeInUp} 1.2s cubic-bezier(0.18, 0.77, 0.58, 1.02);
  //border: 1.5px solid rgba(255,255,255,0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(16px);

  @media (max-width: 600px) {
    padding: 1.1rem 0.6rem 1.5rem 0.6rem;
    max-width: 98vw;
    border-radius: 1.1rem;
    margin-top: 2.8rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
  line-height: 1.3;
  color: #ffe082;

  @media (max-width: 600px) {
    font-size: 1.7rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.13rem;
  font-weight: 500;
  margin-top: 0.8rem;
  color: #ffe082;
  line-height: 1.5;
  @media (max-width: 600px) {
    font-size: 1.25rem;
    margin-top: 0.6rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 2.1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.6rem;
    margin-top: 1.5rem;
  }
`;

const InputField = styled.input`
  padding: 12px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 8px 0 0 8px;
  width: 220px;
  min-width: 0;
  color: #232e3a;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: box-shadow 0.15s;
  &:focus {
    box-shadow: 0 0 0 2px #f2c94c80;
  }

  @media (max-width: 600px) {
    width: 100%;
    border-radius: 8px;
    font-size: 0.99rem;
  }
`;

const IconButton = styled.button`
  padding: 0 1.1em;
  min-width: 46px;
  font-size: 1.3rem;
  background: rgba(242, 201, 76, 0.93);
  color: blue;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background 0.3s, transform 0.18s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.11);

  &:hover {
    background-color: #ffe082;
    color: #16371e;
    transform: translateY(-2px) scale(1.09);
  }
  &:active {
    transform: scale(0.96);
  }

  @media (max-width: 600px) {
    width: 100%;
    border-radius: 8px;
    padding: 0.9em 0;
    font-size: 1.1rem;
  }
`;

const HandIcon = styled.div`
  position: absolute;
  top: 72%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.35rem;
  color: blue;
  animation: ${handBounce} 1.5s infinite;
  pointer-events: none;
  @media (max-width: 600px) {
    font-size: 1.13rem;
    top: 79%;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 1rem;
  font-weight: 600;
  animation: ${fadeInUp} 0.5s ease-out;
  font-size: 1rem;

  @media (max-width: 600px) {
    font-size: 0.97rem;
  }
`;

const Voirmademande = () => {
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setReference(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    if (!reference.trim()) {
      setError("Veuillez entrer votre référence de demande");
      return;
    }
    try {
      setError("");
      const response = await fetch(
        `${import.meta.env.VITE_b}/api/demande/by-reference/${reference}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Référence non trouvée");
      }
      if (data.success) {
        navigate(`/demandeid/${data.data._id}`, {
          state: { demande: data.data },
        });
      }
    } catch (err) {
      setError(err.message || "Une erreur s'est produite");
      console.error("Erreur:", err);
    }
  };

  const handleGoBack = () => {
    navigate("/adminfils");
  };

  return (
    <Wrapper>
      <BackButton onClick={handleGoBack}>
        <FaArrowLeft />
        Fermer
      </BackButton>
      <Overlay />
      <ContentContainer>
        <Content>
          <Title>Vérifiez votre casier judiciaire</Title>
          <Subtitle>
            Entrez votre référence de demande (ex: CR-123456-0001) pour vérifier
            l'état de votre dossier.
          </Subtitle>
          <HandIcon aria-hidden>👇</HandIcon>
          <InputGroup>
            <InputField
              type="text"
              placeholder="Référence de demande (CR-...)"
              value={reference}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              aria-label="Entrer la référence de demande"
            />
            <IconButton onClick={handleSubmit} aria-label="Rechercher">
              <FaSearch />
            </IconButton>
          </InputGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Content>
      </ContentContainer>
    </Wrapper>
  );
};

export default Voirmademande;
