import React from "react";
import { UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  errors: Record<string, any>;
}

/**
 * Sección del formulario: Datos Personales
 * Esta sección incluye campos básicos como apellidos, nombres, documento y correo.
 */
const DatosPersonalesSection: React.FC<Props> = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="primerApellido" className="text-sm font-medium text-gray-700">
          Primer Apellido
        </label>
        <input
          id="primerApellido"
          {...register("primerApellido")}
          className="input input-bordered w-full"
        />
        {errors.primerApellido && <p className="text-red-500 text-xs">{errors.primerApellido.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="segundoApellido" className="text-sm font-medium text-gray-700">
          Segundo Apellido
        </label>
        <input
          id="segundoApellido"
          {...register("segundoApellido")}
          className="input input-bordered w-full"
        />
        {errors.segundoApellido && <p className="text-red-500 text-xs">{errors.segundoApellido.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="nombres" className="text-sm font-medium text-gray-700">
          Nombres Completos
        </label>
        <input
          id="nombres"
          {...register("nombres")}
          className="input input-bordered w-full"
        />
        {errors.nombres && <p className="text-red-500 text-xs">{errors.nombres.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="numeroDocumento" className="text-sm font-medium text-gray-700">
          Número de Documento
        </label>
        <input
          id="numeroDocumento"
          {...register("numeroDocumento")}
          className="input input-bordered w-full"
        />
        {errors.numeroDocumento && <p className="text-red-500 text-xs">{errors.numeroDocumento.message}</p>}
      </div>

      <div className="flex flex-col gap-1 md:col-span-2">
        <label htmlFor="correo" className="text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <input
          id="correo"
          {...register("correo")}
          className="input input-bordered w-full"
        />
        {errors.correo && <p className="text-red-500 text-xs">{errors.correo.message}</p>}
      </div>
    </div>
  );
};

export default DatosPersonalesSection;
