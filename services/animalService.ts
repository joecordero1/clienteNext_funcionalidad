import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Asegúrate de que esta es la URL correcta de tu API

export const getAnimals = async () => {
    try {
      const response = await axios.get(`${API_URL}/animales`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching animals:', error.response?.data);
        throw new Error(`Error fetching animals: ${error.response?.status} ${error.response?.statusText}`);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('Unexpected error');
      }
    }
  };
  
  export const getAnimalById = async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/animales/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching animal by id:', error.response?.data);
        throw new Error(`Error fetching animal: ${error.response?.status} ${error.response?.statusText}`);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('Unexpected error');
      }
    }
  };
  
  export const createAnimal = async (animal: any, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/animales`, animal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating animal:', error.response?.data);
        throw new Error(`Error creating animal: ${error.response?.status} ${error.response?.statusText}`);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('Unexpected error');
      }
    }
  };
  
  export const updateAnimal = async (id: string, animal: any, token: string) => {
    try {
      const response = await axios.put(`${API_URL}/animales/${id}`, animal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating animal:', error.response?.data);
        throw new Error(`Error updating animal: ${error.response?.status} ${error.response?.statusText}`);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('Unexpected error');
      }
    }
  };
  
  export const deleteAnimal = async (id: string, token: string) => {
    try {
      const response = await axios.delete(`${API_URL}/animales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error deleting animal:', error.response?.data);
        throw new Error(`Error deleting animal: ${error.response?.status} ${error.response?.statusText}`);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('Unexpected error');
      }
    }
  };