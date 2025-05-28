// LogoutButton.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import styled, { keyframes } from "styled-components";
import { FiLogOut } from "react-icons/fi"; // Icône logout

// 🎨 Animation des couleurs
const colorCycle = keyframes`
  0% { color: red; }
  25% { color: #F2C94C; }
  50% { color: red; }
  75% { color: #1A4D2E; }
  100% { color: red; }
`;

// 🧑‍🎨 Icône stylée avec animation
const AnimatedLogoutIcon = styled(FiLogOut)`
  font-size: 20px;
  cursor: pointer;
  animation: ${colorCycle} 5s infinite; // 5 couleurs × 3 secondes = 15s
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_b}/api/auth/logout`,
        {}, // corps vide
        { withCredentials: true } // ⬅️ important !
      );

      if (response.status === 200) {
        alert("✅ Vous avez été déconnecté avec succès !");
        logout(); // déclenche le changement de contexte
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
      logout();
      navigate("/"); //redirection àpres deconnexion
    }
  };

  return <AnimatedLogoutIcon onClick={handleLogout} title="Se déconnecter" />;
};

export default LogoutButton;
