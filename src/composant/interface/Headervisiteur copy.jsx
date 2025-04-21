import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';
import guine1 from "../../assets/guin1.avif";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <TopBar>
        <TopBarContainer>
          <TopBarContact>
            <ContactLink href="tel:+624 138 395">
              <FaPhoneAlt /> <span>624 138 395</span>
            </ContactLink>
            <ContactLink href="mailto:contact@casier-judiciaire-officiel.com">
              <FaEnvelope /> <span>contact@casierjudiciaire.com</span>
            </ContactLink>
            <ContactLink href="#">
              <FaMapMarkerAlt /> <span>Guinée, Conakry</span>
            </ContactLink>
          </TopBarContact>
          
        </TopBarContainer>
      </TopBar>

      <MainHeader>
        <HeaderContainer>
          <LogoContainer>
            <Logo src={guine1} alt="Logo Service Casier Judiciaire" />
            <LogoText>
              <LogoTitle>Service Officiel</LogoTitle>
              <LogoSubtitle>Demande Judiciaire en Ligne</LogoSubtitle>
            </LogoText>
          </LogoContainer>

          <NavMenu mobileMenuOpen={mobileMenuOpen}>
            <NavLink href="#" active>Accueil</NavLink>
            <NavLink href="#service">Notre Service</NavLink>
            <NavLink href="#process">Procédure</NavLink>
            <NavLink href="#types">Types de Casiers</NavLink>
            <NavLink href="#faq">Questions</NavLink>
            <MobileCta href="#demande">Demande en ligne</MobileCta>
          </NavMenu>

          <HeaderCta>
            <PrimaryButton href="#demande">Demande en ligne</PrimaryButton>
          </HeaderCta>

          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </HeaderContainer>
      </MainHeader>

      <HeroBanner>
        <HeroContainer>
          <HeroTitle>Obtenez votre Casier Judiciaire en 3 étapes simples</HeroTitle>
          <HeroSubtitle>Service sécurisé et accrédité par le Ministère de la Justice</HeroSubtitle>
          <HeroCta>
            <PrimaryButton large href="#demande">Demander maintenant</PrimaryButton>
            <OutlineButton href="#process">En savoir plus</OutlineButton>
          </HeroCta>
        </HeroContainer>
      </HeroBanner>
    </>
  );
};

// Styles avec Styled Components
const colors = {
  primary: '#1a3e72',
  secondary: '#e8b339',
  light: '#f8f9fa',
  dark: '#212529',
  success: '#28a745'
};

const TopBar = styled.div`
  background-color: ${colors.primary};
  color: white;
  padding: 0.5rem 0;
  font-size: 0.9rem;
`;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const TopBarContact = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
    font-size: 0.8rem;
  }

  @media (max-width: 576px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ContactLink = styled.a`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }

  svg {
    font-size: 0.9rem;
  }
`;

const TopBarCta = styled.div``;

const FaqLink = styled.a`
  background-color: ${colors.secondary};
  color: ${colors.dark};
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: #d6a22c;
  }
`;

const MainHeader = styled.header`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 576px) {
    gap: 0.5rem;
  }
`;

const Logo = styled.img`
  height: 60px;

  @media (max-width: 576px) {
    height: 50px;
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.primary};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const LogoSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${colors.dark};
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 992px) {
    position: fixed;
    top: 105px;
    left: ${props => props.mobileMenuOpen ? '0' : '-100%'};
    width: 100%;
    height: calc(100vh - 105px);
    background-color: white;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem;
    gap: 2rem;
    transition: left 0.3s ease;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
`;

const NavLink = styled.a`
  color: ${props => props.active ? colors.primary : colors.dark};
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem 0;

  &:after {
    content: '';
    position: absolute;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${colors.secondary};
    transition: width 0.3s;
  }

  &:hover:after {
    width: 100%;
  }

  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`;

const HeaderCta = styled.div`
  @media (max-width: 992px) {
    display: none;
  }
`;

const PrimaryButton = styled.a`
  background-color: ${colors.primary};
  color: white;
  padding: ${props => props.large ? '0.8rem 1.8rem' : '0.6rem 1.2rem'};
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  display: inline-block;

  &:hover {
    background-color: #122a4f;
    transform: translateY(-2px);
    box-shadow: ${props => props.large ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${colors.primary};
  cursor: pointer;

  @media (max-width: 992px) {
    display: block;
  }
`;

const MobileCta = styled.a`
  display: none;
  background-color: ${colors.primary};
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
  width: 100%;

  @media (max-width: 992px) {
    display: block;
  }
`;

const HeroBanner = styled.section`
  background: linear-gradient(rgba(26, 62, 114, 0.8), rgba(26, 62, 114, 0.9)), 
              url('/legal-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 4rem 1rem;
  text-align: center;
`;

const HeroContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (max-width: 992px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: 300;

  @media (max-width: 992px) {
    font-size: 1rem;
  }
`;

const HeroCta = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const OutlineButton = styled.a`
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 0.8rem 1.8rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

export default Header;