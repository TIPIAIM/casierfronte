import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
//import { AuthContext } from './AuthContext';
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { GiCheckMark } from "react-icons/gi";
import { FaHand } from "react-icons/fa6";
import { AuthContext } from "./AuthContext";

// Styled component pour le conteneur principal
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(535deg, #1f2937, #0f0f0f, #1f2937);
`;

// Styled component pour le formulaire
const Form = styled(motion.form)`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
  text-align: center;
`;

// Styled component pour l'entrée de texte
const Input = styled(motion.input)`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

// Styled component pour le conteneur de mot de passe
const PasswordContainer = styled.div`
  position: relative;
`;

// Styled component pour le bouton de connexion
const Button = styled(motion.button)`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`;

// Styled component pour les messages d'erreur
const Message = styled.p`
  color: red;
`;

// Styled component pour le bouton de visualisation du mot de passe
const TogglePasswordButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

export default function Seconnecter() {
  const [email, setEmail] = useState(""); // État pour l'email
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [errorMessage, setErrorMessage] = useState(""); // État pour les messages d'erreur
  const [showPassword, setShowPassword] = useState(false); // État pour afficher/masquer le mot de passe
  const { login } = useContext(AuthContext); // Utilisation du contexte d'authentification
  const navigate = useNavigate(); // Utilisation du hook pour naviguer

  // Fonction pour gérer la soumission du formulaire
  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      const response = await axios.post(
        "http://localhost:2027/api/auth/login",
        { email, password }
      ); // Envoi des données de connexion au serveur
      if (response.data.message === "Success") {
        login(); // Mise à jour de l'état de connexion via le contexte
        window.location.href = response.data.redirectUrl; // Redirige l'utilisateur vers l'URL appropriée
      } else {
        setErrorMessage(response.data.message); // Affiche le message d'erreur du serveur
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion"); // Message d'erreur par défaut en cas d'échec de la requête
    }
  };

  // Fonction pour basculer l'affichage du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
    // style={{ backgroundImage:
    //`url('/pictures/dickob.jpg')`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center'
    //  }}
    >
      <Form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: -50 }} // Animation initiale
        animate={{ opacity: 1, y: 0 }} // Animation finale
        transition={{ duration: 0.8 }} // Durée de l'animation
        className=" bg-black"
      >
        <h6 className=" text-blue-800 font-serif">connexion</h6>

        {errorMessage && <Message>{errorMessage}</Message>}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          initial={{ x: -300, opacity: 0 }} // Animation initiale
          animate={{ x: 0, opacity: 1 }} // Animation finale
          transition={{ type: "spring", stiffness: 100 }} // Type d'animation
        />

        <PasswordContainer>
          <Input
            type={showPassword ? "text" : "password"} // Affichage conditionnel du mot de passe
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            initial={{ x: 300, opacity: 0 }} // Animation initiale
            animate={{ x: 0, opacity: 1 }} // Animation finale
            transition={{ type: "spring", stiffness: 100 }} // Type d'animation
          />
          <TogglePasswordButton
            type="button"
            onClick={togglePasswordVisibility}
            whileHover={{ scale: 1.1 }} // Animation de survol
            whileTap={{ scale: 0.9 }} // Animation au clic
          >
            {showPassword ? <VscEyeClosed size={24} /> : <VscEye size={24} />}
          </TogglePasswordButton>
        </PasswordContainer>

        <Button
          type="submit"
          whileHover={{ scale: 1.1 }} // Animation de survol
          whileTap={{ scale: 0.9 }} // Animation au clic
        >
          <GiCheckMark style={{ marginRight: "5px" }} />
          Se connecter
        </Button>

        <Button
          type="button"
          onClick={() => navigate("/admindasboardgenerale")} // Retour à la page d'accueil ou autre page
          whileHover={{ scale: 1.1 }} // Animation de survol
          whileTap={{ scale: 0.9 }} // Animation au clic
          style={{ backgroundColor: "#dc3545", marginTop: "10px" }} // Couleur rouge pour le bouton de quitter
        >
          <VscEyeClosed style={{ marginRight: "5px" }} />
          Quitter
        </Button>

        <Link
          to="/senregistrer"
          className=" no-underline font-serif"
          style={{ textAlign: "center", color: "#007bff", marginTop: "10px" }}
        >
          Je n'ai pas de compte ? Créez ici <FaHand />
        </Link>
      </Form>
    </Container>
  );
}
