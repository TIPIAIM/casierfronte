// LogoutButton.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import styled, { keyframes } from "styled-components";
import { FiLogOut } from "react-icons/fi"; // Icône logout

// 🎨 Animation des couleurs
const colorCycle = keyframes`
  0% { color: #FF5733; }
  25% { color: #F2C94C; }
  50% { color: #3357FF; }
  75% { color: #1A4D2E; }
  100% { color: #002B5B; }
`;

// 🧑‍🎨 Icône stylée avec animation
const AnimatedLogoutIcon = styled(FiLogOut)`
  font-size: 28px;
  cursor: pointer;
  animation: ${colorCycle} 5s infinite; // 5 couleurs × 3 secondes = 15s
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.4);
  }
`;

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.post(
        `${import.meta.env.VITE_b}/api/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        logout();
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur :", error);
      logout();
      navigate("/login");
    }
  };

  return <AnimatedLogoutIcon onClick={handleLogout} title="Se déconnecter" />;
};

export default LogoutButton;
