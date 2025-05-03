import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export default function InformacionLaboralSection({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-blue-800 border-b pb-2">
        Información Laboral
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Sede */}
        <div className="flex flex-col">
          <label htmlFor="sede" className="font-medium text-gray-700">Sede / ERON / EPN</label>
          <input
            id="sede"
            {...register("sede")}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {errors.sede && (
            <p className="text-sm text-red-500">{errors.sede.message}</p>
          )}
        </div>

        {/* Dirección Laboral */}
        <div className="flex flex-col">
          <label htmlFor="direccionLaboral" className="font-medium text-gray-700">Dirección Laboral</label>
          <input
            id="direccionLaboral"
            {...register("direccionLaboral")}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {errors.direccionLaboral && (
            <p className="text-sm text-red-500">{errors.direccionLaboral.message}</p>
          )}
        </div>

        {/* Teléfono Laboral */}
        <div className="flex flex-col">
          <label htmlFor="telefonoLaboral" className="font-medium text-gray-700">Teléfono Laboral</label>
          <input
            id="telefonoLaboral"
            {...register("telefonoLaboral")}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {errors.telefonoLaboral && (
            <p className="text-sm text-red-500">{errors.telefonoLaboral.message}</p>
          )}
        </div>

        {/* Sueldo Mensual */}
        <div className="flex flex-col">
          <label htmlFor="sueldoMensual" className="font-medium text-gray-700">Sueldo Mensual</label>
          <input
            id="sueldoMensual"
            type="number"
            {...register("sueldoMensual")}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {errors.sueldoMensual && (
            <p className="text-sm text-red-500">{errors.sueldoMensual.message}</p>
          )}
        </div>

        {/* EPS */}
        <div className="flex flex-col">
          <label htmlFor="eps" className="font-medium text-gray-700">EPS</label>
          <input
            id="eps"
            {...register("eps")}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {errors.eps && (
            <p className="text-sm text-red-500">{errors.eps.message}</p>
          )}
        </div>

        {/* Fondo de Pensiones */}
        <div className="flex flex-col">
          <label htmlFor="fondoPension" className="font-medium text-gray-700">Fondo de Pensiones</label>
          <input
            id="fondoPension"
            {...register("fondoPension")}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {errors.fondoPension && (
            <p className="text-sm text-red-500">{errors.fondoPension.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
