import React, {useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt } from "react-icons/fa";
import jurid1 from "../../assets/jurid1.avif";

import guine from "../../assets/guine.avif";
import guine1 from "../../assets/guin1.avif";
import guine2 from "../../assets/guin2.avif";
import guine3 from "../../assets/guin3.avif";
import guine4 from "../../assets/guin4.avif";
import guine5 from "../../assets/guin5.avif";
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
    flex-direction: column;
 

  }
`;

// Section pour l'image
const ImageSection = styled.div`
  flex: 1;
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
    bottom: 30%;
    left: 50%;
    transform: translateX(-50%);
    color: ${colors.white};
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    line-height: 1.5;
    background: rgba(0, 0, 0, 0.5);
    padding: 15px;
    white-space: pre-wrap;


  @media (max-width: 768px) {
      font-size: 1.2rem;
      padding: 10px;   
  }

 @media (max-width: 768px) {
      font-size: 1.2rem;
      padding: 10px;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      padding: 8px;
    }

}
   @media (max-width: 480px) {
    flex: none;
    height: 50vh;
  }
    
  @media (max-width: 480px) {
    flex: none;
    height: 40vh;
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
const Title = styled(motion.h2)`
  margin-bottom: 0.5rem;
  color: ${colors.blueMarine};
  font-size: 1.8rem;
  
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

// Bouton blueMarine: "#002B5B", : "#1A4D2E",
 
const Button = styled(motion.button)`
  padding: 0.8rem;
  background-color: ${colors.greenDark};
  color: ${colors.white};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${colors.goldenYellow};
    color: ${colors.blueMarine};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Lien de connexion
const LoginLink = styled(Link)`
  color: ${colors.greenDark};
  text-decoration: none;
  font-size: 0.7rem;
  text-align: center;
  transition: color 0.3s;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 0;
`;
const Logo = styled.img`
  width: 50px; /* Taille du logo */
  height: 50px; /* Taille du logo */
  border-radius: 50%; /* Rend l'image circulaire */
  object-fit: cover; /* Ajuste l'image pour qu'elle remplisse le cercle */
`;
const Senregistrer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [guine3,guine4,guine5 ,jurid1, guine2, guine, guine1];


const texts = [
  "Bienvenue sur la plateforme officielle du casier judiciaire.\nSimplifiez vos démarches administratives.",
  "Accédez à vos informations en toute sécurité.\nUn service rapide et fiable.",
  "Gérez vos documents juridiques en ligne.\nUne plateforme moderne et intuitive.",
  "Votre casier judiciaire à portée de main.\nConfiance et confidentialité garanties.",
  "Votre casier judiciaire à portée de main.\nConfiance et confidentialité garanties.",
  "Service disponible 24h/24, 7j/7.\nConsultez quand vous voulez, où vous voulez.",
    "Validation instantanée pour vos démarches.\nGagnez du temps sur vos formalités."

];
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 2000); // Change d'image toutes les 2 secondes

    return () => clearInterval(interval); // Nettoie l'intervalle à la fin
  }, [images.length]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      const response = await axios.post(
        "http://localhost:2027/api/auth/register",
        {
          name,
          email,
          password,
          age,
        }
      );
      if (response.data) {
        alert("Enregistrement réussi !");
        navigate("/seconnecter");
      } else {
        setErrorMessage(response.data.message || "Erreur d'enregistrement");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 
        "Erreur lors de l'enregistrement. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
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
          onSubmit={handleRegister}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <div
      style={{
        display: "flex",
        flexDirection: "row", // Aligne le logo et le titre sur la même ligne
        alignItems: "center", // Centre verticalement
        justifyContent: "center", // Centre horizontalement
        marginBottom: "0px", // Ajoute un espace sous le conteneur
        gap: "10px", // Ajoute un espace entre le logo et le titre
      }}
    >
      <Logo src={jurid1} alt="Logo" />
      <Title>S'enregistrer</Title>
    </div>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

          <InputGroup>
            <FaUser />
            <input
              type="text"
              placeholder="Nom et prénom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <FaEnvelope />
            <input
              type="email"
              placeholder="Votre Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <FaLock />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </InputGroup>

          <InputGroup>
            <FaCalendarAlt />
            <input
              type="number"
              placeholder="Votre âge"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="18"
              max="120"
            />
          </InputGroup>

          <Button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "En cours..." : "Enregistrer"}
          </Button>

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Déjà un compte ?{" "}
            <LoginLink to="/seconnecter">Connectez-vous ici</LoginLink>
          </p>
        </Form>
      </FormSection>
    </Container>
  );
};

export default Senregistrer;