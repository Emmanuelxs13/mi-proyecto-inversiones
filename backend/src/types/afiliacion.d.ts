// types/afiliacion.d.ts

export interface DatosPersonales {
    primerApellido: string;
    segundoApellido: string;
    nombres: string;
    tipoDocumento: string;
    numeroDocumento: string;
    correo: string;
    celular: string;
    fechaNacimiento: string;
    lugarNacimiento: string;
    estadoCivil: string;
    genero: string;
    direccion: string;
    barrio: string;
    ciudad: string;
    departamento: string;
  }
  
  export interface FormacionAcademica {
    nivelEstudios: string;
    tituloObtenido: string;
    institucion: string;
    fechaGraduacion: string;
  }
  
  export interface InformacionVivienda {
    tipoVivienda: string;
    tiempoResidencia: string;
    estrato: number;
    servicios: string[];
  }
  
  export interface InformacionLaboral {
    empresa: string;
    cargo: string;
    tiempoLaborando: string;
    tipoContrato: string;
    salario: number;
    fechaIngreso: string;
  }
  
  export interface Beneficiario {
    nombre: string;
    parentesco: string;
    documento: string;
    fechaNacimiento: string;
  }
  
  export interface FirmaYCedula {
    firma: string; // base64 o ruta
    imagenCedula: string; // base64 o ruta
  }
  
  export interface AutorizacionDescuento {
    porcentajeDescuento: number;
    aceptaAutorizacion: boolean;
  }
  
  export interface AfiliacionCompleta {
    datosPersonales: DatosPersonales;
    formacionAcademica: FormacionAcademica;
    informacionVivienda: InformacionVivienda;
    informacionLaboral: InformacionLaboral;
    beneficiarios: Beneficiario[];
    firmaYCedula: FirmaYCedula;
    autorizacionDescuento: AutorizacionDescuento;
  }
  