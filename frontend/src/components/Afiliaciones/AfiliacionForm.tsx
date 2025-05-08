import { useForm, FieldValues, UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
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
    resolver: yupResolver(esquemas[pasoActual]),
  });

  const validarPasoActual = async (): Promise<boolean> => {
    const esValido = await trigger();
    if (!esValido) {
      console.warn("Errores detectados, no se avanza.");
    }
    return esValido;
  };

  const enviarFormularioCompleto = async (datos: FieldValues) => {
    try {
      const response = await fetch("http://localhost:3000/api/afiliaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.message || "Error al enviar el formulario");
      }

      alert("¡Afiliación enviada con éxito!");
      console.log("Respuesta del servidor:", resultado);
    } catch (error: any) {
      console.error("Error al enviar el formulario:", error.message);
      alert("Hubo un error al enviar la afiliación. Intenta nuevamente.");
    }
  };

  const onSubmit = async () => {
    const esValido = await validarPasoActual();
    if (!esValido) return;

    const nuevosDatos = { ...formularioCompleto, ...getValues() };
    setFormularioCompleto(nuevosDatos);

    if (pasoActual < pasos.length - 1) {
      setPasoActual((prev) => prev + 1);
    } else {
      await enviarFormularioCompleto(nuevosDatos);
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

      <PasoActualComponent register={register} errors={errors} control={control} />

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
