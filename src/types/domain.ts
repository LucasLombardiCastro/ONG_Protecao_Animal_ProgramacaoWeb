/**
 * Domain Types
 * Definition of types used across the application
 */

import { ANIMAL_STATUS, ANIMAL_SPECIE, ANIMAL_SIZE, REQUEST_STATUS, REQUEST_TYPE } from '../constants/app';

// Animal Types (Importing from constants the possible values for the variables)
export type AnimalStatus = typeof ANIMAL_STATUS[keyof typeof ANIMAL_STATUS];
export type AnimalSpecie = typeof ANIMAL_SPECIE[keyof typeof ANIMAL_SPECIE];
export type AnimalSize = typeof ANIMAL_SIZE[keyof typeof ANIMAL_SIZE];

export interface Animal {
  id: string;
  nome: string;
  especie: AnimalSpecie; //Only the values defined in the constants file can be used 
  porte: AnimalSize;
  historia: string;
  status: AnimalStatus;
  foto_url: string;
  idade: string;
  temperamento: string;
  vacinas: string[];
  doc_adocao_url?: string;
  nome_adotante?: string;
  contato_adotante?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Partner Types
export interface Partner {
  id: string;
  nome: string;
  imagem_url: string;
  link: string;
}

// Request Types
export type RequestStatus = typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS];
export type RequestType = typeof REQUEST_TYPE[keyof typeof REQUEST_TYPE];

// Request for adoption and volunteer
export interface RequestBase {
  id: number;
  nome: string;
  telefone: string;
  email?: string;
  data: string;
  status: RequestStatus;
  notas: string;
  createdAt?: string;
  updatedAt?: string;
}

//Adoption request has specific fields related to the anial
export interface AdoptionRequest extends RequestBase {
  tipo: typeof REQUEST_TYPE.ADOPTION;
  animal_nome: string;
  animal_foto: string;
  animal_id?: string;
}

export interface VolunteerRequest extends RequestBase {
  tipo: typeof REQUEST_TYPE.VOLUNTEER;
  disponibilidade: string;
  interesse: string;
}

export type Request = AdoptionRequest | VolunteerRequest; // There are two types of requests

// Authentication Types
export interface Credentials {
  email: string;
  senha: string;
  nome: string;
}

//Used to store the user information after login
export interface AuthResponse {
  success: boolean;
  user?: {
    email: string;
    nome: string;
  };
  token?: string;
  message?: string;
}
