import { FC } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

/**
 * Sección final del formulario de afiliación.
 * Contiene la autorización de descuento voluntario y campo de porcentaje.
 */
const AutorizacionDescuentoSection: FC<{
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-700 border-b pb-2">
        Autorización de Descuento por Nómina
      </h3>

      <p className="text-gray-700">
        Yo, como empleado afiliado al Fondo de Empleados de la INPEC – FEINPEC,
        autorizo de forma voluntaria el descuento mensual por nómina del
        porcentaje especificado a continuación, sobre mi salario.
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor="porcentajeDescuento" className="text-sm font-medium text-gray-700">
          Porcentaje Autorizado (entre 3% y 10%)
        </label>
        <input
          id="porcentajeDescuento"
          type="number"
          step="0.1"
          min={3}
          max={10}
          {...register("porcentajeDescuento")}
          className="input input-bordered w-full"
          placeholder="Ej: 5"
        />
        {errors.porcentajeDescuento && (
          <p className="text-red-500 text-xs">{errors.porcentajeDescuento.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="aceptaAutorizacion"
          {...register("aceptaAutorizacion")}
          className="checkbox"
        />
        <label htmlFor="aceptaAutorizacion" className="text-sm text-gray-700">
          Confirmo que autorizo este descuento de forma voluntaria.
        </label>
      </div>
      {errors.aceptaAutorizacion && (
        <p className="text-red-500 text-xs">{errors.aceptaAutorizacion.message}</p>
      )}
    </div>
  );
};

export default AutorizacionDescuentoSection;
