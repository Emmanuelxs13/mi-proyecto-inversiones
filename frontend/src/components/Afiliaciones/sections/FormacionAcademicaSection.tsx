import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

/**
 * Campos esperados en la sección de Formación Académica.
 */
interface FormacionAcademicaFields {
  nivelEstudios: string;
  tituloObtenido: string;
}

/**
 * Props del componente: recibe funciones de registro y errores de validación.
 */
interface Props {
  register: UseFormRegister<FormacionAcademicaFields>;
  errors: FieldErrors<FormacionAcademicaFields>;
}

/**
 * Componente para la sección de formación académica del formulario.
 * Aplica validaciones obligatorias para los campos requeridos.
 */
export default function FormacionAcademicaSection({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-blue-800 border-b pb-2">
        Formación Académica
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Nivel de Estudios */}
        <div className="flex flex-col">
          <label htmlFor="nivelEstudios" className="font-medium text-gray-700">
            Nivel de Estudios
          </label>
          <select
            id="nivelEstudios"
            {...register("nivelEstudios", { required: "El nivel de estudios es obligatorio" })}
            className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 transition-colors py-1"
          >
            <option value="">Selecciona un nivel</option>
            <option value="Primaria">Primaria</option>
            <option value="Bachillerato">Bachillerato</option>
            <option value="Técnico">Técnico</option>
            <option value="Universitario">Universitario</option>
            <option value="Otro">Otro</option>
          </select>
          {typeof errors.nivelEstudios?.message === "string" && (
            <p className="text-sm text-red-500">{errors.nivelEstudios.message}</p>
          )}
        </div>

        {/* Título Obtenido */}
        <div className="flex flex-col">
          <label htmlFor="tituloObtenido" className="font-medium text-gray-700">
            Título Obtenido
          </label>
          <input
            id="tituloObtenido"
            {...register("tituloObtenido", { required: "El título es obligatorio" })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.tituloObtenido?.message === "string" && (
            <p className="text-sm text-red-500">{errors.tituloObtenido.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
