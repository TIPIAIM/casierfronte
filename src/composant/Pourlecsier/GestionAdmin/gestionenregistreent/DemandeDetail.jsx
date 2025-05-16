import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
  View,
  Eye
} from "lucide-react";
import path from "path-browserify";
import Interfcehed from "../../../interface/Interfceheddetil";

// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
  bleuProfond: "#003566",
  beigeSableux: "#F2E9DC",
  lightBg: "#F8F6F2"
};

// Styles
const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
 //background: ${colors.bleuProfond};
  border-radius: 8px;
 // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${colors.blueMarine};
  padding-bottom: 1rem;
`;

const BackButton = styled.button`
  background: ${colors.blueMarine};
  color: ${colors.white};
  border: none;
  
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
  &:hover {
    background: ${colors.bleuProfond};
  }
`;

const Title = styled.h1`
  color: ${colors.blueMarine};
  font-size: 1.8rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${colors.blueMarine};
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid ${colors.beigeSableux};
  padding-bottom: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconWrapper = styled.div`
  color: ${colors.blueMarine};
  display: flex;
  align-items: flex-start;
  padding-top: 0.2rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const Label = styled.div`
  font-weight: 600;
  color: ${colors.bleuProfond};
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Value = styled.div`
  color: #333;
  padding-left: 1.5rem;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  &.pending {
    background: ${colors.goldenYellow}15;
    color: ${colors.goldenYellow};
  }
  &.completed {
    background: ${colors.greenDark}15;
    color: ${colors.greenDark};
  }
  &.rejected {
    background: #c5303015;
    color: #c53030;
  }
`;

const FileViewerContainer = styled.div`
  margin-top: 1rem;
  border: 1px solid ${colors.beigeSableux};

 // padding: 1rem;
  max-height: 500px;
  overflow: auto;
`;

const FileViewer = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: 400px;
  border: none;
`;

const FileViewerButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  background: ${colors.blueMarine};
  color: ${colors.white};
  border-radius: 4px;
  text-decoration: none;
  margin-top: 0.5rem;
  border: none;
  cursor: pointer;
  &:hover {
    background: ${colors.bleuProfond};
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StatusMessage = styled.div`
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  background: ${colors.lightBg};
  border-left: 4px solid;
  
  &.pending {
    border-color: ${colors.goldenYellow};
    background: ${colors.goldenYellow}10;
  }
  &.completed {
    border-color: ${colors.greenDark};
    background: ${colors.greenDark}10;
  }
  &.rejected {
    border-color: #c53030;
    background: #c5303010;
  }
`;

const ActionCard = styled.div`
  background: ${colors.white};
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border: 1px solid ${colors.beigeSableux};
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const TribunalInfo = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${colors.blueMarine}05;
  border-radius: 8px;
  border: 1px dashed ${colors.blueMarine}30;
`;

const ProgressBar = styled.div`
  height: 6px;
  background: ${colors.beigeSableux};
  border-radius: 3px;
  margin: 1rem 0;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: ${props => props.status === "completed" 
    ? colors.greenDark 
    : props.status === "rejected" 
      ? "#c53030" 
      : colors.goldenYellow};
  width: ${props => props.status === "pending" ? "60%" : "100%"};
  transition: width 0.3s ease;
`;

const PrintButton = styled(FileViewerButton)`
  background: ${colors.greenDark};
  margin-top: 1rem;
`;

function DemandeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const response = await fetch(

         // `http://localhost:2027/api/demande/by-id/${id}`
         `${import.meta.env.VITE_b}/api/demande/by-id/${id}`,
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Échec du chargement");
        }

        const data = await response.json();

        if (data.success) {
          setDemande(data.data);
        } else {
          throw new Error(data.message || "Demande non trouvée");
        }
      } catch (err) {
        setError(err.message);
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDemande();
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} />;
      case "pending":
        return <Clock size={16} />;
      case "rejected":
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Non spécifié";
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Non spécifié";
    const options = { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const getDeliveryInstructions = (method) => {
    switch(method) {
      case "court":
        return "Vous pouvez le retirer au tribunal aux horaires d'ouverture.";
      case "mail":
        return "Il vous sera envoyé par courrier postal à l'adresse indiquée.";
      case "email":
        return "Il vous sera envoyé par email sécurisé dans les 24h.";
      default:
        return "";
    }
  };

  const getDeliveryDetails = (method) => {
    switch(method) {
      case "court":
        return "Présentez-vous au tribunal avec votre pièce d'identité et ce numéro de référence.";
      case "mail":
        return "Votre document sera envoyé à l'adresse postale renseignée dans votre demande.";
      case "email":
        return "Vous recevrez un email sécurisé avec les instructions pour télécharger votre document.";
      default:
        return "";
    }
  };

  if (loading) return <Container>Chargement en cours...</Container>;
  if (error) return <Container>Erreur: {error}</Container>;
  if (!demande) return <Container>Demande non trouvée</Container>;

  return (
    <div className=" bg-green-0">
<Interfcehed/>
        <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          
        </BackButton>
        <Title>{demande.reference}</Title>
      </Header>

      {/* Section Statut améliorée */}
      <Section>
        <SectionTitle>
          <CheckCircle size={20} />
          Statut du dossier
        </SectionTitle>
        
        <ProgressBar>
          <Progress status={demande.status} />
        </ProgressBar>
        
        <StatusContainer>
          <StatusBadge className={demande.status || "pending"}>
            {getStatusIcon(demande.status || "pending")}
            {demande.status === "pending"
              ? "En traitement"
              : demande.status === "completed"
              ? "Prêt à être retiré"
              : "Rejeté"}
          </StatusBadge>
          
          <StatusMessage className={demande.status || "pending"}>
            {demande.status === "pending" ? (
              <>Votre dossier est en cours de traitement. Veuillez patienter.</>
            ) : demande.status === "completed" ? (
              <>Votre casier judiciaire est prêt. {getDeliveryInstructions(demande.deliveryMethod)}</>
            ) : (
              <>Votre demande a été rejetée. Veuillez contacter le tribunal pour plus d'informations.</>
            )}
          </StatusMessage>
        </StatusContainer>

        {demande.status === "completed" && (
          <ActionCard>
            <h3 style={{ color: colors.greenDark, marginBottom: '1rem' }}>
              <CheckCircle size={20} style={{ marginRight: '0.5rem' }} />
              Prochaines étapes
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              {getDeliveryDetails(demande.deliveryMethod)}
            </p>
    { /*      <FileViewerButton>
              <Download size={16} />
              Télécharger l'accusé de réception
            </FileViewerButton>*/}

            {demande.deliveryMethod === "court" && (
              <>
                <h4 style={{ margin: '1.5rem 0 0.5rem', color: colors.blueMarine }}>
                  <FileText size={18} style={{ marginRight: '0.5rem' }} />
                  Documents à présenter
                </h4>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li>Pièce d'identité originale ou Passeport</li>
                  <li>Ce récapitulatif (à imprimer)</li>
                  <li>Numéro de référence: <strong>{demande.reference}</strong></li>
                </ul>
              </>
            )}
          </ActionCard>
        )}

        {demande.status === "rejected" && (
          <ActionCard>
            <h3 style={{ color: '#c53030', marginBottom: '1rem' }}>
              <AlertCircle size={20} style={{ marginRight: '0.5rem' }} />
              Motif du rejet
            </h3>
            <p>Veuillez contacter le tribunal pour connaître les raisons précises du rejet de votre demande.</p>
          </ActionCard>
        )}

        <TribunalInfo>
          <h3 style={{ color: colors.blueMarine, marginBottom: '1rem' }}>
            <MapPin size={20} style={{ marginRight: '0.5rem' }} />
            Tribunal compétent
          </h3>
          <p>
            <strong>Adresse :</strong> Tribunal de Guinée, Place du Palais, Conakry
          </p>
          <p>
            <strong>Horaires :</strong> Lundi-Vendredi, 8h-15h
          </p>
          <p>
            <strong>Téléphone :</strong> +224 612 254 254
          </p>
        </TribunalInfo>
      </Section>

      {/* Section Informations personnelles */}
      <Section>
        <SectionTitle>
          <User size={20} />
          Informations personnelles
        </SectionTitle>
        <InfoGrid>
          <InfoItem>
            <IconWrapper>
              <Hand size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Nom complet</Label>
              <Value>
                {demande.personalInfo.lastName} {demande.personalInfo.firstName}
              </Value>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <Snowflake size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Nom du père</Label>
              <Value>
                {demande.personalInfo.firstName1 &&
                  ` ${demande.personalInfo.firstName1}`}
              </Value>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <HandHeart size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Mère</Label>
              <Value>
                {demande.personalInfo.firstName2 &&
                  ` ${demande.personalInfo.firstName2}`}
              </Value>
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <IconWrapper>
              <Calendar size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Date de naissance</Label>
              <Value>{formatDate(demande.personalInfo.birthDate)}</Value>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <MapPin size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Lieu de naissance</Label>
              <Value>{demande.personalInfo.birthPlace}</Value>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <Briefcase size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Situation familiale</Label>
              <Value>
                {demande.personalInfo.situationFamiliale
                  .charAt(0)
                  .toUpperCase() +
                  demande.personalInfo.situationFamiliale.slice(1)}
              </Value>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <Briefcase size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Profession</Label>
              <Value>{demande.personalInfo.profession}</Value>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <Globe size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Pays de naissance</Label>
              <Value>{demande.personalInfo.pays}</Value>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <Globe size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Nationalité</Label>
              <Value>{demande.personalInfo.nationalite}</Value>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <Globe size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Pays de résidence</Label>
              <Value>{demande.personalInfo.payss}</Value>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <MapPin size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Domicile</Label>
              <Value>{demande.personalInfo.villecommune}</Value>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <Home size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Adresse</Label>
              <Value>{demande.personalInfo.address}</Value>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <Mail size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Email</Label>
              <Value>{demande.personalInfo.email}</Value>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <IconWrapper>
              <Phone size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Téléphone</Label>
              <Value>{demande.personalInfo.phone}</Value>
            </InfoContent>
          </InfoItem>
        </InfoGrid>
      </Section>

      {/* Section Mode de livraison */}
      <Section>
        <SectionTitle>
          <Briefcase size={20} />
          Mode de livraison
        </SectionTitle>
        <InfoItem>
          <IconWrapper>
            <Briefcase size={16} />
          </IconWrapper>
          <InfoContent>
            <Label>Méthode choisie</Label>
            <Value>
              {demande.deliveryMethod === "court"
                ? "Retrait au tribunal"
                : demande.deliveryMethod === "mail"
                ? "Courrier postal"
                : "Email sécurisé"}
            </Value>
          </InfoContent>
        </InfoItem>
      </Section>

      {/* Section Pièces jointes */}
      <Section>
        <SectionTitle>
          <Download size={20} />
          Pièces jointes
        </SectionTitle>
        <InfoGrid>
          <InfoItem>

            <InfoContent>
             
              {demande.contactInfo?.piece1 ? (
                <>
                  <FileViewerButton
                    onClick={() => window.open(
                      `http://localhost:2027/${path.basename(
                        demande.contactInfo.piece1
                      )}`,
                      '_blank'
                    )}
                  >
                    <Eye size={16} />
                    Ouvrir
                  </FileViewerButton>
                  <FileViewerContainer>
                    <FileViewer
                      src={`http://localhost:2027/${path.basename(
                        demande.contactInfo.piece1
                      )}`}
                      title="Pièce justificative 1"
                    />
                  </FileViewerContainer>
                </>
              ) : (
                <Value>Non fournie</Value>
              )}
            </InfoContent>
          </InfoItem>
          <InfoItem>
          
            <InfoContent>
            
              {demande.contactInfo?.piece1 ? (
                <>
                  <FileViewerButton
                    onClick={() => window.open(
                      `${import.meta.env.VITE_b}/${path.basename(
                        demande.contactInfo.piece1
                      )}`,
                      '_blank'
                    )}
                  >
                    <Eye size={16} />
                    Ouvrir
                  </FileViewerButton>
                  <FileViewerContainer>

                    <FileViewer
                      src={`${import.meta.env.VITE_b}/${path.basename(
                        demande.contactInfo.piece2
                      )}`}
                      title="Pièce justificative 2"
                    />
                  </FileViewerContainer>
                </>
              ) : (
                <Value>Non fournie</Value>
              )}
            </InfoContent>
          </InfoItem>
        </InfoGrid>
      </Section>

      {/* Section Dates */}
      <Section>
        <SectionTitle>
          <Calendar size={20} />
          Dates importantes
        </SectionTitle>
        <InfoGrid>
          <InfoItem>
            <IconWrapper>
              <Calendar size={16} />
            </IconWrapper>
            <InfoContent>
              <Label>Date de création</Label>
              <Value>
                {formatDateTime(demande.createdAt)}
              </Value>
            </InfoContent>
          </InfoItem>
          {demande.updatedAt && (
            <InfoItem>
              <IconWrapper>
                <Calendar size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Dernière mise à jour</Label>
                <Value>
                  {formatDateTime(demande.updatedAt)}
                </Value>
              </InfoContent>
            </InfoItem>
          )}
        </InfoGrid>
      </Section>

      <PrintButton onClick={() => window.print()}>
        <Printer size={16} />
        Imprimer ce récapitulatif
      </PrintButton>
    </Container>
    </div>
  
  );
}

export default DemandeDetail;