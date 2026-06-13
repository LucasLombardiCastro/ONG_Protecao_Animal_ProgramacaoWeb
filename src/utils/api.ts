/**
 * API Service Layer
 * Centralized functions for making API requests
 */

import { logger } from './logger';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
}

/**
 * Generic API request function
 * Handles headers, error logging, and response parsing
 */
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  try {
    const { method = 'GET', headers = {}, body } = options;

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      logger.error(`API Error: ${endpoint}`, { status: response.status, data: errorData });
      
      return {
        success: false,
        error: errorData.message || 'Erro na requisição',
      };
    }

    const data = await response.json();
    logger.debug(`API Success: ${endpoint}`, data);

    return {
      success: true,
      data,
    };
  } catch (error) {
    logger.error(`API Request Failed: ${endpoint}`, error);
    
    return {
      success: false,
      error: 'Erro de conexão. Tente novamente.',
    };
  }
};

/**
 * Session Storage Helper
 * Type-safe session management
 */
export interface StoredSession {
  email: string;
  nome: string;
  dataLogin: string;
  token?: string;
}

export const sessionStorage = {
  set: (session: StoredSession) => {
    try {
      localStorage.setItem('usuarioLogado', JSON.stringify(session));
      logger.info('Session saved');
    } catch (error) {
      logger.error('Failed to save session', error);
    }
  },

  get: (): StoredSession | null => {
    try {
      const data = localStorage.getItem('usuarioLogado');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('Failed to retrieve session', error);
      return null;
    }
  },

  clear: () => {
    try {
      localStorage.removeItem('usuarioLogado');
      logger.info('Session cleared');
    } catch (error) {
      logger.error('Failed to clear session', error);
    }
  },

  exists: (): boolean => {
    return sessionStorage.get() !== null;
  },
};
