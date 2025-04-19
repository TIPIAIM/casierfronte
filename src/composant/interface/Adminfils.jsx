import React from "react";
import LogoutButton from "../identification/Deconnexion";

const Adminfils = () => {
  return (
    <div>
      <h1 className=" bg-red-700">Client ayan un compte</h1>
      <LogoutButton /> {/* Ajoute le bouton de déconnexion */}
    </div>
  );
};

export default Adminfils;
