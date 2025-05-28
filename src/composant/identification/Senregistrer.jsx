import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import jurid1 from "../../assets/jurid1.avif";
import guine from "../../assets/guine.avif";
import guine1 from "../../assets/guin1.avif";
import guine2 from "../../assets/guin2.avif";
import guine3 from "../../assets/guin3.avif";
import guine4 from "../../assets/guin4.avif";
import guine5 from "../../assets/guin5.avif";

const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
};

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background: url(${guine2}) no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(120deg, rgba(0, 43, 91, 0.85), rgba(26, 77, 46, 0.8));
    z-index: 1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  padding: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
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
    background: rgba(0, 0, 0, 0.5);
    padding: 15px;
    border-radius: 12px;
  }
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  color: ${colors.goldenYellow};
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: ${colors.white};
  }
`;

const Form = styled(motion.form)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  text-align: center;
  color: ${colors.goldenYellow};
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;
  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    color: ${colors.goldenYellow};
  }
  input {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 3rem;
    border-radius: 8px;
    border: none;
    background-color: rgba(255, 255, 255, 0.2);
    color: ${colors.white};
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(242, 201, 76, 0.3);
    }
  }
`;

const Button = styled(motion.button)`
  background-color: ${colors.goldenYellow};
  color: ${colors.greenDark};
  font-weight: bold;
  width: 100%;
  padding: 0.75rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;
  &:hover {
    background-color: ${colors.greenDark};
    color: ${colors.goldenYellow};
  }
`;

const ErrorMessage = styled.p`
  color: #f87171;
  text-align: center;
  font-size: 0.9rem;
`;

const LoginLink = styled(Link)`
  color: ${colors.white};
  font-size: 0.85rem;
  text-align: center;
  display: block;
  margin-top: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const Senregistrer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const images = [guine3, guine4, guine5, jurid1, guine2];
  const texts = [
    "Bienvenue sur la plateforme officielle du casier judiciaire.\nSimplifiez vos démarches administratives.",
    "Accédez à vos informations en toute sécurité.\nUn service rapide et fiable.",
    "Gérez vos documents juridiques en ligne.\nUne plateforme moderne et intuitive.",
    "Votre casier judiciaire à portée de main.\nConfiance et confidentialité garanties.",
    "Service disponible 24h/24, 7j/7.\nConsultez quand vous voulez, où vous voulez.",
    "Validation instantanée pour vos démarches.\nGagnez du temps sur vos formalités.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_b}/api/auth/register`, { name, email, password });
      if (response.data.success) {
        alert("Enregistrement réussi ! Veuillez vérifier votre email.");
        navigate("/verify-email");
      } else {
        setErrorMessage(response.data.message || "Erreur d'enregistrement");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Erreur lors de l'enregistrement. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Content>
        <ImageSection>
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`carousel-image ${idx === currentImage ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
          <div className="carousel-text">{texts[currentImage]}</div>
        </ImageSection>

        <FormSection>
          <BackButton to="/debut"><FaArrowLeft /></BackButton>
          <Form
            onSubmit={handleRegister}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
  <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <Logo src={jurid1} alt="Logo" />
            <Title>Créer un compte</Title>
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
                placeholder="Email"
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
            <Button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isSubmitting}>
              {isSubmitting ? "Enregistrement..." : "S'enregistrer"}
            </Button>
            <LoginLink to="/seconnecter">J'ai éjà un compte  </LoginLink>
          </Form>
        </FormSection>
      </Content>
    </Container>
  );
};

export default Senregistrer;
