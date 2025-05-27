import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { login, loginAfter2FA } from "./authService";
import jurid1 from "../../assets/jurid1.avif";
import guine from "../../assets/guine.avif";
import guine1 from "../../assets/guin1.avif";
import guine2 from "../../assets/guin2.avif";
import guine3 from "../../assets/guin3.avif";
import guine4 from "../../assets/guin4.avif";
import guine5 from "../../assets/guin5.avif";

// Palette de couleurs améliorée avec des variations
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
  blueLight: "rgba(0, 43, 91, 0.8)",
  greenLight: "rgba(26, 77, 46, 0.8)",
  goldenLight: "rgba(242, 201, 76, 0.2)"
};

const Logo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.p`
  color: #f87171;
  text-align: center;
  font-size: 0.9rem;
`;
//guine2 Content
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
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
//FormSection
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
//BackButton
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
const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
 color: ${colors.white};
  font-size: 0.85rem;
  text-align: center;
  display: block;
  margin-top: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;
//ImageSection LoginLink
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

const LoginForm = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { isTwoFactorAuthComplete } = props;

  // Carrousel d'images
  const [currentImage, setCurrentImage] = useState(0);
  const images = [guine1, jurid1, guine4, guine2, guine, guine5, guine3];
  const texts = [
    "Bienvenue sur la plateforme officielle du casier judiciaire.\nSimplifiez vos démarches administratives.",
    "Accédez à vos informations en toute sécurité.\nUn service rapide et fiable.",
    "Gérez vos documents juridiques en ligne.\nUne plateforme moderne et intuitive.",
    "Votre casier judiciaire à portée de main.\nConfiance et confidentialité garanties.",
    "Service disponible 24h/24, 7j/7.\nConsultez quand vous voulez, où vous voulez.",
    "Validation instantanée pour vos démarches.\nGagnez du temps sur vos formalités.",
    "Interface sécurisée et facile à utiliser.\nPour un accès simplifié à vos documents."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Veuillez entrer un email valide.";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsSubmitting(true);

    try {
      let response;
      if (isTwoFactorAuthComplete) {
        response = await loginAfter2FA({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });
      } else {
        response = await login({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });
      }

      navigate(response.redirectTo);
    } catch (error) {
      console.error("Détails erreur:", {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
      });

      const errorMessage =
        error.response?.data?.message || "Erreur de connexion au serveur";

      alert(`Échec de la connexion: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Content>  
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

      <FormSection>
      <BackButton to="/debut">
        <FaArrowLeft />
      </BackButton>
        <Form
          onSubmit={handleSubmit}
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
            <Title>Connexion</Title>
          </div>

          <InputGroup error={!!errors.email}>
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Votre Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputGroup>

          <InputGroup error={!!errors.password}>
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <Button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connexion en cours..." : "Se connecter"}
          </Button>

          <LinksContainer>
            <StyledLink to="/motdepasseoublie">
              Mot de passe oublié ?
            </StyledLink>
            <StyledLink to="/enregistrer">
              Créer un compte
            </StyledLink>
          </LinksContainer>
        </Form>
      </FormSection>
      </Content>
    </Container>
  );
};

export default LoginForm;