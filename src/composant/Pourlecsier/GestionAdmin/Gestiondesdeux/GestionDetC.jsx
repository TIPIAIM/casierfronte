import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
  bleuProfond: "#003566",
  beigeSableux: "#F2E9DC",
  primary: "#002B5B",
  secondary: "#F2C94C",
  success: "#1A4D2E",
  warning: "#F2C94C",
  error: "#C53030",
  background: "#F2E9DC",
  text: "#002B5B",
  textLight: "#4A5568",
  border: "#E2E8F0",
  borderDark: "#CBD5E0",
  cardBg: "#FFFFFF",
};

export default function GestionDetC() {
  const mountRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: colors.secondary,
      metalness: 0.7,
      roughness: 0.25,
    });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(colors.goldenYellow, 0.4);
    scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);
      knot.rotation.x += 0.01;
      knot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br to-gray-950 from-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* 3D Background */}
      <div ref={mountRef} className="absolute inset-0 z-0"></div>

      {/* Content */}
      <div
        className={`z-10 max-w-7xl text-center space-y-10 transform transition duration-1000 ease-in-out ${
          showContent
            ? "opacity-95 scale-100 rotate-0"
            : "opacity-0 scale-90 rotate-3"
        } from-gray-950/100 backdrop-blur-md shadow-2xl rounded-xl `}
      >
        <header className="flex justify-between items-center mb-6">
          <div className="text-4xl font-black text-yellow-400">⚖️</div>
          <nav className="space-x-6 text-sm">
            <Link
              to="/gestiondemande"
              className=" hover:text-yellow-500 no-underline font-bold  text-gray-300"
            >
              Demandes
            </Link>
            <Link
              to="/gestionCondanations"
              className="hover:text-yellow-500 no-underline font-bold  text-gray-300"
            >
              Condanations
            </Link>
          </nav>
        </header>

        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Extrait de Casier Judiciaire en Ligne <br />
          simple-rapide-sécurisé
        </h2>

        <p className="text-gray-300">
          Acceder aux informations d'extrait de casier judiciaire en toute
          sécurité
        </p>
        <p className="text-yellow-300 font-medium">
          <br /> Service agréé par le Ministère de la Justice
        </p>

        {/* Form */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <button className="bg-yellow-500 hover:bg-green-500 text-black font-semibold px-6 py-3 hover:text-yellow-500 transition-all duration-300">
            <Link to="/casieradmin" className="no-underline font-bold text-black">
              Csiers judiciaires
            </Link>
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Republique de guinée . Travail-Justice-Solidarité.
        </p>
      </div>
    </div>
  );
}
