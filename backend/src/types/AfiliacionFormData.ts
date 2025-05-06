// frontend/src/types/AfiliacionFormData.ts

export interface AfiliacionFormData {
    // Datos personales
    tipoDocumento: string;
    numeroDocumento: string;
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido?: string;
    fechaNacimiento: string;
    lugarNacimiento: string;
    estadoCivil: string;
    sexo: string;
    rh: string;
  
    // Información de vivienda
    tipoVivienda: string;
    direccionVivienda: string;
    ciudadVivienda: string;
    telefonoFijo?: string;
    celular: string;
  
    // Aquí luego agregaremos formación, laboral, beneficiarios, etc.
  }
  