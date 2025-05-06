import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

type EstadoAfiliacion = 'activo' | 'inactivo' | 'pendiente';

export class Afiliacion extends Model {
  public id!: number;
  public nombre!: string;
  public correo!: string;
  public puesto!: string;
  public archivo!: string;
  public estado!: EstadoAfiliacion;
  public created_at!: Date;
  public updated_at!: Date;
  public primer_apellido!: string;
  public segundo_apellido!: string;
  public nombres!: string;
  public tipo_documento!: string;
  public numero_documento!: string;
  public telefono_fijo!: string;
  public celular!: string;
  public sede!: string;
  public eps!: string;
  public fondo_pension!: string;
  public porcentaje_descuento!: number;
  public acepta_autorizacion!: boolean;
}

Afiliacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Nombre completo del afiliado',
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    puesto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    archivo: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Ruta al archivo de afiliación si aplica',
    },
    estado: {
      type: DataTypes.ENUM('activo', 'inactivo', 'pendiente'),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    primer_apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    segundo_apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_documento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono_fijo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sede: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fondo_pension: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    porcentaje_descuento: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    acepta_autorizacion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Afiliacion',
    tableName: 'afiliaciones',
    timestamps: false, // o true si quieres que Sequelize maneje las fechas
    underscored: true, // si tu DB usa snake_case
  }
);
