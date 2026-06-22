/**
 * Application Constants
 * Centralized location for all hardcoded values, enum-like constants, and configuration
 */

// Animal Status
export const ANIMAL_STATUS = {
  WAITING: 'Disponível',
  ADOPTED: 'Adotado',
} as const;

// Animal Specie
export const ANIMAL_SPECIE = {
  DOG: 'Cão',
  CAT: 'Gato',
} as const;

// Animal Size
export const ANIMAL_SIZE = {
  SMALL: 'Pequeno',
  MEDIUM: 'Médio',
  LARGE: 'Grande',
} as const;

// Request Status
export const REQUEST_STATUS = {
  NOT_CONTACTED: 'Não contatado',
  AWAITING_RESPONSE: 'Aguardando resposta',
  ANSWERED: 'Respondido',
} as const;

// Request Type
export const REQUEST_TYPE = {
  ADOPTION: 'adocao',
  VOLUNTEER: 'voluntario',
} as const;

// API Endpoints (will be replaced with actual backend URLs)
export const API_ENDPOINTS = {
  ANIMALS: '/animals',
  REQUESTS: '/requests',
  PARTNERS: '/partners',
  AUTH: '/auth',
} as const;

// UI Configuration
export const UI_CONFIG = {
  MODAL_Z_INDEX: 100,
  NAVBAR_Z_INDEX: 50,
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 4000,
} as const;

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Este campo é obrigatório',
  INVALID_EMAIL: 'Email inválido',
  INVALID_PHONE: 'Telefone inválido',
  PASSWORD_MIN_LENGTH: 'Senha deve ter no mínimo 6 caracteres',
  GENERIC_ERROR: 'Algo deu errado. Tente novamente.',
} as const;
