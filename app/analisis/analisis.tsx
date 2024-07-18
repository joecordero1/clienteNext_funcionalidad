import React from 'react';
import Analisis from '../../componentes/Analisis';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap CSS
import '../styles/globals.css'; // Importar tus estilos globales

const AnalisisPage = () => {
  return (
    <div>
      <h1>Administrador de animales</h1>
      <Analisis />
    </div>
  );
};

export default AnalisisPage;
