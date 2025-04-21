import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
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

const Logo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

// Message d'erreur stylisé
const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

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

    @media (max-width: 480px) {
      font-size: 1rem;
      padding: 8px;
    }
  }

  @media (max-width: 768px) {
    flex: none;
    height: 50vh;
  }

  @media (max-width: 480px) {
    flex: none;
    height: 40vh;
  }
`;

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

const Form = styled(motion.form)`
  background: ${colors.white};
  padding: 2.5rem;
  box-shadow: 3px 2px 0px ${colors.goldenYellow};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 450px;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    border: 1px solid ${colors.goldenYellow};
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  color: ${colors.blueMarine};
  font-size: 1.8rem;
  text-align: center;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

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
    border-color: ${({ error }) => (error ? "#e53e3e" : "#ddd")};

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

const ForgotPasswordLink = styled(Link)`
  color: ${colors.greenDark};
  text-decoration: none;
  font-size: 0.9rem;
  text-align: center;
  transition: color 0.3s;

  &:hover {
    color: ${colors.greenDark};
    text-decoration: underline;
  }
`;

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Carrousel d'images
  const [currentImage, setCurrentImage] = useState(0);
  const images = [guine1, jurid1, guine4, guine2, guine, guine5, guine3];
  const texts = [
    "Bienvenue sur la plateforme officielle du casier judiciaire.\nSimplifiez vos démarches administratives.",
    "Accédez à vos informations en toute sécurité.\nUn service rapide et fiable.",
    "Gérez vos documents juridiques en ligne.\nUne plateforme moderne et intuitive.",
    "Votre casier judiciaire à portée de main.\nConfiance et confidentialité garanties.",
    "Votre casier judiciaire à portée de main.\nConfiance et confidentialité garanties.",
    "Service disponible 24h/24, 7j/7.\nConsultez quand vous voulez, où vous voulez.",
    "Validation instantanée pour vos démarches.\nGagnez du temps sur vos formalités.",
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

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:2027/api/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 2000,
        }
      );

      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        if (typeof onLogin === "function") {
          onLogin();
        }
        alert("Connexion réussie !");
        navigate("/visiteur");
      } else {
        alert(data.message || "Erreur de connexion");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      alert("Une erreur est survenue lors de la connexion.");
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
            className={`carousel-image ${
              index === currentImage ? "active" : ""
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
        <div className="carousel-text">{texts[currentImage]}</div>
      </ImageSection>

      <FormSection>
        <Form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
              gap: "10px",
            }}
          >
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connexion en cours..." : "Connexion"}
          </Button>

          <div className="text-center">
            <ForgotPasswordLink className="mx-3" to="/motdepasseoublie">
              Mot de passe oublié ?
            </ForgotPasswordLink>
            <ForgotPasswordLink to="/enregistrer">
              Pas de compte ?
            </ForgotPasswordLink>
          </div>
        </Form>
      </FormSection>
    </Container>
  );
};

export default LoginForm;
