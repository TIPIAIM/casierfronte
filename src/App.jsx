import { Routes, Route, BrowserRouter } from "react-router-dom";
//import "./App.css";
import LoginForm from "./composant/identification/LoginForm";
import Senregistrer from "./composant/identification/Senregistrer";
import VerifyEmail from "./composant/identification/VerifyEmail";
import ProtectedRoute from "./composant/identification/ProtectedRoute ";

import Adminfils from "./composant/interface/Adminfils";
import Visiteur from "./composant/interface/Visiteur";

import Guineedemrce from "./composant/Pourlecsier/Guineen/Guineedemrce";
import Etrngerguinee from "./composant/Pourlecsier/Etrnger/Etrngerguinee";
import Videoexpli from "./composant/Pourlecsier/Videoexpli";
import Voirmademande from "./composant/Pourlecsier/Voirmademande";
import Commencerdem from "./composant/Pourlecsier/GestionAdmin/gestionenregistreent/Commencerdem";
import DemandesList from "./composant/Pourlecsier/GestionAdmin/gestionenregistreent/DemandesList";
import DemandeDetail from "./composant/Pourlecsier/GestionAdmin/gestionenregistreent/DemandeDetaildmin";
import DemandeMisejour from "./composant/Pourlecsier/GestionAdmin/gestionenregistreent/DemandeMisejour";
import EnregistreCondntion from "./composant/Pourlecsier/GestionAdmin/gestioncond/CondntionEnregistre";
import ListeCondamnations from "./composant/Pourlecsier/GestionAdmin/gestioncond/ListeCondamnations";
import Casier from "./composant/Pourlecsier/GestionAdmin/CsierJudicir";
import Gestiondesdeux from "./composant/Pourlecsier/GestionAdmin/Gestiondesdeux/GestionDetCadmin";
import Interfcedebut from "./composant/Pourlecsier/GestionAdmin/Gestiondesdeux/Interfcedebut";
import GestionDetC from "./composant/Pourlecsier/GestionAdmin/Gestiondesdeux/GestionDetCadmin";
import CsierJudicirpouradmin from "./composant/Pourlecsier/GestionAdmin/CsierJudicirpouradmin";
import GestiondemàndcsierAdmin from "./composant/Pourlecsier/GestionAdmin/gestionenregistreent/GestiondemàndcsierAdmin";
import GestioncondAdmin from "./composant/Pourlecsier/GestionAdmin/gestioncond/GestionCondanations";
import Adminmere from "./composant/interface/Adminmere";
import TbleoListe from "./composant/Pourlecsier/GestionAdmin/gestionenregistreent/Sttistk/TbleoListe";
import SessionList from "./composant/Pourlecsier/GestionAdmin/Session/SessionList";
import InstallPWAButton from "./composant/Applicationtelech/InstallPWAButton";
import { useEffect } from "react";
import MonQRCode from "./kr";
//Assure-toi que AvatarProfileButtondmin la route Adminfils est protégée et accessible uniquement aux utilisateurs authentifiés.
function App() {
  useEffect(() => {
    window.addEventListener("appinstalled", () => {
      alert("Merci d’avoir installé l’application !");
      // ou : toast("Merci d’avoir installé…")
    });
  }, []);
  {
    /*
       <div>
      <BrowserRouter>
        {" "}
        <Navbarrr />
        <StructuredData />
        <Routes>
          <Route index element={<Hero />} />
          <Route path="*" element={<Erreurr />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contacnous />} />
          <Route path="/apropos" element={<Quisommenous />} />
          <Route path="/realisation" element={<Realisations />} />
        </Routes>
      
      </BrowserRouter>
    </div> 

      <Route
          path="/miseajourAclientRecup/:id"
          element={<MiseajourAjoutclientRecup />}
        />
        LoginForm RegisterForm
      */
  }
  return (
    <div>
      <InstallPWAButton />
      <BrowserRouter>
        <Routes>
          <Route index element={<Interfcedebut />} />
          <Route path="/seconnecter" element={<LoginForm />} />
          <Route path="/enregistrer" element={<Senregistrer />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/demande-guinee" element={<Guineedemrce />} />
          <Route path="/demande-etranger" element={<Etrngerguinee />} />
          <Route path="/videoexplic" element={<Videoexpli />} /> {/*à video */}
          <Route path="/demande" element={<Commencerdem />} /> {/*à video */}
          <Route path="/demandesList" element={<DemandesList />} />{" "}
          <Route path="/gestiondesdeux" element={<Gestiondesdeux />} />{" "}
          <Route path="/demandesListstati" element={<TbleoListe />} />{" "}
          <Route path="/debut" element={<Visiteur />} /> {/*à video */}
          <Route path="/gestionDetC" element={<GestionDetC />} />
          <Route path="/casieradmin" element={<CsierJudicirpouradmin />} />
          <Route path="/gestiondemande" element={<GestiondemàndcsierAdmin />} />
          <Route path="/gestionCondanations" element={<GestioncondAdmin />} />
          <Route path="/adminmere" element={<Adminmere />} />
          <Route path="/sessionlist" element={<SessionList />} />
          <Route path="/demandeid/:id" element={<DemandeDetail />} />
          <Route path="/monQRCode" element={<MonQRCode />} />

          {/** pour les detil statistiques*/}
          <Route path="/demandemisejour/:id" element={<DemandeMisejour />} />
          {/** pour verify-email les mise à jour */}
          <Route
            path="/EnregistreCondanation"
            element={<EnregistreCondntion />}
          />
          <Route path="/listeCondamnations" element={<ListeCondamnations />} />
          <Route path="/casier" element={<Casier />} />
          {/*à video 



          <Route
            path="/gestionenregistrement"
            element={<ProtectedRoute>{/*<Adminfils />*/}
          {/* 
          
          
          Protection des route admin lors de connexion config àpres  */}
          <Route
            path="/demande"
            element={<ProtectedRoute>{/*<Adminfils />*/}</ProtectedRoute>}
          />{" "}
          {/* Protection des route admin lors de connexion config àpres */}
          <Route path="/adminfils" element={<Adminfils />} /> {/*à video */}
          <Route path="/voir-mes-demandes" element={<Voirmademande />} />{" "}
          {/*à video  */}
          <Route
            path="/etranger"
            element={<ProtectedRoute>{/* <Etrngerguinee /> */}</ProtectedRoute>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
