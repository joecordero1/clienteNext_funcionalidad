import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'http://localhost:5000' // Reemplaza esto con la URL base de tu API
});

export default clienteAxios;
