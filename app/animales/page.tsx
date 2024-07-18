import React from 'react';
import AnimalList from '../../componentes/AnimalList';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap CSS
import '../styles/globals.css'; // Importar tus estilos globales

const AnimalsPage = () => {
  return (
    <div>
      <h1>Administrador de animales</h1>
      <AnimalList />
    </div>
  );
};

export default AnimalsPage;
