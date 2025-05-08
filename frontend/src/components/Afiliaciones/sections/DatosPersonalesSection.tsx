import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export default function DatosPersonalesSection({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-blue-800 border-b pb-2">
        Información Básica
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Primer Apellido */}
        <div className="flex flex-col">
          <label htmlFor="primerApellido" className="font-medium text-gray-700">
            Primer Apellido
          </label>
          <input
            id="primerApellido"
            {...register("primerApellido", {
              required: "El primer apellido es obligatorio",
              minLength: {
                value: 2,
                message: "Debe tener al menos 2 caracteres",
              },
            })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.primerApellido?.message === "string" && (
            <p className="text-sm text-red-500">
              {errors.primerApellido.message}
            </p>
          )}
        </div>

        {/* Segundo Apellido */}
        <div className="flex flex-col">
          <label
            htmlFor="segundoApellido"
            className="font-medium text-gray-700"
          >
            Segundo Apellido
          </label>
          <input
            id="segundoApellido"
            {...register("segundoApellido", {
              required: "El segundo apellido es obligatorio",
              minLength: {
                value: 2,
                message: "Debe tener al menos 2 caracteres",
              },
            })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.segundoApellido?.message === "string" && (
            <p className="text-sm text-red-500">
              {errors.segundoApellido.message}
            </p>
          )}
        </div>

        {/* Nombres */}
        <div className="flex flex-col">
          <label htmlFor="nombres" className="font-medium text-gray-700">
            Nombres
          </label>
          <input
            id="nombres"
            {...register("nombres", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 2,
                message: "Debe tener al menos 2 caracteres",
              },
            })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.nombres?.message === "string" && (
            <p className="text-sm text-red-500">{errors.nombres.message}</p>
          )}
        </div>

        {/* Tipo de Documento */}
        <div className="flex flex-col">
          <label htmlFor="tipoDocumento" className="font-medium text-gray-700">
            Tipo de Documento
          </label>
          <select
            id="tipoDocumento"
            {...register("tipoDocumento", {
              required: "Debes seleccionar un tipo de documento",
            })}
            className="border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 transition-colors py-1"
          >
            <option value="">Selecciona un tipo</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
          </select>
          {typeof errors.tipoDocumento?.message === "string" && (
            <p className="text-sm text-red-500">
              {errors.tipoDocumento.message}
            </p>
          )}
        </div>

        {/* Número de Documento */}
        <div className="flex flex-col">
          <label
            htmlFor="numeroDocumento"
            className="font-medium text-gray-700"
          >
            Número de Documento
          </label>
          <input
            id="numeroDocumento"
            {...register("numeroDocumento", {
              required: "El número de documento es obligatorio",
              pattern: {
                value: /^[0-9]{6,15}$/,
                message: "Debe tener entre 6 y 15 dígitos numéricos",
              },
            })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.numeroDocumento?.message === "string" && (
            <p className="text-sm text-red-500">
              {errors.numeroDocumento.message}
            </p>
          )}
        </div>

        {/* Correo Electrónico */}
        <div className="flex flex-col">
          <label htmlFor="correo" className="font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            id="correo"
            type="email"
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo no válido",
              },
            })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.correo?.message === "string" && (
            <p className="text-sm text-red-500">{errors.correo.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
