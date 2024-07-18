export interface Animal {
    _id: string;
    tipoAnimal: string;
    raza: string;
    ubicacion: { type: string; coordinates: [number, number] };
    edad: number;
    sexo: string;
    fechaRegistro: string;
  }
  