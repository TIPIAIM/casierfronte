import React, { useState,useEffect  } from "react";
import styled, { keyframes } from "styled-components";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

// Animations et styles existants...
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

const handBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("/img/guin2.avif");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 20px;
  animation: ${fadeInUp} 1.2s ease-out;
  width: 90%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: 500;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: none;
  width: 100%;
  color: #333;
  max-width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const IconButton = styled.button`
  padding: 0.8rem;
  font-size: 1.2rem;
  background-color: #f2c94c;
  color: #1a4d2e;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #e0b939;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const HandIcon = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #f2c94c;
  animation: ${handBounce} 1.5s infinite;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 1rem;
  font-weight: 500;
  animation: ${fadeInUp} 0.5s ease-out;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  gap: 8px;
  padding: 5px 10px;
     background-color: #F2C94C;
  color: #002B5B;
  border-radius: 50px;
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1rem;
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
   left: 2rem;
  top: 2rem;
   &:hover {
    background-color: #FFFFFF;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    position: relative;
    left: auto;
    top: auto;
    margin-bottom: 1rem;
  }
`;

const Voirmademande = () => {
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
 useEffect(() => {
    const refFromUrl = searchParams.get("ref");
    if (refFromUrl) {
      setReference(refFromUrl);
      handleSubmit(refFromUrl); // lancement auto de la recherche
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    setReference(e.target.value);
    setError("");
  };


  const handleSubmit = async () => {
    if (!reference.trim()) {
      setError("Veuillez entrer la référence de demande");
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
          credentials: "include", // 👈 Ajoute ceci !
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
    navigate("/adminfils"); // Retour à la page précédente
  };

  return (
    <Wrapper>
      <BackButton onClick={handleGoBack}>
        <FaArrowLeft />
        Fermer
      </BackButton>

      <Overlay />
      <Content>
        <Title>Vérifiez votre casier judiciaire</Title>
        <Subtitle>
          Entrez votre référence de demande (ex: CR-123456-0001) pour vérifier
          l'état de votre dossier.
        </Subtitle>

        <HandIcon>👇</HandIcon>

        <InputGroup>
          <InputField
            type="text"
            placeholder="Référence de demande (CR-... ...)"
            value={reference}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          />
          <IconButton onClick={handleSubmit}>
            <FaSearch />
          </IconButton>
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Content>
    </Wrapper>
  );
};

export default Voirmademande;
