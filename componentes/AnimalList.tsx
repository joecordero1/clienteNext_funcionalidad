'use client';

import React, { useEffect, useState, Fragment, useContext } from 'react';
import Swal from 'sweetalert2';
import { getAnimals } from '../services/animalService';
import Animal from './Animal';
import { Animal as AnimalType } from '../types/animal'; // Importar la interfaz
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap CSS
import '../app/styles/globals.css'; // Importar tus estilos globales

// Contexto de autenticación (simulado)
const AuthContext = React.createContext({ token: '' });

const AnimalList = () => {
  const { token } = useContext(AuthContext);
  const [animales, setAnimales] = useState<AnimalType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const data = await getAnimals();
        console.log('Fetched animals:', data); // Agregar console.log para ver los datos
        setAnimales(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          Swal.fire('Error', error.message, 'error');
        }
      }
    };

    fetchAnimals(); // Llamar a la función para cargar los animales
  }, [token]); // Dependencia del useEffect para actualizar cuando cambie el token

  return (
    <Fragment>
      <h2>Animales</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="animal-list">
        {animales.map((animal) => (
          <Animal key={animal._id} animal={animal} />
        ))}
      </ul>
    </Fragment>
  );
};

export default AnimalList;
