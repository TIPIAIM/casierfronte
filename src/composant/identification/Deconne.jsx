// LogoutButton.jsx
import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import styled, { keyframes } from "styled-components";
import { FiLogOut, FiLoader } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Power } from "lucide-react";

const colors = {
  primary: "#002B5B",
  accent:  "#F2C94C",
  danger:  "#EF4444",
  light:   "#FFFFFF",
  gray:    "#6B7280",
};

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const IconWrapper = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${props => (props.loading ? colors.gray : colors.accent)};
  transition: color 0.3s;
  &:hover {
    animation: ${pulse} 0.5s ease-in-out;
    color: ${props => (props.loading ? colors.danger : colors.danger)};
  }
`;

const Spinner = styled(FiLoader)`
  font-size: 24px;
  animation: spin 1s linear infinite;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

// Snackbar centré au milieu de l'écran (responsive/pro)
const SnackbarContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 95vw;
  width: 350px;
  background: rgba(255,255,255,0.98);
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 2000;
  @media (max-width: 500px) {
    width: 98vw;
    max-width: 98vw;
    padding: 0.9rem 0.7rem;
    font-size: 0.99rem;
  }
`;


const Message = styled.div`
  flex: 1;
  color: ${colors.primary};
  font-size: 0.95rem;
`;

const CancelButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${colors.danger};
  font-weight: bold;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background 0.2s;
  &:hover { background: rgba(239,68,68,0.1); }
`;

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const intervalRef = useRef(null);

  const executeLogout = async () => {
    setLoading(true);
    clearInterval(intervalRef.current);
    try {
      await axios.post(
        `${import.meta.env.VITE_b}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logout();
      navigate("/");
    }
  };

  const scheduleLogout = () => {
    if (loading) return;
    setShowSnackbar(true);
    setCountdown(5);
    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          executeLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelLogout = () => {
    clearInterval(intervalRef.current);
    setShowSnackbar(false);
  };
//Power
  return (
    <>
      <IconWrapper onClick={scheduleLogout} loading={loading} title="Se déconnecter">
        {loading ? <Spinner /> : <Power />}
      </IconWrapper>

      <AnimatePresence>
        {showSnackbar && (
          <SnackbarContainer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Message>Déconnexion dans {countdown} s</Message>
            <CancelButton
              onClick={cancelLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >Annuler</CancelButton>
          </SnackbarContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default LogoutButton;
