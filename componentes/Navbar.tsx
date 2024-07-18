'use client';

import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap CSS
import '../app/styles/globals.css'; // Importar tus estilos globales

const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            Animal Management
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/animales">
                  Animales
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/analisis" className="nav-link">
                    Análisis
                </Link>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;