import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  Briefcase,
  Globe,
  Home,
  Mail,
  Phone,
  Hand,
  Snowflake,
  HandHeart,
  Printer,
  FileText,
  Eye,
  X,
  ChevronDown,
  ChevronUp,
  Shield,
  FileSignature,
  ClipboardCheck
} from "lucide-react";
import path from "path-browserify";
 
// Palette de couleurs professionnelle
const colors = {
  primary: "#1A4D2E", // Vert foncé professionnel
  secondary: "#FF9F29", // Orange vif pour les accents
  accent: "#003566", // Bleu marine
  light: "#FAF3E3", // Beige clair
  dark: "#1E1E1E", // Noir pour textes
  success: "#28A745", // Vert succès
  warning: "#FFC107", // Jaune avertissement
  danger: "#DC3545", // Rouge danger
  info: "#17A2B8", // Bleu info
  white: "#FFFFFF",
  gray100: "#F8F9FA",
  gray200: "#E9ECEF",
  gray500: "#6C757D"
};

 
// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

 


// Styles globaux
const GlobalStyles = styled.div`
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: ${colors.dark};
`;

// Header professionnel
const ProfessionalHeader = styled.div`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
  color: ${colors.white};
  padding: 2rem;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: -30px;
    width: 150px;
    height: 150px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: ${colors.secondary};
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0.5rem 0 0;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const StatusBadge = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => 
    props.status === "completed" ? colors.success : 
    props.status === "pending" ? colors.warning : 
    colors.danger};
  color: ${props => 
    props.status === "pending" ? colors.dark : 
    colors.white};
  animation: ${fadeIn} 0.3s ease-out;
`;

const ProgressContainer = styled.div`
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  height: 8px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: ${colors.secondary};
  width: ${props => 
    props.status === "completed" ? "100%" : 
    props.status === "pending" ? "60%" : 
    "100%"};
  transition: width 0.5s ease-in-out;
`;

// Styles principaux
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Section = styled.section`
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${colors.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: ${colors.secondary};
  }
`;

const SectionContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: ${fadeIn} 0.3s ease-out;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: ${colors.gray100};
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.gray200};
    transform: translateY(-2px);
  }
`;

const InfoIcon = styled.div`
  background: ${colors.primary};
  color: ${colors.white};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 800;
  color: ${colors.gray500};
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-weight: 500;
  color: ${colors.dark};
`;

// Boutons
const PrimaryButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(26, 77, 46, 0.2);
  
  &:hover {
    background: ${colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(26, 77, 46, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
   color: ${colors.info};
  border: 1px solid ${colors.primary}20;
  
  &:hover {
  
    color: ${colors.gray100};
    background: ${colors.primary}20;
  }
`;

// Modal pour les fichiers
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const ModalContent = styled.div`
  background: ${colors.white};
  border-radius: 2px;
  width: 70%;
  max-width: 1000px;
  max-height: 95vh;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out;
   @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`;

const ModalHeader = styled.div`
  padding: 0.5rem;
  background: ${colors.primary};
  color: ${colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ModalBody = styled.div`
  padding: 0.5rem;
  height: 80vh;
  display: flex;
  flex-direction: column;

  
`;

const FileViewer = styled.iframe`
  flex: 1;
  border: none;
  border-radius: 1px;
  background: ${colors.gray100};
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0.5rem;
  background: ${colors.primary};
  color: ${colors.white};
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  align-self: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

// Composant FileViewerModal
const FileViewerModal = ({ fileUrl, onClose }) => {
  const url = fileUrl?.url || fileUrl;
  const fileName = fileUrl?.name || path.basename(url);
  const fileExtension = fileName?.split('.').pop().toLowerCase();
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>
            <FileText size={30} />
           {/* {fileName}*/}Fichier joint
          </h3>
          <SecondaryButton onClick={onClose}>
            <X size={20} />
          </SecondaryButton>
        </ModalHeader>
        
        <ModalBody>
          {fileExtension && ['pdf', 'png', 'jpg', 'jpeg'].includes(fileExtension) ? (
            <FileViewer 
              src={url} 
              title={fileName}
            />
          ) : (
            <div style={{ textAlign: 'center', margin: 'auto' }}>
              <FileText size={64} color={colors.gray500} style={{ marginBottom: '1rem' }} />
              <h4 style={{ color: colors.dark }}>Format non supporté pour la prévisualisation</h4>
              <p style={{ color: colors.gray500 }}>Ce fichier ({fileExtension}) ne peut pas être affiché directement.</p>
              
              <DownloadButton 
                href={url} 
                download={fileName}
              >
                <Download size={18} />
                Télécharger le fichier
              </DownloadButton>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

// Composant principal
function DemandeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openSections, setOpenSections] = useState({
    personalInfo: true,
    delivery: true,
    documents: true,
    dates: true
  });

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_b}/api/demande/by-id/${id}`);

        if (!response.ok) {
          throw new Error("Échec du chargement des données");
        }

        const data = await response.json();
        setDemande(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDemande();
  }, [id]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle size={18}  />;
      case "pending": return <Clock size={18}  className=" animate-spin "/>;
      case "rejected": return <AlertCircle size={18} />;
      default: return <Clock size={18} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Non spécifié";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Non spécifié";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Votre demande est en cours de traitement. Nous vous informerons dès qu'elle sera complétée.";
      case "completed":
        return "Votre demande a été traitée avec succès. Vous pouvez maintenant récupérer votre document.";
      case "rejected":
        return "Votre demande n'a pas pu être traitée. Contactez-nous pour plus d'informations.";
      default:
        return "Statut inconnu";
    }
  };

  if (loading) return (
    <GlobalStyles>
      <Container style={{ textAlign: 'center', padding: '4rem' }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          border: `5px solid ${colors.gray200}`,
          borderTopColor: colors.primary,
          borderRadius: '50%',
          margin: '0 auto 1.5rem',
          animation: 'spin 1s linear infinite'
        }} />
        <h3 style={{ color: colors.primary }}>Chargement en cours</h3>
        <p style={{ color: colors.gray500 }}>Nous récupérons les détails de votre demande...</p>
      </Container>
    </GlobalStyles>
  );

  if (error) return (
    <GlobalStyles>
      <Container style={{ textAlign: 'center', padding: '4rem' }}>
        <AlertCircle size={48} color={colors.danger} style={{ marginBottom: '1rem' }} />
        <h3 style={{ color: colors.danger }}>Erreur de chargement</h3>
        <p style={{ color: colors.gray500 }}>{error}</p>
        <PrimaryButton onClick={() => window.location.reload()}>
          Réessayer
        </PrimaryButton>
      </Container>
    </GlobalStyles>
  );

  if (!demande) return (
    <GlobalStyles>
      <Container style={{ textAlign: 'center', padding: '4rem' }}>
        <FileText size={48} color={colors.gray500} style={{ marginBottom: '1rem' }} />
        <h3 style={{ color: colors.primary }}>Demande introuvable</h3>
        <p style={{ color: colors.gray500 }}>La demande que vous recherchez n'existe pas ou a été supprimée.</p>
        <PrimaryButton onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Retour
        </PrimaryButton>
      </Container>
    </GlobalStyles>
  );

  return (
    <GlobalStyles>
     
      
      {/* Header professionnel */}
      <ProfessionalHeader>
        <HeaderContent>
          <HeaderTop>
            <PrimaryButton onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
            
            </PrimaryButton>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Référence</div>
              <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{demande.reference}</div>
            </div>
          </HeaderTop>
          
          <HeaderTitle>
            <Shield size={28} />
            Détails de la demande de casier judiciaire
          </HeaderTitle>
          
          <HeaderSubtitle>
            Visualisez l'état et les informations de votre demande en temps réel
          </HeaderSubtitle>
          
          <StatusIndicator>
            <StatusBadge status={demande.status}>
              {getStatusIcon(demande.status)}
              {demande.status === "pending" ? "En traitement" : 
               demande.status === "completed" ? "Complétée" : "Rejetée"}
            </StatusBadge>
            
            <ProgressContainer>
              <ProgressBar status={demande.status} />
            </ProgressContainer>
          </StatusIndicator>
        </HeaderContent>
      </ProfessionalHeader>

      <Container>
        {/* Section Informations personnelles */}
        <Section>
          <SectionHeader onClick={() => toggleSection('personalInfo')}>
            <SectionTitle>
              <User size={20} />
              Informations personnelles
            </SectionTitle>
            {openSections.personalInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </SectionHeader>
          
          <SectionContent isOpen={openSections.personalInfo}>
            <InfoGrid>
              <InfoCard>
                <InfoIcon>
                  <User size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Nom complet</InfoLabel>
                  <InfoValue>{demande.personalInfo.lastName} {demande.personalInfo.firstName}</InfoValue>
                </InfoContent>
              </InfoCard>
              
              <InfoCard>
                <InfoIcon>
                  <Snowflake size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Nom du père</InfoLabel>
                  <InfoValue>{demande.personalInfo.firstName1 || "Non spécifié"}</InfoValue>
                </InfoContent>
              </InfoCard>
              
              <InfoCard>
                <InfoIcon>
                  <HandHeart size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Nom de la mère</InfoLabel>
                  <InfoValue>{demande.personalInfo.firstName2 || "Non spécifié"}</InfoValue>
                </InfoContent>
              </InfoCard>
              
              <InfoCard>
                <InfoIcon>
                  <Calendar size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Date de naissance</InfoLabel>
                  <InfoValue>{formatDate(demande.personalInfo.birthDate)}</InfoValue>
                </InfoContent>
              </InfoCard>
              
              <InfoCard>
                <InfoIcon>
                  <MapPin size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Lieu de naissance</InfoLabel>
                  <InfoValue>{demande.personalInfo.birthPlace || "Non spécifié"}</InfoValue>
                </InfoContent>
              </InfoCard>
              
              <InfoCard>
                <InfoIcon>
                  <Briefcase size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Profession</InfoLabel>
                  <InfoValue>{demande.personalInfo.profession || "Non spécifié"}</InfoValue>
                </InfoContent>
              </InfoCard>
              
              <InfoCard>
                <InfoIcon>
                  <Globe size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Nationalité</InfoLabel>
                  <InfoValue>{demande.personalInfo.nationalite || "Non spécifié"}</InfoValue>
                </InfoContent>
              </InfoCard>
              
              <InfoCard>
                <InfoIcon>
                  <Home size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Adresse</InfoLabel>
                  <InfoValue>{demande.personalInfo.address || "Non spécifié"}</InfoValue>
                </InfoContent>
              </InfoCard>
            </InfoGrid>
          </SectionContent>
        </Section>

        {/* Section Mode de livraison */}
        <Section>
          <SectionHeader onClick={() => toggleSection('delivery')}>
            <SectionTitle>
              <ClipboardCheck size={20} />
              Mode de livraison
            </SectionTitle>
            {openSections.delivery ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </SectionHeader>
          
          <SectionContent isOpen={openSections.delivery}>
            <InfoGrid>
              <InfoCard>
                <InfoIcon>
                  <Briefcase size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Méthode choisie</InfoLabel>
                  <InfoValue>
                    {demande.deliveryMethod === "court" ? "Retrait au tribunal" : 
                     demande.deliveryMethod === "mail" ? "Courrier postal" : 
                     "Email sécurisé"}
                  </InfoValue>
                </InfoContent>
              </InfoCard>
              
              <InfoCard>
                <InfoIcon>
                  <FileSignature size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Statut</InfoLabel>
                  <InfoValue>
                    <span style={{ 
                      color: demande.status === "completed" ? colors.success : 
                            demande.status === "pending" ? colors.warning : 
                            colors.danger,
                      fontWeight: '600'
                    }}>
                      {demande.status === "pending" ? "En préparation" : 
                       demande.status === "completed" ? "Prêt pour livraison" : 
                       "Livraison annulée"}
                    </span>
                  </InfoValue>
                </InfoContent>
              </InfoCard>
              
              {demande.status === "completed" && (
                <InfoCard style={{ gridColumn: '1 / -1', background: colors.light }}>
                  <InfoIcon style={{ background: colors.success }}>
                    <CheckCircle size={16} />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Instructions</InfoLabel>
                    <InfoValue>
                      {getStatusMessage(demande.status)}
                      {demande.deliveryMethod === "court" && (
                        <div style={{ marginTop: '0.5rem' }}>
                          <strong>Documents requis :</strong> Pièce d'identité originale et cette confirmation
                        </div>
                      )}
                    </InfoValue>
                  </InfoContent>
                </InfoCard>
              )}
            </InfoGrid>
          </SectionContent>
        </Section>

        {/* Section Documents */}
        <Section>
          <SectionHeader onClick={() => toggleSection('documents')}>
            <SectionTitle>
              <FileText size={20} />
              Documents joints
            </SectionTitle>
            {openSections.documents ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </SectionHeader>
          
          <SectionContent isOpen={openSections.documents}>
            <InfoGrid>
              {demande.contactInfo?.piece1 ? (
                <InfoCard 
                  onClick={() => setSelectedFile({
                    url: `${import.meta.env.VITE_b}/${path.basename(demande.contactInfo.piece1)}`,
                    name: path.basename(demande.contactInfo.piece1)
                  })}
                  style={{ cursor: 'pointer' }}
                >
                  <InfoIcon>
                    <FileText size={16} />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Pièce jointe 1</InfoLabel>
                    <InfoValue>{path.basename(demande.contactInfo.piece1)}</InfoValue>
                    <div style={{ 
                      marginTop: '0.5rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      color: colors.primary,
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}>
                      <Eye size={14} />
                      Afficher le document
                    </div>
                  </InfoContent>
                </InfoCard>
              ) : (
                <InfoCard>
                  <InfoIcon>
                    <FileText size={16} />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Pièce jointe 1</InfoLabel>
                    <InfoValue style={{ color: colors.gray500 }}>Aucun document fourni</InfoValue>
                  </InfoContent>
                </InfoCard>
              )}
              
              {demande.contactInfo?.piece2 ? (
                <InfoCard 
                  onClick={() => setSelectedFile({
                    url: `${import.meta.env.VITE_b}/${path.basename(demande.contactInfo.piece2)}`,
                    name: path.basename(demande.contactInfo.piece2)
                  })}
                  style={{ cursor: 'pointer' }}
                >
                  <InfoIcon>
                    <FileText size={16} />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Pièce jointe 2</InfoLabel>
                    <InfoValue>{path.basename(demande.contactInfo.piece2)}</InfoValue>
                    <div style={{ 
                      marginTop: '0.5rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      color: colors.primary,
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}>
                      <Eye size={14} />
                      Afficher le document
                    </div>
                  </InfoContent>
                </InfoCard>
              ) : (
                <InfoCard>
                  <InfoIcon>
                    <FileText size={16} />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Pièce jointe 2</InfoLabel>
                    <InfoValue style={{ color: colors.gray500 }}>Aucun document fourni</InfoValue>
                  </InfoContent>
                </InfoCard>
              )}
            </InfoGrid>
          </SectionContent>
        </Section>

        {/* Section Dates */}
        <Section>
          <SectionHeader onClick={() => toggleSection('dates')}>
            <SectionTitle>
              <Calendar size={20} />
              Historique et dates
            </SectionTitle>
            {openSections.dates ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </SectionHeader>
          
          <SectionContent isOpen={openSections.dates}>
            <InfoGrid>
              <InfoCard>
                <InfoIcon>
                  <Calendar size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Date de création</InfoLabel>
                  <InfoValue>{formatDateTime(demande.createdAt)}</InfoValue>
                </InfoContent>
              </InfoCard>
              
              <InfoCard>
                <InfoIcon>
                  <Clock size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Dernière mise à jour</InfoLabel>
                  <InfoValue>{formatDateTime(demande.updatedAt || demande.createdAt)}</InfoValue>
                </InfoContent>
              </InfoCard>
            </InfoGrid>
          </SectionContent>
        </Section>

        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          marginTop: '2rem',
          flexWrap: 'wrap'
        }}>
           
          
          <SecondaryButton onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            
          </SecondaryButton>
        </div>
      </Container>

      {selectedFile && (
        <FileViewerModal 
          fileUrl={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </GlobalStyles>
  );
}

export default DemandeDetail;