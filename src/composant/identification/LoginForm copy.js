import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
};

// Conteneur principal
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  min-height: 100vh;
  background: ${colors.blueMarine};

  @media (max-width: 768px) {
    flex-direction: column; /* Empile l'image et le formulaire sur petits écrans */
  }
`;

// Section pour l'image avec carrousel
const ImageSection = styled.div`
  flex: 2;
  position: relative;
  background: ${colors.blueMarine};
  overflow: hidden;

  .carousel-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: opacity 1s ease-in-out;
    opacity: 0;
  }

  .carousel-image.active {
    opacity: 1;
  }

  .carousel-text {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    color: ${colors.white};
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    line-height: 1.5;
    background: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 8px;
    white-space: pre-wrap; /* Permet les sauts de ligne */
    animation: fadeIn 1s ease-in-out;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      padding: 15px;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      padding: 10px;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;

// Section pour le formulaire
const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: ${colors.greenDark};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

// Formulaire
const Form = styled(motion.form)`
  background: ${colors.white};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 3px 2px 0px ${colors.goldenYellow};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 450px;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

// Titre
const Title = styled.h2`
  color: ${colors.blueMarine};
  font-size: 1.8rem;
  text-align: center;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

// Champ de saisie avec icône
const InputGroup = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: ${colors.goldenYellow};
    font-size: 1rem;
  }

  input {
    width: 100%;
    padding: 0.8rem 0.8rem 0.8rem 2.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      border-color: ${colors.goldenYellow};
      outline: none;
      box-shadow: 0 0 0 2px rgba(242, 201, 76, 0.2);
    }

    &::placeholder {
      color: #999;
    }
  }
`;

// Bouton
const Button = styled(motion.button)`
  padding: 0.8rem;
  background-color: ${colors.greenDark};
  color: ${colors.white};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.goldenYellow};
    color: ${colors.blueMarine};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Lien de mot de passe oublié
const ForgotPasswordLink = styled(Link)`
  color: ${colors.goldenYellow};
  text-decoration: none;
  font-size: 0.9rem;
  text-align: center;
  transition: color 0.3s;

  &:hover {
    color: ${colors.white};
  }
`;

const LoginForm = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/img/jurid1.avif",
    "/img/jurid2.avif",
    "/img/jurid3.avif",
    "/img/jurid4.avif",
  ];

  const texts = [
    "Bienvenue sur la plateforme officielle du casier judiciaire.\nSimplifiez vos démarches administratives.",
    "Accédez à vos informations en toute sécurité.\nUn service rapide et fiable.",
    "Gérez vos documents juridiques en ligne.\nUne plateforme moderne et intuitive.",
    "Votre casier judiciaire à portée de main.\nConfiance et confidentialité garanties.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change d'image toutes les 5 secondes

    return () => clearInterval(interval); // Nettoie l'intervalle à la fin
  }, [images.length]);

  return (
    <Container>
      {/* Section Image avec carrousel */}
      <ImageSection>
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-image ${index === currentImage ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
        <div className="carousel-text">{texts[currentImage]}</div>
      </ImageSection>

      {/* Section Formulaire */}
      <FormSection>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Connexion soumise");
          }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Connexion</Title>

          {/* Champ Email */}
          <InputGroup>
            <FaEnvelope />
            <input type="email" placeholder="Votre Email" required />
          </InputGroup>

          {/* Champ Mot de passe */}
          <InputGroup>
            <FaLock />
            <input type="password" placeholder="Mot de passe" required />
          </InputGroup>

          {/* Bouton Connexion */}
          <Button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Connexion
          </Button>

          <ForgotPasswordLink to="/motdepasseoublie">
            Mot de passe oublié ?
          </ForgotPasswordLink>
        </Form>
      </FormSection>
    </Container>
  );
};

export default LoginForm;
