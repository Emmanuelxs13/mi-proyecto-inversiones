import { useForm, FieldValues, UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { useState } from "react";
import {
  esquemaDatosPersonales,
  esquemaFormacionAcademica,
  esquemaVivienda,
  esquemaLaboral,
  esquemaBeneficiarios,
} from "./helpers/afiliacionSchema";
import * as yup from "yup";
import DatosPersonalesSection from "./sections/DatosPersonalesSection";
import FormacionAcademicaSection from "./sections/FormacionAcademicaSection";
import ViviendaSection from "./sections/ViviendaSection";
import InformacionLaboralSection from "./sections/InformacionLaboralSection";
import BeneficiariosSection from "./sections/BeneficiariosSection";
import FirmaYCedulaSection from "./sections/FirmaYCedulaSection";
import AutorizacionDescuentoSection from "./sections/AutorizacionDescuentoSection";

// Define la estructura de cada paso del formulario
interface Paso {
  id: number;
  nombre: string;
  componente: React.FC<{
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    control: Control<FieldValues>;
  }>;
}

const pasos: Paso[] = [
  { id: 0, nombre: "Datos Personales", componente: DatosPersonalesSection },
  { id: 1, nombre: "Formación Académica", componente: FormacionAcademicaSection },
  { id: 2, nombre: "Información de Vivienda", componente: ViviendaSection },
  { id: 3, nombre: "Información Laboral", componente: InformacionLaboralSection },
  { id: 4, nombre: "Beneficiarios", componente: BeneficiariosSection },
  { id: 5, nombre: "Firma y Cédula", componente: FirmaYCedulaSection },
  { id: 6, nombre: "Autorización de Descuento", componente: AutorizacionDescuentoSection },
];

const esquemas: yup.AnySchema[] = [
  esquemaDatosPersonales,
  esquemaFormacionAcademica,
  esquemaVivienda,
  esquemaLaboral,
  esquemaBeneficiarios,
  yup.object(),
  yup.object({
    porcentajeDescuento: yup
      .number()
      .typeError("Debe ser un número")
      .min(3, "Mínimo 3%")
      .max(10, "Máximo 10%")
      .required("Porcentaje obligatorio"),
    aceptaAutorizacion: yup
      .boolean()
      .oneOf([true], "Debe aceptar la autorización")
      .required("Campo obligatorio"),
  }),
];

export default function AfiliacionForm() {
  const [pasoActual, setPasoActual] = useState<number>(0);
  const [formularioCompleto, setFormularioCompleto] = useState<FieldValues>({});
  const PasoActualComponent = pasos[pasoActual].componente;

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    trigger,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onTouched",
    defaultValues: {
      primerApellido: "",
      segundoApellido: "",
      nombres: "",
      tipoDocumento: "",
      numeroDocumento: "",
      correo: "",
      nivelEstudios: "",
      tituloObtenido: "",
    },
  });

  const validarPasoActual = async (): Promise<boolean> => {
    const schema = esquemas[pasoActual];
    const camposDelPaso = Object.keys(schema.fields ?? {});
    const esValido = await trigger(camposDelPaso);

    if (!esValido) {
      console.warn("Errores detectados, no se avanza.");
    }

    return esValido;
  };

  const onSubmit = async () => {
    console.log("CLICK DETECTADO");
    const esValido = await validarPasoActual();
    if (!esValido) return;

    const nuevosDatos = { ...formularioCompleto, ...getValues() };
    setFormularioCompleto(nuevosDatos);

    if (pasoActual < pasos.length - 1) {
      setPasoActual((prev) => prev + 1);
    } else {
      console.log("Formulario completo:", nuevosDatos);
      // Aquí podrías hacer un fetch o axios.post
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Paso {pasoActual + 1} de {pasos.length}: {pasos[pasoActual].nombre}
      </h2>

      {/* Renderiza el componente correspondiente al paso actual */}
      <PasoActualComponent register={register} errors={errors} control={control} />

      {/* Navegación entre pasos */}
      <div className="flex justify-between mt-10">
        {pasoActual > 0 && (
          <button
            type="button"
            onClick={() => setPasoActual((prev) => prev - 1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Anterior
          </button>
        )}

        <button
          type="button"
          onClick={onSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded ml-auto"
        >
          {pasoActual === pasos.length - 1 ? "Enviar" : "Siguiente"}
        </button>
      </div>
    </form>
  );
}
