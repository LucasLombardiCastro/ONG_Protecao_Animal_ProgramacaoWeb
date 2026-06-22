import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// tipos auxiliares 
type AnimalSpecie = 'Cão' | 'Gato'; 
type AnimalSize = 'Pequeno' | 'Médio' | 'Grande';
type AnimalStatus = 'Disponível' | 'Adotado';

// interface com os atributos da taela
interface AnimalAttributes {
  id: string; 
  nome: string;
  especie: AnimalSpecie;
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
}

// id, status e vacinas são opcionais na criação
interface AnimalCreationAttributes extends Optional<AnimalAttributes, 'id' | 'status' | 'vacinas'> {}

class Animal extends Model<AnimalAttributes, AnimalCreationAttributes> implements AnimalAttributes {
  public id!: string;
  public nome!: string;
  public especie!: AnimalSpecie;
  public porte!: AnimalSize;
  public historia!: string;
  public status!: AnimalStatus;
  public foto_url!: string;
  public idade!: string;
  public temperamento!: string;
  public vacinas!: string[];
  public doc_adocao_url?: string;
  public nome_adotante?: string;
  public contato_adotante?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Animal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especie: {
      type: DataTypes.ENUM('Cão', 'Gato', 'Outro'),
      allowNull: false,
    },
    porte: {
      type: DataTypes.ENUM('Pequeno', 'Médio', 'Grande'),
      allowNull: false,
    },
    historia: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Disponível', 'Adotado'),
      allowNull: false,
      defaultValue: 'Disponível',
    },
    foto_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vacinas: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    doc_adocao_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nome_adotante: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contato_adotante: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'animais',
    timestamps: true,
  }
);

export default Animal;