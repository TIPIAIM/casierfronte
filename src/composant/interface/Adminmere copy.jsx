import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Loader2,
  PieChart,
  BarChart2,
  CalendarSearch,
  Send,
  Users,
  Shield,
  Gavel,
  Wallet,
  Power,
  ChartNoAxesCombined,
  BellPlus,
  ChevronDown,
  ChevronRight,
  Home,
  FileText,
  Settings,
  User,
  CreditCard,
  Database,
  Activity
} from "lucide-react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import CondemnationChart from "../Pourlecsier/GestionAdmin/gestioncond/Statistique/GrphCondapardate";
import Condamnationsprtribunl from "../Pourlecsier/GestionAdmin/gestioncond/Statistique/GrphCondprtribunl";
import DeliveryMethodChart from "../Pourlecsier/GestionAdmin/gestionenregistreent/Sttistk/Grphmodedelivrison";
import DeliveryMethodChart2 from "../Pourlecsier/GestionAdmin/gestionenregistreent/Sttistk/Grphmodedelivrison2";
import TbleoListe from "../Pourlecsier/GestionAdmin/gestionenregistreent/Sttistk/TbleoListe";
import DemandeStatusChart from "../Pourlecsier/GestionAdmin/gestionenregistreent/Sttistk/GrphSttut";
import Senregistrerpourad from "../identification/Senregistrerpourad";
import GestiondemàndcsierAdmin from "../Pourlecsier/GestionAdmin/gestionenregistreent/GestiondemàndcsierAdmin";
import GestioncondAdmin from "../Pourlecsier/GestionAdmin/gestioncond/GestionCondanations";
import CsierJudicirpouradmin from "../Pourlecsier/GestionAdmin/CsierJudicirpouradmin";
import LogoutButton from "../identification/Deconne";
import SessionList from "../Pourlecsier/GestionAdmin/Session/SessionList";
import Situàtiondemànde from "../Pourlecsier/GestionAdmin/gestionenregistreent/Sttistk/situàtiondemànde";
import AvatarProfileButtondmin from "../Profile/AvatarProfileButtondmin";

// Palette de couleurs étendue
const colors = {
  primary: "#002B5B",
  secondary: "#1A4D2E",
  accent: "#F2C94C",
  white: "#FFFFFF",
  lightGray: "#F8F9FA",
  mediumGray: "#E5E7EB",
  darkGray: "#6B7280",
  black: "#111827",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6"
};

// Styles pour le pied de page de la sidebar
const SidebarFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SidebarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--white);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Header = styled.header`
  padding: 0 1.5rem;
  background: var(--white);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  z-index: 50;
  min-height: 64px;
  border-bottom: 1px solid var(--medium-gray);
  position: sticky;
  top: 0;

  @media (max-width: 1023px) {
    padding: 0 1.25rem;
  }
  @media (max-width: 767px) {
    padding: 0 0.7rem;
    gap: 0.6rem;
    min-height: 58px;
  }
`;

// Animations améliorées
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const cardVariants = {
  offscreen: { y: 20, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.6
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// Reset et styles globaux modernes
const GlobalStyles = createGlobalStyle`
  :root {
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
    --accent: ${colors.accent};
    --white: ${colors.white};
    --light-gray: ${colors.lightGray};
    --medium-gray: ${colors.mediumGray};
    --dark-gray: ${colors.darkGray};
    --black: ${colors.black};
    --success: ${colors.success};
    --warning: ${colors.warning};
    --danger: ${colors.danger};
    --info: ${colors.info};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--light-gray);
    color: var(--black);
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

// Styles modernisés avec styled-components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--light-gray);
  position: relative;

  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;

const MainContent = styled(motion.div).attrs(() => ({
  initial: "initial",
  animate: "animate",
  exit: "exit",
  variants: pageVariants
}))`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  margin-left: 260px;
  transition: margin-left 0.2s ease;

  @media (max-width: 1023px) {
    margin-left: 0;
  }
`;

const SidebarContainer = styled(motion.div)`
  background: var(--secondary);
  color: var(--white);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 100;
  width: 260px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease;

  @media (max-width: 1023px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
    width: 280px;
    transform: ${({ sidebarOpen }) => 
      sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
    z-index: 1000;
  }

  @media (max-width: 480px) {
    width: 260px;
  }
`;

const SidebarHeader = styled.div`
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 64px;
  background: rgba(0, 0, 0, 0.05);

  @media (max-width: 767px) {
    padding: 0.75rem 1rem;
  }
`;

const SidebarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.5px;

  svg {
    flex-shrink: 0;
  }
`;

const SidebarList = styled.ul`
  padding: 0.75rem;
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;

  li {
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.25rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--white);
    }

    &.active {
      background: rgba(242, 201, 76, 0.15);
      color: var(--accent);
      font-weight: 600;
    }

    svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    @media (max-width: 767px) {
      padding: 0.65rem 0.75rem;
      font-size: 0.9rem;
    }
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

const HeaderTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: var(--dark-gray);
  }

  @media (max-width: 1023px) {
    font-size: 1.15rem;
  }

  @media (max-width: 479px) {
    font-size: 1.05rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;

  @media (max-width: 767px) {
    gap: 0.5rem;
  }
`;

const Button = styled(motion.button).attrs(() => ({
  whileHover: { scale: 0.93 },
  whileTap: { scale: 0.88 }
}))`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  white-space: nowrap;
  background: var(--white);
  color: var(--secondary);
  border: 1px solid var(--medium-gray);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: var(--light-gray);
  }

  &.primary {
    background: var(--primary);
    color: var(--white);
    border-color: var(--primary);

    &:hover {
      background: #00204f;
    }
  }

  &.accent {
    background: var(--accent);
    color: var(--primary);
    border-color: var(--accent);

    &:hover {
      background: #f0c040;
    }
  }

  &.danger {
    background: var(--danger);
    color: var(--white);
    border-color: var(--danger);

    &:hover {
      background: #dc2626;
    }
  }

  &.icon {
    padding: 0.5rem;
    border-radius: 50%;
    background: transparent;
    border: none;
    box-shadow: none;
    color: var(--dark-gray);

    &:hover {
      background: rgba(0, 0, 0, 0.05);
      color: var(--black);
    }
  }

  @media (max-width: 767px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 479px) {
    padding: 0.5rem;
    span {
      display: none;
    }
  }
`;

const Content = styled(motion.main)`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background: var(--light-gray);

  @media (max-width: 1023px) {
    padding: 1.25rem;
  }

  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const ChartGrid = styled(motion.div).attrs(() => ({
  variants: staggerContainer,
  initial: "hidden",
  animate: "show"
}))`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));

  @media (max-width: 767px) {
    gap: 1rem;
  }
`;

const ChartCard = styled(motion.div).attrs(() => ({
  variants: cardVariants,
  viewport: { once: true, amount: 0.1 }
}))`
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  transition: all 0.2s ease;
  border: 1px solid var(--medium-gray);
  min-width: 0;
  will-change: transform;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--primary);
  }

  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const ChartTitle = styled(motion.h3).attrs(() => ({
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.1, duration: 0.3 }
}))`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--medium-gray);

  svg {
    color: var(--dark-gray);
    flex-shrink: 0;
  }

  @media (max-width: 767px) {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
`;

const LoadingState = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--primary);

  p {
    font-size: 1rem;
    font-weight: 500;
    color: var(--dark-gray);
  }

  @media (max-width: 767px) {
    height: 300px;
    gap: 0.75rem;

    p {
      font-size: 0.9rem;
    }
  }
`;

const ErrorState = styled.div`
  padding: 1.5rem;
  background: rgba(239, 68, 68, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: var(--danger);
  text-align: center;
  max-width: 500px;
  margin: 1.5rem auto;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  p {
    margin-bottom: 1rem;
    line-height: 1.5;
    font-size: 0.95rem;
  }

  @media (max-width: 767px) {
    padding: 1rem;
    margin: 1rem auto;

    p {
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
    }
  }
`;

const MobileMenuButton = styled(motion.button).attrs(() => ({
  whileTap: { scale: 0.95 }
}))`
  background: transparent;
  border-radius: 6px;
  padding: 0.5rem;
  display: none;
  color: var(--dark-gray);

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 1023px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
  backdrop-filter: blur(2px);

  @media (min-width: 1024px) {
    display: none;
  }
`;

const TitleAnimation = styled(motion.div).attrs(() => ({
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.1, duration: 0.3 }
}))`
  margin-bottom: 1.5rem;

  @media (max-width: 767px) {
    margin-bottom: 1rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: var(--white);
  border-radius: 8px;
  padding: 1.25rem;
  border: 1px solid var(--medium-gray);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 0.875rem;
    color: var(--dark-gray);
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  p {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary);
  }

  @media (max-width: 767px) {
    padding: 1rem;

    p {
      font-size: 1.25rem;
    }
  }
`;

export default function DashboardCasierJudiciaire() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("statistiques");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const checkViewport = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_b}/criminal`);
        if (!response.data.success) {
          throw new Error("Erreur de chargement des données");
        } else if (response.data.success) {
          setTotal(response.data.data.length);
        }
      } catch (err) {
        setError(err.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <GlobalStyles />
      <DashboardContainer>
        <AnimatePresence>
          {sidebarOpen && window.innerWidth < 1024 && (
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {sidebarOpen && (
            <SidebarContainer
              sidebarOpen={sidebarOpen}
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <SidebarHeader>
                <SidebarLogo>
                  <LogoIcon />
                  <span>GuiCJ</span>
                </SidebarLogo>
                <Button 
                  className="icon" 
                  onClick={closeSidebar}
                  aria-label="Close sidebar"
                >
                  <X size={18} />
                </Button>
              </SidebarHeader>

              <SidebarList>
                <li
                  className={activeTab === "statistiques" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("statistiques");
                    closeSidebar();
                  }}
                >
                  <PieChart size={18} />
                  <span>Statistiques</span>
                </li>
                <li
                  className={activeTab === "statistiquesdeux" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("statistiquesdeux");
                    closeSidebar();
                  }}
                >
                  <BarChart2 size={18} />
                  <span>Analyse des demandes</span>
                </li>
                <li
                  className={activeTab === "compte" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("compte");
                    closeSidebar();
                  }}
                >
                  <Shield size={18} />
                  <span>Gérer les comptes</span>
                </li>
                <li
                  className={activeTab === "demandes" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("demandes");
                    closeSidebar();
                  }}
                >
                  <Send size={18} />
                  <span>Gérer les demandes</span>
                </li>
                <li
                  className={activeTab === "condamnations" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("condamnations");
                    closeSidebar();
                  }}
                >
                  <Gavel size={18} />
                  <span>Les condamnations</span>
                </li>
                <li
                  className={activeTab === "càsierjudiciàir" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("càsierjudiciàir");
                    closeSidebar();
                  }}
                >
                  <Users size={18} />
                  <span>Les casiers judiciaires</span>
                </li>
                <li
                  className={activeTab === "sessionlist" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("sessionlist");
                    closeSidebar();
                  }}
                >
                  <BellPlus size={18} />
                  <span>Sessions utilisateurs</span>
                </li>
                <li
                  className={activeTab === "caisse" ? "active" : ""}
                  onClick={() => {
                    setActiveTab("caisse");
                    closeSidebar();
                  }}
                >
                  <Wallet size={18} />
                  <span>La caisse</span>
                </li>
                <AvatarProfileButtondmin/>
              </SidebarList>

              {/* Nouvelle section pour les boutons en bas de la sidebar */}
              <SidebarFooter>
                <SidebarButton onClick={() => {
                  setActiveTab("compte");
                  closeSidebar();
                }}>
                  <User size={18} />
                  <span>Mon Compte</span>
                </SidebarButton>
                <SidebarButton>
                  <Settings size={18} />
                  <span>Paramètres</span>
                </SidebarButton>
                <SidebarButton>
                  <LogoutButton />
                  <span>Déconnexion</span>
                </SidebarButton>
              </SidebarFooter>
            </SidebarContainer>
          )}
        </AnimatePresence>

        <MainContent>
          <Header>
            <HeaderLeft>
              <MobileMenuButton 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </MobileMenuButton>

              <HeaderTitle>
                {activeTab === "statistiques" && (
                  <>
                    <PieChart size={20} />
                    <span>Tableau de Bord des status</span>
                  </>
                )}
                {activeTab === "statistiquesdeux" && (
                  <>
                    <BarChart2 size={20} />
                    <span>Tableau de Bord Judiciaire</span>
                  </>
                )}
                {activeTab === "compte" && (
                  <>
                    <Shield size={20} />
                    <span>Gestion des comptes</span>
                  </>
                )}
                {activeTab === "demandes" && (
                  <>
                    <Send size={20} />
                    <span>Gestion des demandes</span>
                  </>
                )}
                {activeTab === "càsierjudiciàir" && (
                  <>
                    <Users size={20} />
                    <span>Gestion des casiers judiciaires</span>
                  </>
                )}
                {activeTab === "condamnations" && (
                  <>
                    <Gavel size={20} />
                    <span>Gestion des condamnations</span>
                  </>
                )}
                {activeTab === "caisse" && (
                  <>
                    <Wallet size={20} />
                    <span>Gestion de la caisse</span>
                  </>
                )}
                {activeTab === "sessionlist" && (
                  <>
                    <BellPlus size={20} />
                    <span>Sessions utilisateurs</span>
                  </>
                )}
              </HeaderTitle>
            </HeaderLeft>

            <HeaderActions>
              <Button className="primary">
                <span>Proceed</span>
              </Button>
            </HeaderActions>
          </Header>

          <Content>
            {error ? (
              <ErrorState>
                <p>{error}</p>
                <Button
                  className="primary"
                  onClick={() => window.location.reload()}
                >
                  Réessayer
                </Button>
              </ErrorState>
            ) : loading ? (
              <LoadingState>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Loader2 size={36} />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Chargement des données...
                </motion.p>
              </LoadingState>
            ) : (
              <AnimatePresence mode="wait">
                {activeTab === "statistiques" && (
                  <motion.div
                    key="statistiques"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <TitleAnimation>
                      <HeaderTitle>
                        <PieChart size={20} />
                        Statistiques des demandes de casier
                      </HeaderTitle>
                    </TitleAnimation>

                    <StatsContainer>
                      <Situàtiondemànde/>
                    </StatsContainer>

                    <ChartGrid>
                      <ChartCard>
                        <ChartTitle>
                          <BarChart2 size={18} />
                          Répartition par Tribunaux
                        </ChartTitle>
                        <div style={{ height: "350px" }}>
                          <Condamnationsprtribunl />
                        </div>
                      </ChartCard>

                      <ChartCard>
                        <ChartTitle>
                          <CalendarSearch size={18} />
                          Condamnations par Date
                        </ChartTitle>
                        <div style={{ height: "350px" }}>
                          <CondemnationChart />
                        </div>
                      </ChartCard>
                    </ChartGrid>

                    <ChartGrid>
                      <ChartCard>
                        <ChartTitle>
                          <Send size={18} />
                          Répartition des demandes de casier
                        </ChartTitle>
                        <div style={{ height: "300px" }}>
                          <DeliveryMethodChart />
                        </div>
                      </ChartCard>

                      <ChartCard>
                        <ChartTitle>
                          <Database size={18} />
                          Analyse des demandes de casier
                        </ChartTitle>
                        <div style={{ height: "300px" }}>
                          <DeliveryMethodChart2 />
                        </div>
                      </ChartCard>
                    </ChartGrid>
                  </motion.div>
                )}

                {activeTab === "statistiquesdeux" && (
                  <motion.div
                    key="statistiquesdeux"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <TitleAnimation>
                      <HeaderTitle>
                        <BarChart2 size={20} />
                        Analyse des demandes de casier
                      </HeaderTitle>
                    </TitleAnimation>

                    <ChartGrid>
                      <ChartCard>
                        <ChartTitle>
                          <Activity size={18} />
                          Statuts des demandes de casier
                        </ChartTitle>
                        <div>
                          <DemandeStatusChart />
                        </div>
                      </ChartCard>
                      <ChartCard>
                        <ChartTitle>
                          <FileText size={18} />
                          Liste des demandes de casier
                        </ChartTitle>
                        <div>
                          <TbleoListe />
                        </div>
                      </ChartCard>
                    </ChartGrid>
                  </motion.div>
                )}

                {activeTab === "compte" && (
                  <motion.div
                    key="compte"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <Senregistrerpourad />
                  </motion.div>
                )}

                {activeTab === "demandes" && (
                  <motion.div
                    key="demandes"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <GestiondemàndcsierAdmin />
                  </motion.div>
                )}

                {activeTab === "càsierjudiciàir" && (
                  <motion.div
                    key="càsierjudiciàir"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <CsierJudicirpouradmin />
                  </motion.div>
                )}

                {activeTab === "condamnations" && (
                  <motion.div
                    key="condamnations"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <GestioncondAdmin />
                  </motion.div>
                )}

                {activeTab === "caisse" && (
                  <motion.div
                    key="caisse"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <GestionCaisse />
                  </motion.div>
                )}

                {activeTab === "sessionlist" && (
                  <motion.div
                    key="sessionlist"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                  >
                    <SessionList />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </Content>
        </MainContent>
      </DashboardContainer>
    </>
  );
}

const LogoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M12 2L3 7L12 12L21 7L12 2Z" 
      fill="#F2C94C" 
      stroke="#F2C94C" 
      strokeWidth="2"
    />
    <path 
      d="M3 12L12 17L21 12" 
      stroke="#F2C94C" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M3 17L12 22L21 17" 
      stroke="#F2C94C" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);