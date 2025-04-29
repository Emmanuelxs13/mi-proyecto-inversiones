import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { afiliacionSchema } from "@/components/Afiliaciones/helpers/afiliacionSchema";

// Secciones del formulario como pasos individuales
import DatosPersonalesSection from "@/components/Afiliaciones/sections/DatosPersonalesSection";

const pasos = [
  { id: 0, nombre: "Datos Personales", componente: DatosPersonalesSection },
  // Aquí agregaremos los demás pasos: Formación, Vivienda, Laboral, Documentos, Beneficiarios
];

export default function AfiliacionForm() {
  const [pasoActual, setPasoActual] = useState(0);
  const PasoActualComponent = pasos[pasoActual].componente;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(afiliacionSchema),
    mode: "onBlur",
    defaultValues: {
      primerApellido: "",
      segundoApellido: "",
      nombres: "",
      numeroDocumento: "",
      correo: "",
    },
  });

  const onSubmit = (data) => {
    if (pasoActual < pasos.length - 1) {
      setPasoActual(pasoActual + 1);
    } else {
      console.log("Formulario completo:", data);
      // Aquí va la lógica de envío final
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Paso {pasoActual + 1} de {pasos.length}: {pasos[pasoActual].nombre}
      </h2>

      <PasoActualComponent register={register} errors={errors} />

      <div className="flex justify-between mt-10">
        {pasoActual > 0 && (
          <button
            type="button"
            onClick={() => setPasoActual(pasoActual - 1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Anterior
          </button>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded ml-auto"
        >
          {pasoActual === pasos.length - 1 ? "Enviar" : "Siguiente"}
        </button>
      </div>
    </form>
  );
}
