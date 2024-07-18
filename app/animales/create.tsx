import React from 'react';
import CreateAnimal from '../../componentes/CreateAnimal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap CSS
import '../styles/globals.css'; // Importar tus estilos globales

const CreateAnimalPage = () => {
  return (
    <div>
      <h1>Crea Nuevo Animal</h1>
      <CreateAnimal />
    </div>
  );
};

export default CreateAnimalPage;
