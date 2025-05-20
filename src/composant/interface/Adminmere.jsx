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

// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
};

// Animations
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: { opacity: 0, y: -20 }
};

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Reset et styles globaux
const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
`;

// Styles avec styled-components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;

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
  margin-left: 300px;

  @media (max-width: 1023px) {
    margin-left: 0;
  }
`;

const SidebarContainer = styled(motion.div)`
  background: ${colors.greenDark};
  color: ${colors.white};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 100;
  width: 300px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;

  @media (max-width: 1023px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
    width: 280px;
    transform: ${({ sidebarOpen }) => 
      sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
  }

  @media (max-width: 480px) {
    width: 260px;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 70px;

  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const SidebarList = styled.ul`
  padding: 1rem;
  flex-grow: 1;
  overflow-y: auto;

  li {
    padding: 0.75rem 1rem;
    margin-bottom: 0.25rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: ${colors.goldenYellow};
    }

    &.active {
      background: rgba(242, 201, 76, 0.2);
      color: ${colors.goldenYellow};
      font-weight: 500;
    }

    @media (max-width: 767px) {
      padding: 0.65rem 0.75rem;
      font-size: 0.9rem;
    }
  }
`;

const Header = styled.header`
  padding: 0.75rem 2rem;
  background: ${colors.white};
  box-shadow: 0 2px 10px rgba(0, 43, 91, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  z-index: 50;
  min-height: 70px;

  @media (max-width: 1023px) {
    padding: 0.75rem 1.5rem;
    margin-left: 0;
  }

  @media (max-width: 767px) {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${colors.blueMarine};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1023px) {
    font-size: 1.25rem;
  }

  @media (max-width: 479px) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 767px) {
    gap: 0.5rem;
    width: 100%;
    justify-content: flex-start;
  }
`;

const Button = styled(motion.button).attrs(() => ({
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
}))`
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  white-space: nowrap;

  &.primary {
    background: ${colors.greenDark};
    color: ${colors.white};
    box-shadow: 0 2px 4px rgba(26, 77, 46, 0.2);
  }

  &.accent {
    background: ${colors.goldenYellow};
    color: ${colors.blueMarine};
    box-shadow: 0 2px 4px rgba(242, 201, 76, 0.3);
  }

  &.outline {
    background: transparent;
    border: 1px solid ${colors.blueMarine};
    color: ${colors.blueMarine};
  }

  @media (max-width: 767px) {
    padding: 0.5rem 0.9rem;
    font-size: 0.85rem;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 479px) {
    flex-grow: 1;
    justify-content: center;
  }
`;

const Content = styled(motion.main)`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background: #f8f9fa;

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
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr));

  @media (max-width: 767px) {
    gap: 1.25rem;
  }
`;

const ChartCard = styled(motion.div).attrs(() => ({
  variants: cardVariants,
  viewport: { once: true, amount: 0.2 }
}))`
  background: ${colors.white};
  border-radius: 2px;
  box-shadow: 0 4px 12px rgba(0, 43, 91, 0.08);
  padding: 1.5rem;
  transition: transform 0.9s ease, box-shadow 0.9s ease;
  border: 1px solid rgba(0, 43, 91, 0.08);
  min-width: 0;
  will-change: transform;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 43, 91, 0.12);
  }

  @media (max-width: 767px) {
    padding: 1.25rem;
  }
`;

const ChartTitle = styled(motion.h3).attrs(() => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.2, duration: 0.5 }
}))`
  font-size: 1rem;
  font-weight: 700;
  color: ${colors.blueMarine};
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 43, 91, 0.1);

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 767px) {
    font-size: 1.05rem;
    margin-bottom: 1rem;
  }
`;

const LoadingState = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  color: ${colors.blueMarine};

  p {
    font-size: 1.1rem;
    font-weight: 500;
  }

  @media (max-width: 767px) {
    height: 300px;

    p {
      font-size: 1rem;
    }
  }
`;

const ErrorState = styled.div`
  padding: 1.75rem;
  background: rgba(239, 68, 68, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  text-align: center;
  max-width: 600px;
  margin: 2rem auto;

  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  @media (max-width: 767px) {
    padding: 1.25rem;
    margin: 1.5rem auto;

    p {
      margin-bottom: 1rem;
    }
  }
`;

const MobileMenuButton = styled(motion.button).attrs(() => ({
  whileTap: { scale: 0.95 }
}))`
  background: rgba(0, 43, 91, 0.05);
  border-radius: 8px;
  padding: 0.5rem;
  display: none;

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
  z-index: 90;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const TitleAnimation = styled(motion.div).attrs(() => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.2, duration: 0.5 }
}))``;

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
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <SidebarHeader>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <LogoIcon />
                  <span style={{ fontSize: "1.15rem", fontWeight: "600" }}>
                    GuiCJ
                  </span>
                </div>
                <button
                  onClick={closeSidebar}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChartNoAxesCombined size={18} color={colors.white} />
                </button>
              </SidebarHeader>

              <SidebarList>
                <li
                  className={activeTab === "statistiques" ? "active" : ""}
                  onClick={() => setActiveTab("statistiques")}
                >
                  <PieChart size={18} />
                  Statistiques
                </li>
                <li
                  className={activeTab === "statistiquesdeux" ? "active" : ""}
                  onClick={() => setActiveTab("statistiquesdeux")}
                >
                  <PieChart size={18} />
                  Analyse des demandes
                </li>
                <li
                  className={activeTab === "compte" ? "active" : ""}
                  onClick={() => setActiveTab("compte")}
                >
                  <Shield size={18} />
                  Gérer les comptes
                </li>
                <li
                  className={activeTab === "demandes" ? "active" : ""}
                  onClick={() => setActiveTab("demandes")}
                >
                  <Send size={18} />
                  Gérer les demandes
                </li>
                <li
                  className={activeTab === "condamnations" ? "active" : ""}
                  onClick={() => setActiveTab("condamnations")}
                >
                  <Gavel size={18} />
                  Les condamnations
                </li>
                <li
                  className={activeTab === "càsierjudiciàir" ? "active" : ""}
                  onClick={() => setActiveTab("càsierjudiciàir")}
                >
                  <Users size={18} />
                  Les casiers judiciaires
                </li>
                <li
                  className={activeTab === "caisse" ? "active" : ""}
                  onClick={() => setActiveTab("caisse")}
                >
                  <Wallet size={18} />
                  La caisse
                </li>
              </SidebarList>
            </SidebarContainer>
          )}
        </AnimatePresence>

        <MainContent>
          <Header>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
              <MobileMenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? (
                  <X size={20} color={colors.blueMarine} />
                ) : (
                  <Menu size={20} color={colors.blueMarine} />
                )}
              </MobileMenuButton>

              <HeaderTitle>
                {activeTab === "statistiques" && "Tableau de Bord des status"}
                {activeTab === "statistiquesdeux" && "Tableau de Bord Judiciaire"}
                {activeTab === "compte" && "Gestion des comptes"}
                {activeTab === "demandes" && "Gestion des demandes"}
                {activeTab === "càsierjudiciàir" && "Gestion des càsierjudiciàir"}
                {activeTab === "condamnations" && "Gestion des condamnations"}
                {activeTab === "caisse" && "Gestion de la caisse"}
              </HeaderTitle>
            </div>

            <ButtonGroup>
              <Button className="">
                <LogoutButton />
              </Button>
            </ButtonGroup>
          </Header>

          <Content>
            {error ? (
              <ErrorState>
                <p>{error}</p>
                <Button
                  className="outline"
                  onClick={() => window.location.reload()}
                  style={{ marginTop: "1.5rem" }}
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
                  <Loader2 size={40} />
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
                      <HeaderTitle>Tableau de Bord des status</HeaderTitle>
                    </TitleAnimation>

                    <ChartGrid>
                      <ChartCard>
                        <ChartTitle>
                          <BarChart2 size={20} color={colors.blueMarine} />
                          Répartition par Tribunaux : {total}
                        </ChartTitle>
                        <div style={{ height: "350px" }}>
                          <Condamnationsprtribunl />
                        </div>
                      </ChartCard>

                      <ChartCard>
                        <ChartTitle>
                          <CalendarSearch size={20} color={colors.blueMarine} />
                          Condamnations par Date
                        </ChartTitle>
                        <div  style={{ height: "350px" }}>
                          <CondemnationChart />
                        </div>
                      </ChartCard>
                    </ChartGrid>

                    <ChartGrid>
                      <ChartCard>
                        <ChartTitle>
                          <Send size={20} color={colors.blueMarine} />
                          Répartition des demandes de casier
                        </ChartTitle>
                        <div style={{ height: "300px" }}>
                          <DeliveryMethodChart />
                        </div>
                      </ChartCard>

                      <ChartCard>
                        <ChartTitle>
                          <Send size={20} color={colors.blueMarine} />
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
                      <HeaderTitle>Tableau de Bord Judiciaire</HeaderTitle>
                    </TitleAnimation>

                    <ChartGrid>
                      <ChartCard>
                        <ChartTitle>
                          <Send size={20} color={colors.blueMarine} />
                          Statuts des demandes de casier
                        </ChartTitle>
                        <div>
                          <DemandeStatusChart />
                        </div>
                      </ChartCard>
                      <ChartCard>
                        <ChartTitle>
                          <Send size={20} color={colors.blueMarine} />
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
    <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="#F2C94C" />
    <path d="M3 12L12 17L21 12" stroke="#F2C94C" strokeWidth="2" />
    <path d="M3 17L12 22L21 17" stroke="#F2C94C" strokeWidth="2" />
  </svg>
);