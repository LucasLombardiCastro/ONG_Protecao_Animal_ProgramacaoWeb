import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// tipos auxiliares
type RequestStatus = 'Não contatado' | 'Aguardando resposta' | 'Respondido';
type RequestType = 'adocao' | 'voluntario' | 'insumo';


// interface com os atributos do request
interface RequestAttributes {
  id: number;
  nome: string;
  telefone: string;
  email?: string | null;
  data: string;
  status: RequestStatus;
  notas: string;
  tipo: RequestType;

  // campos específicos da adoção
  animal_nome?: string | null;
  animal_foto?: string | null;
  animal_id?: string | null;

  // campos de voluntariado
  disponibilidade?: string | null;
  interesse?: string | null;

  // campos de doação de insumos
  itens?: string | null;
}

// campos opcionais na criação
interface RequestCreationAttributes extends Optional<
  RequestAttributes, 
  'id' | 'status' | 'notas' | 'email' | 'animal_nome' | 'animal_foto' | 'animal_id' | 'disponibilidade' | 'interesse' | 'itens'
> {}


class RequestModel 
  extends Model<RequestAttributes, RequestCreationAttributes> 
  implements RequestAttributes 
{
  public id!: number;
  public nome!: string;
  public telefone!: string;
  public email!: string | null;
  public data!: string;
  public status!: RequestStatus;
  public notas!: string;
  public tipo!: RequestType;

  // específicos de adoção  
  public animal_nome!: string | null;
  public animal_foto!: string | null;
  public animal_id!: string | null;

  // específicos de Voluntariado
  public disponibilidade!: string | null;
  public interesse!: string | null;

  // específicos de Doação de Insumos
  public itens!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RequestModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Não contatado', 'Aguardando resposta', 'Respondido'),
      allowNull: false,
      defaultValue: 'Não contatado',
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    tipo: {
      type: DataTypes.ENUM('adocao', 'voluntario', 'insumo'),
      allowNull: false,
    },
    // específicos de Adoção
    animal_nome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    animal_foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    animal_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    // específicos de Voluntariado
    disponibilidade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    interesse: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // específicos de Doação de Insumos
    itens: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'requests',
    timestamps: true,
  }
);

export default RequestModel;