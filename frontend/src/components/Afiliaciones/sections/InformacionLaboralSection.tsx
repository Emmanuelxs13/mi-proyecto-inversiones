import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

//Falta terminar la validación de este punto

/**
 * Props que recibe el componente: funciones de registro, errores y setValue.
 */
interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

/**
 * Componente para la sección de Información Laboral del formulario.
 * Aplica validaciones obligatorias en campos clave.
 */
export default function InformacionLaboralSection({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-blue-800 border-b pb-2">
        Información Laboral
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Sede */}
        <div className="flex flex-col">
          <label htmlFor="sede" className="font-medium text-gray-700">
            Sede / ERON / EPN
          </label>
          <input
            id="sede"
            {...register("sede", { required: "La sede es obligatoria" })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.sede?.message === "string" && (
            <p className="text-sm text-red-500">{errors.sede.message}</p>
          )}
        </div>

        {/* Dirección Laboral */}
        <div className="flex flex-col">
          <label
            htmlFor="direccionLaboral"
            className="font-medium text-gray-700"
          >
            Dirección Laboral
          </label>
          <input
            id="direccionLaboral"
            {...register("direccionLaboral", {
              required: "La dirección laboral es obligatoria",
            })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.direccionLaboral?.message === "string" && (
            <p className="text-sm text-red-500">
              {errors.direccionLaboral.message}
            </p>
          )}
        </div>

        {/* Teléfono Laboral */}
        <div className="flex flex-col">
          <label
            htmlFor="telefonoLaboral"
            className="font-medium text-gray-700"
          >
            Teléfono Laboral
          </label>
          <input
            id="telefonoLaboral"
            {...register("telefonoLaboral", {
              required: "El teléfono laboral es obligatorio",
              pattern: {
                value: /^\d+$/,
                message: "Solo se permiten números",
              },
            })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.telefonoLaboral?.message === "string" && (
            <p className="text-sm text-red-500">
              {errors.telefonoLaboral.message}
            </p>
          )}
        </div>

        {/* Sueldo Mensual */}
        <div className="flex flex-col">
          <label htmlFor="sueldoMensual" className="font-medium text-gray-700">
            Sueldo Mensual
          </label>
          <input
            id="sueldoMensual"
            {...register("sueldoMensual", {
              required: "El sueldo mensual es obligatorio",
            })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
            placeholder="2000000"
            inputMode="numeric"
          />
          {typeof errors.sueldoMensual?.message === "string" && (
            <p className="text-sm text-red-500">
              {errors.sueldoMensual.message}
            </p>
          )}
        </div>

        {/* EPS */}
        <div className="flex flex-col">
          <label htmlFor="eps" className="font-medium text-gray-700">
            EPS
          </label>
          <input
            id="eps"
            {...register("eps", { required: "La EPS es obligatoria" })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.eps?.message === "string" && (
            <p className="text-sm text-red-500">{errors.eps.message}</p>
          )}
        </div>

        {/* Fondo de Pensiones */}
        <div className="flex flex-col">
          <label htmlFor="fondoPension" className="font-medium text-gray-700">
            Fondo de Pensiones
          </label>
          <input
            id="fondoPension"
            {...register("fondoPension", {
              required: "El fondo de pensión es obligatorio",
            })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
          />
          {typeof errors.fondoPension?.message === "string" && (
            <p className="text-sm text-red-500">
              {errors.fondoPension.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
