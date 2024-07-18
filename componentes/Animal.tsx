'use client';

import React, { useContext, useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import { deleteAnimal } from '../services/animalService';
import { useRouter } from 'next/navigation';
import { Animal as AnimalType } from '../types/animal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../app/styles/globals.css';

// Contexto de autenticación (simulado)
const AuthContext = React.createContext({ token: '' });

const sectores = {
  'Centro Histórico': { latMin: 0, latMax: 10, lonMin: 0, lonMax: 10 },
  'La Mariscal': { latMin: 10, latMax: 20, lonMin: 5, lonMax: 15 },
  'La Floresta': { latMin: 5, latMax: 15, lonMin: 15, lonMax: 25 },
  'Guápulo': { latMin: 15, latMax: 25, lonMin: 20, lonMax: 30 },
  'González Suárez': { latMin: 20, latMax: 25, lonMin: 0, lonMax: 10 },
  'Cumbayá y Tumbaco': { latMin: 40, latMax: 50, lonMin: 26, lonMax: 40 },
  'El Batán': { latMin: 30, latMax: 39, lonMin: 27, lonMax: 37 },
  'El Inca': { latMin: 30, latMax: 40, lonMin: 0, lonMax: 10 },
  'La Carolina': { latMin: 41, latMax: 50, lonMin: 10, lonMax: 20 },
  'La Concepción': { latMin: 50, latMax: 60, lonMin: 0, lonMax: 10 },
  'Carcelén': { latMin: 61, latMax: 81, lonMin: 10, lonMax: 20 },
  'Quito Norte': { latMin: 61, latMax: 81, lonMin: -30, lonMax: -1 },
  'Quito Sur': { latMin: -23, latMax: -50, lonMin: -10, lonMax: 10 },
  'Chillogallo': { latMin: -11, latMax: -22, lonMin: -5, lonMax: 5 },
  'San Juan': { latMin: -1, latMax: -10, lonMin: -11, lonMax: -1 }
};

const determinarSector = (coordinates: [number, number]): string => {
  const [lon, lat] = coordinates;
  for (const [sector, limites] of Object.entries(sectores)) {
    if (
      lat >= limites.latMin &&
      lat < limites.latMax &&
      lon >= limites.lonMin &&
      lon < limites.lonMax
    ) {
      return sector;
    }
  }
  return 'Sector Desconocido';
};

const Animal = ({ animal }: { animal: AnimalType }) => {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const [sector, setSector] = useState('');

  useEffect(() => {
    setSector(determinarSector(animal.ubicacion.coordinates));
  }, [animal.ubicacion.coordinates]);

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Confirmación",
      text: "No es posible revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAnimal(id, token);
          Swal.fire("Eliminado", "El animal ha sido eliminado", "success");
        } catch (error) {
          Swal.fire('Error', 'No se pudo eliminar el animal', 'error');
        }
      }
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/animales/editar/${id}`);
  };

  return (
    <li className="list-group-item">
      <div className="info-animal">
        <p className="fw-bold">IDAnimal: {animal._id}</p>
        <p className="fw-normal">Tipo Animal: {animal.tipoAnimal}</p>
        <p>Raza: {animal.raza}</p>
        <p>Ubicación: {sector}</p>
        <p>Edad: {animal.edad}</p>
        <p>Sexo: {animal.sexo}</p>
        <p>Fecha de Registro: {animal.fechaRegistro}</p>
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={() => handleEdit(animal._id)}>
          <i className="fas fa-pen-alt"></i> Editar Animal
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(animal._id)}>
          <i className="fas fa-times"></i> Eliminar Animal
        </button>
      </div>
    </li>
  );
};

export default Animal;
