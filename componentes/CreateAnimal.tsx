'use client';

import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import axios, { AxiosError } from 'axios';
import { createAnimal } from '../services/animalService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap CSS
import '../app/styles/globals.css'; // Importar tus estilos globales

// Contexto de autenticación (simulado)
const AuthContext = React.createContext({ token: '' });

const CreateAnimal = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();

  const [animal, setAnimal] = useState({
    tipoAnimal: '',
    raza: '',
    ubicacion: { type: 'Point', coordinates: [0, 0] },
    edad: '',
    sexo: ''
  });

  const updateState = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAnimal({
      ...animal,
      [e.target.name]: e.target.value
    });
  };

  const addAnimal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createAnimal(animal, token);
      Swal.fire('Success', response.message, 'success');
      router.push('/animals');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.code === 11000) {
          Swal.fire('Error', 'Animal already registered', 'error');
        } else {
          Swal.fire('Error', 'There was an error', 'error');
        }
      } else {
        Swal.fire('Error', 'Unexpected error', 'error');
      }
    }
  };

  const validateAnimal = () => {
    const { tipoAnimal, raza, ubicacion, edad, sexo } = animal;
    return !(tipoAnimal && raza && ubicacion.coordinates.length && edad && sexo);
  };

  const updateLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnimal(prevState => ({
      ...prevState,
      ubicacion: {
        ...prevState.ubicacion,
        coordinates: name === 'latitud'
          ? [Number(value), prevState.ubicacion.coordinates[1]]
          : [prevState.ubicacion.coordinates[0], Number(value)]
      }
    }));
  };

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  return (
    <Fragment>
      <h2>New Animal</h2>
      <form onSubmit={addAnimal}>
        <legend>Fill all the fields</legend>
        <div className="field">
          <label>Animal Type:</label>
          <select name="tipoAnimal" onChange={updateState}>
            <option value="">-- Select --</option>
            {['Dog', 'Cat'].map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Breed:</label>
          <select name="raza" onChange={updateState}>
            <option value="">-- Select --</option>
            {['Golden', 'Poodle', 'Labrador', 'Mestizo', 'Greyhound'].map(raza => (
              <option key={raza} value={raza}>{raza}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Age:</label>
          <input type="number" placeholder="Age" name="edad" onChange={updateState} />
        </div>
        <div className="field">
          <label>Gender:</label>
          <select name="sexo" onChange={updateState}>
            <option value="">-- Select --</option>
            {['Male', 'Female', 'Not identified'].map(sexo => (
              <option key={sexo} value={sexo}>{sexo}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Latitude:</label>
          <input type="number" placeholder="Latitude" name="latitud" onChange={updateLocation} />
        </div>
        <div className="field">
          <label>Longitude:</label>
          <input type="number" placeholder="Longitude" name="longitud" onChange={updateLocation} />
        </div>
        <div className="submit">
          <input type="submit" className="btn btn-blue" value="Add Animal" disabled={validateAnimal()} />
        </div>
      </form>
    </Fragment>
  );
};

export default CreateAnimal;
