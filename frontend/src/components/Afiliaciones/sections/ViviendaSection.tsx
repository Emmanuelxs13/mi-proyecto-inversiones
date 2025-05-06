import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export default function ViviendaSection({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-blue-800 border-b pb-2">
        Información de Vivienda
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Tipo de Vivienda */}
        <div className="flex flex-col">
          <label htmlFor="tipoVivienda" className="font-medium text-gray-700">
            Tipo de Vivienda
          </label>
          <select
            id="tipoVivienda"
            {...register("tipoVivienda")}
            className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 transition-colors py-1"
          >
            <option value="">Selecciona tipo</option>
            <option value="Propia">Propia</option>
            <option value="Familiar">Familiar</option>
            <option value="Arriendo">Arriendo</option>
          </select>
          {typeof errors.tipoVivienda?.message === "string" && (
            <p className="text-sm text-red-500">{errors.tipoVivienda.message}</p>
          )}
        </div>

        {/* Dirección de Vivienda */}
        <div className="flex flex-col">
          <label htmlFor="direccionVivienda" className="font-medium text-gray-700">
            Dirección de Vivienda
          </label>
          <input
            id="direccionVivienda"
            {...register("direccionVivienda")}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.direccionVivienda?.message === "string" && (
            <p className="text-sm text-red-500">{errors.direccionVivienda.message}</p>
          )}
        </div>

        {/* Ciudad */}
        <div className="flex flex-col">
          <label htmlFor="ciudadVivienda" className="font-medium text-gray-700">
            Ciudad
          </label>
          <input
            id="ciudadVivienda"
            {...register("ciudadVivienda")}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.ciudadVivienda?.message === "string" && (
            <p className="text-sm text-red-500">{errors.ciudadVivienda.message}</p>
          )}
        </div>

        {/* Teléfono Fijo */}
        <div className="flex flex-col">
          <label htmlFor="telefonoFijo" className="font-medium text-gray-700">
            Teléfono Fijo
          </label>
          <input
            id="telefonoFijo"
            {...register("telefonoFijo")}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.telefonoFijo?.message === "string" && (
            <p className="text-sm text-red-500">{errors.telefonoFijo.message}</p>
          )}
        </div>

        {/* Celular */}
        <div className="flex flex-col">
          <label htmlFor="celular" className="font-medium text-gray-700">
            Celular
          </label>
          <input
            id="celular"
            {...register("celular")}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.celular?.message === "string" && (
            <p className="text-sm text-red-500">{errors.celular.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
