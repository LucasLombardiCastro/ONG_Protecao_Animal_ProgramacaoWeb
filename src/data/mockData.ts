/**
 * Mock Data
 * Temporary data for development and testing
 * Will be replaced with real API calls to the backend
 */

import { Animal, Partner, Request } from '../types/domain';
import { ANIMAL_SPECIE, ANIMAL_SIZE, ANIMAL_STATUS, REQUEST_STATUS, REQUEST_TYPE } from '../constants/app';

export const animaisMock: Animal[] = [
  {
    id: '1',
    nome: 'Bidu',
    especie: ANIMAL_SPECIE.DOG,
    porte: ANIMAL_SIZE.MEDIUM,
    idade: '2 anos',
    historia: 'Bidu foi encontrado em condições de maltrato. Depois de semanas de tratamento, começou a confiar na equipe e agora adora brincar.',
    status: ANIMAL_STATUS.WAITING,
    foto_url: 'https://www.shutterstock.com/image-photo/indian-desi-dog-pic-dogs-600nw-2429089551.jpg',
    temperamento: 'Dócil e Brincalhão',
    vacinas: ['V10', 'Raiva'],
  },
  {
    id: '2',
    nome: 'Mia',
    especie: ANIMAL_SPECIE.CAT,
    porte: ANIMAL_SIZE.SMALL,
    idade: '6 meses',
    historia: 'Mia é uma gata resgatada em uma situação de abandono. É dócil e tranquila.',
    status: ANIMAL_STATUS.WAITING,
    foto_url: 'https://www.fearfreehappyhomes.com/wp-content/uploads/2021/10/Marci-cat-Maggie-1200x797.jpg',
    temperamento: 'Calma e Carinhosa',
    vacinas: ['V4', 'Raiva'],
  },
  {
    id: '3',
    nome: 'Tobby',
    especie: ANIMAL_SPECIE.DOG,
    porte: ANIMAL_SIZE.LARGE,
    idade: '4 anos',
    historia: 'Tobby foi abandonado pelos antigos tutores. Ele é protetor e brincalhão.',
    status: ANIMAL_STATUS.ADOPTED,
    foto_url: 'https://images.unsplash.com/photo-1571384996075-6bd78a2b09a3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nJTIwb3V0c2lkZXxlbnwwfHwwfHx8MA%3D%3D',
    temperamento: 'Protetor e Leal',
    vacinas: ['V10', 'Raiva', 'Giárdia'],
    nome_adotante: 'Carlos Silva',
    contato_adotante: '(11) 99999-9999',
  },
];

export const parceirosMock: Partner[] = [
  { id: '1', nome: 'Pedigree', imagem_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlJEruONmX_QzwqPDNrUT9Voi2RfxHkwwNyQ&s', link: '#' },
  { id: '2', nome: 'Purina', imagem_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNyzwAqWajCug5LUlZbydB1HNubgjkzoROkw&s', link: '#' },
  { id: '3', nome: 'Royal Canin', imagem_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Royal-Canin-Logo.svg/1280px-Royal-Canin-Logo.svg.png', link: '#' },
  { id: '4', nome: 'Whiskas', imagem_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn6jqsjqfVV-T9GBNIeglhRJNGMGWDJDRVPw&s', link: '#' },
  { id: '5', nome: 'Petz', imagem_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9K6ubC4fehLTnZ99eewtqGQdWBOuybrT6IQ&s', link: '#' },
];

export const solicitacoesMock: Request[] = [
  {
    id: 1,
    tipo: REQUEST_TYPE.ADOPTION,
    nome: 'Mariana Souza',
    telefone: '(16) 99123-4567',
    email: 'mariana.souza@email.com',
    data: '10/06/2026',
    status: REQUEST_STATUS.NOT_CONTACTED,
    notas: '',
    animal_nome: 'Thor',
    animal_foto: 'https://images.dog.ceo/breeds/labrador/n02099712_4234.jpg',
  },
  {
    id: 2,
    tipo: REQUEST_TYPE.ADOPTION,
    nome: 'Carlos Pereira',
    telefone: '(16) 98877-1122',
    email: 'carlos.p@email.com',
    data: '08/06/2026',
    status: REQUEST_STATUS.AWAITING_RESPONSE,
    notas: 'Ligou perguntando sobre vacinas, retornar contato na sexta.',
    animal_nome: 'Luna',
    animal_foto: 'https://images.dog.ceo/breeds/husky/n02110185_1469.jpg',
  },
  {
    id: 3,
    tipo: REQUEST_TYPE.VOLUNTEER,
    nome: 'Beatriz Lima',
    telefone: '(16) 99234-5566',
    email: 'bia.lima@email.com',
    data: '09/06/2026',
    status: REQUEST_STATUS.ANSWERED,
    notas: 'Confirmada para o sábado de manhã no abrigo.',
    disponibilidade: 'Finais de semana, manhã',
    interesse: 'Passear com os cães e ajudar na limpeza',
  },
  {
    id: 4,
    tipo: REQUEST_TYPE.VOLUNTEER,
    nome: 'Felipe Andrade',
    telefone: '(16) 98765-4321',
    data: '11/06/2026',
    status: REQUEST_STATUS.NOT_CONTACTED,
    notas: '',
    disponibilidade: 'Terças e quintas, à tarde',
    interesse: 'Transporte de animais para o veterinário',
  },
  {
    id: 5,
    tipo: REQUEST_TYPE.ADOPTION,
    nome: 'Renata Costa',
    telefone: '(16) 99988-7766',
    email: 'renata.costa@email.com',
    data: '11/06/2026',
    status: REQUEST_STATUS.AWAITING_RESPONSE,
    notas: '',
    animal_nome: 'Mel',
    animal_foto: 'https://images.dog.ceo/breeds/poodle-toy/n02113624_2807.jpg',
  },
];

export const credenciaisMock = [
  {
    email: 'admin@ong.com',
    senha: '123456',
    nome: 'Administrador',
  },
  {
    email: 'funcionario@ong.com',
    senha: 'senha123',
    nome: 'Funcionário',
  },
];