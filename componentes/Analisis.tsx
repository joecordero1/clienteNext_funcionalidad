'use client';

import React, { useState, useRef, useEffect } from 'react';
import clienteAxios from '../config/axiosConfig';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

interface Sector {
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
}

interface DatosRaza {
  raza: string;
  sector: string;
  conteo: number;
}

const Analisis: React.FC = () => {
  const [sector, setSector] = useState<string>('');
  const [raza, setRaza] = useState<string>('');
  const [datosRaza, setDatosRaza] = useState<DatosRaza | null>(null);
  const razaChartRef = useRef<HTMLCanvasElement>(null);
  const razaChartInstance = useRef<Chart | null>(null);

  const razas = ['Golden', 'Poodle', 'Labrador', 'Mestizo', 'Galgo'];

  const sectores: { [key: string]: Sector } = {
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

  const fetchData = async () => {
    if (sector && raza) {
      try {
        const response = await clienteAxios.get(`/analisis/contar/${sector}/${raza}`);
        setDatosRaza(response.data);
        console.log('Resultado del conteo:', response.data);
        updateChart(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
  };

  const updateChart = (data: DatosRaza) => {
    if (razaChartInstance.current) {
      razaChartInstance.current.destroy();
    }

    const ctx = razaChartRef.current?.getContext('2d');
    if (ctx) {
      razaChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [data.raza],
          datasets: [{
            label: `Cantidad de ${data.raza} en ${data.sector}`,
            data: [data.conteo],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black' // Cambiar el color del texto de la leyenda si es necesario
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'black' // Cambiar el color de los ticks si es necesario
              }
            },
            x: {
              ticks: {
                color: 'black' // Cambiar el color de los ticks si es necesario
              }
            }
          },
          layout: {
            padding: 20
          }
        }
      });

      // Cambiar el color de fondo del gráfico
      ctx.canvas.style.backgroundColor = 'white';
    }
  };

  return (
    <div>
      <h2>Análisis de Razas por Sector</h2>
      <form onSubmit={e => e.preventDefault()}>
        <div className="campo">
          <label>Seleccione Sector:</label>
          <select name="sector" onChange={e => setSector(e.target.value)} value={sector}>
            <option value="">-- Seleccione un sector --</option>
            {Object.keys(sectores).map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Raza:</label>
          <select onChange={e => setRaza(e.target.value)} value={raza}>
            <option value="">Seleccione una raza</option>
            {razas.map((raza, index) => (
              <option key={index} value={raza}>{raza}</option>
            ))}
          </select>
        </div>
        <button onClick={fetchData} disabled={!sector || !raza}>Consultar</button>
      </form>
      <canvas ref={razaChartRef}></canvas>
    </div>
  );
};

export default Analisis;
