import * as yup from "yup";

/**
 * Esquema de validación completo para el formulario de afiliación.
 * Organizado por pasos y con mensajes personalizados.
 */

// Paso 1: Datos personales
export const esquemaDatosPersonales = yup.object({
  primerApellido: yup.string().required("Primer apellido obligatorio"),
  segundoApellido: yup.string().required("Segundo apellido obligatorio"),
  nombres: yup.string().required("Nombres obligatorios"),
  tipoDocumento: yup.string().required("Tipo de documento obligatorio"),
  numeroDocumento: yup
    .string()
    .matches(/^\d+$/, "Solo números permitidos")
    .required("Número de documento obligatorio"),
  correo: yup.string().email("Correo inválido").required("Correo obligatorio"),
});

// Paso 2: Formación académica
export const esquemaFormacionAcademica = yup.object({
  nivelEstudios: yup.string().required("Nivel académico obligatorio"),
  tituloObtenido: yup.string().required("Título obligatorio"),
});

// Paso 3: Información de vivienda
export const esquemaVivienda = yup.object({
  tipoVivienda: yup.string().required("Tipo de vivienda obligatorio"),
  direccionVivienda: yup.string().required("Dirección obligatoria"),
  ciudadVivienda: yup.string().required("Ciudad obligatoria"),
  telefonoFijo: yup
  .string()
  .nullable()
  .notRequired()
  .matches(/^\d+$/, "Solo números permitidos")
  .test(
    "longitud-minima",
    "Debe tener al menos 7 dígitos",
    function (value) {
      if (!value) return true; // Si está vacío, está bien (no es requerido)
      return value.length >= 7;
    }
  ),
  celular: yup
    .string()
    .matches(/^\d+$/, "Solo números permitidos")
    .required("Celular obligatorio"),
});

// Paso 4: Información laboral
export const esquemaLaboral = yup.object({
  sede: yup.string().required("Sede obligatoria"),
  direccionLaboral: yup.string().required("Dirección laboral obligatoria"),
  telefonoLaboral: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\d+$/, "Solo números permitidos"),
  sueldoMensual: yup
    .number()
    .typeError("Debe ser un número")
    .positive("Debe ser mayor a 0")
    .required("Sueldo obligatorio"),
  eps: yup.string().required("EPS obligatoria"),
  fondoPension: yup.string().required("Fondo de pensiones obligatorio"),
  porcentajeDescuento: yup
    .number()
    .typeError("Debe ser un número")
    .min(3, "Mínimo 3%")
    .max(10, "Máximo 10%")
    .required("Porcentaje de descuento obligatorio"),
});

// Paso 5: Beneficiarios
export const esquemaBeneficiarios = yup.object({
  beneficiarios: yup
    .array()
    .of(
      yup.object().shape({
        nombre: yup.string().required("Nombre requerido"),
        documento: yup
          .string()
          .matches(/^\d+$/, "Solo números permitidos")
          .required("Documento requerido"),
        parentesco: yup.string().required("Parentesco requerido"),
        fechaNacimiento: yup
          .date()
          .typeError("Fecha inválida")
          .max(new Date(), "No puede ser una fecha futura"),
        porcentaje: yup
          .number()
          .typeError("Debe ser un número")
          .positive("Debe ser mayor a 0")
          .max(100, "Máximo 100%")
          .required("Porcentaje obligatorio"),
      })
    )
    .min(1, "Debe registrar al menos un beneficiario")
    .required("Campo requerido"),
});
