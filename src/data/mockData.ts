//Dados não reais!!!

export type StatusAnimal = 'Esperando por um lar' | 'Final feliz';

export interface Animal {
  id: string;
  nome: string;
  especie: 'Cão' | 'Gato';
  porte: 'Pequeno' | 'Médio' | 'Grande';
  historia: string;
  status: StatusAnimal;
  foto_url: string;
  doc_adocao_url?: string;
  nome_adotante?: string;
  contato_adotante?: string;
  idade: string; //Card normal
  temperamento: string; //Card expansível
  vacinas: string[]; //Card expansível
}

export interface Evento {
  id: string;
  titulo: string;
  data: string;
  local: string;
  descricao: string;
}

export interface Parceiro {
  id: string;
  nome: string;
  imagem_url: string;
  link: string;
}

// Dados simulados
export const animaisMock: Animal[] = [
  {
    id: '1',
    nome: 'Bidu',
    especie: 'Cão',
    porte: 'Médio',
    idade: '2 anos',
    historia: 'Bidu foi encontrado vagando próximo ao campus da universidade. É muito dócil e adora brincar com bolinhas.',
    status: 'Esperando por um lar',
    foto_url: 'https://www.shutterstock.com/image-photo/indian-desi-dog-pic-dogs-600nw-2429089551.jpg',
    temperamento: 'Dócil e Brincalhão',
    vacinas: ['V10', 'Raiva']
  },
  {
    id: '2',
    nome: 'Mia',
    especie: 'Gato',
    porte: 'Pequeno',
    idade: '6 meses',
    historia: 'Mia é uma gatinha resgatada de um motor de carro. Já está recuperada e pronta para dar muito carinho.',
    status: 'Esperando por um lar',
    foto_url: 'https://www.fearfreehappyhomes.com/wp-content/uploads/2021/10/Marci-cat-Maggie-1200x797.jpg',
    temperamento: 'Calma e Carinhosa',
    vacinas: ['V4', 'Raiva']
  },
  {
    id: '3',
    nome: 'Rex',
    especie: 'Cão',
    porte: 'Grande',
    idade: '4 anos',
    historia: 'Rex foi abandonado na estrada. Ele é protetor e muito fiel aos seus cuidadores.',
    status: 'Final feliz',
    foto_url: 'https://images.unsplash.com/photo-1571384996075-6bd78a2b09a3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nJTIwb3V0c2lkZXxlbnwwfHwwfHx8MA%3D%3D',
    temperamento: 'Protetor e Leal',
    vacinas: ['V10', 'Raiva', 'Giárdia'],
    nome_adotante: 'Carlos Silva',
    contato_adotante: '(11) 99999-9999'
  }
];

export const parceirosMock = [
  { id: '1', nome: 'Pedigree', imagem_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlJEruONmX_QzwqPDNrUT9Voi2RfxHkwwNyQ&s', link: '#' },
  { id: '2', nome: 'Purina', imagem_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNyzwAqWajCug5LUlZbydB1HNubgjkzoROkw&s', link: '#' },
  { id: '3', nome: 'Royal Canin', imagem_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Royal-Canin-Logo.svg/1280px-Royal-Canin-Logo.svg.png', link: '#' },
  { id: '4', nome: 'Whiskas', imagem_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn6jqsjqfVV-T9GBNIeglhRJNGMGWDJDRVPw&s', link: '#' },
  { id: '5', nome: 'Petz', imagem_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9K6ubC4fehLTnZ99eewtqGQdWBOuybrT6IQ&s', link: '#' }
];