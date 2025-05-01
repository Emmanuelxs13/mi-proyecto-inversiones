import React from "react";
import { UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  errors: Record<string, any>;
}

/**
 * Sección del formulario: Formación Académica
 * Incluye nivel de estudios y título obtenido.
 */
const FormacionAcademicaSection: React.FC<Props> = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="nivelEstudios" className="text-sm font-medium text-gray-700">
          Nivel de Estudios
        </label>
        <select
          id="nivelEstudios"
          {...register("nivelEstudios")}
          className="select select-bordered w-full"
        >
          <option value="">Seleccionar nivel de estudios</option>
          <option value="Primaria">Primaria</option>
          <option value="Bachillerato">Bachillerato</option>
          <option value="Técnico">Técnico</option>
          <option value="Universitario">Universitario</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.nivelEstudios && (
          <p className="text-red-500 text-xs">{errors.nivelEstudios.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="tituloObtenido" className="text-sm font-medium text-gray-700">
          Título Obtenido
        </label>
        <input
          id="tituloObtenido"
          {...register("tituloObtenido")}
          className="input input-bordered w-full"
        />
        {errors.tituloObtenido && (
          <p className="text-red-500 text-xs">{errors.tituloObtenido.message}</p>
        )}
      </div>
    </div>
  );
};

export default FormacionAcademicaSection;
