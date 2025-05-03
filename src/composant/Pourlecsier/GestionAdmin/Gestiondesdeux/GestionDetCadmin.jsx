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
// Tableau des couleurs pour la rotation
const colorPalette = [
  new THREE.Color(colors.secondary),  // Jaune
  new THREE.Color(colors.primary),    // Bleu marine
  new THREE.Color(colors.success),     // Vert foncé
  new THREE.Color(colors.beigeSableux),
  new THREE.Color(colors.bleuProfond),
  new THREE.Color(colors.blueMarine),
  new THREE.Color(colors.cardBg),
];

export default function GestionDetC() {
  const mountRef = useRef(null);
  const [showContent, setShowContent] = useState(false);
  const rotationCountRef = useRef(0);
  const currentColorIndexRef = useRef(0);

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

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: colorPalette[0],
      metalness: 0.7,
      roughness: 0.25,
      emissive: new THREE.Color(0x111111),
      emissiveIntensity: 0.2
    });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    // Lumières
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-5, 5, 5);
    scene.add(directionalLight);

    let lastRotationY = 0;
    const fullRotation = Math.PI * 2; // Un tour complet en radians

    const animate = () => {
      requestAnimationFrame(animate);
      
      knot.rotation.x += 0.005;
      knot.rotation.y += 0.01;
      
      // Détection d'un tour complet
      if (Math.abs(knot.rotation.y - lastRotationY) >= fullRotation) {
        rotationCountRef.current++;
        lastRotationY = knot.rotation.y;
        
        // Changement de couleur après chaque tour complet
        currentColorIndexRef.current = (currentColorIndexRef.current + 1) % colorPalette.length;
        material.color = colorPalette[currentColorIndexRef.current];
        material.needsUpdate = true;
      }
      
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
      {/* 3D Background avec animation de couleur */}
      <div ref={mountRef} className="absolute inset-0 z-0"></div>

      {/* Content */}
      <div
        className={`z-10 max-w-7xl text-center space-y-10 transform transition duration-1000 ease-in-out ${
          showContent
            ? "opacity-95 scale-100 rotate-0"
            : "opacity-0 scale-90 rotate-3"
        } from-gray-950/100 backdrop-blur-md shadow-2xl rounded-xl p-8`}
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
          <button className="hover:bg-yellow-500 bg-yellow-700 text-black font-semibold px-6 py-3 hover:text-yellow-500 transition-all duration-300">
            <Link
              to="/casieradmin"
              className="no-underline font-bold text-black"
            >
              Csiers judiciaires
            </Link>
          </button>
          <button className="hover:bg-yellow-500 bg-yellow-700 text-black font-semibold px-6 py-3 hover:text-yellow-500 transition-all duration-300">
            <Link to="/adminmere" className="no-underline font-bold text-black">
              Tableau de bord
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
