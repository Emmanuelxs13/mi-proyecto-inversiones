import { FC } from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

/**
 * Sección de Información Laboral para el formulario de afiliación.
 * Incluye datos como sede, dirección, teléfono, EPS, fondo y sueldo.
 */
const InformacionLaboralSection: FC<{
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}> = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <h3 className="text-2xl font-semibold text-gray-700 col-span-2 border-b pb-2">
        Información Laboral
      </h3>

      <div className="flex flex-col gap-1">
        <label htmlFor="sede" className="text-sm font-medium text-gray-700">
          Sede / ERON / Regional o EPN
        </label>
        <input
          id="sede"
          {...register("sede")}
          className="input input-bordered w-full"
        />
        {errors.sede && <p className="text-red-500 text-xs">{errors.sede.message as string}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="direccionLaboral" className="text-sm font-medium text-gray-700">
          Dirección Laboral
        </label>
        <input
          id="direccionLaboral"
          {...register("direccionLaboral")}
          className="input input-bordered w-full"
        />
        {errors.direccionLaboral && <p className="text-red-500 text-xs">{errors.direccionLaboral.message as string}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="telefonoLaboral" className="text-sm font-medium text-gray-700">
          Teléfono Laboral
        </label>
        <input
          id="telefonoLaboral"
          {...register("telefonoLaboral")}
          className="input input-bordered w-full"
        />
        {errors.telefonoLaboral && <p className="text-red-500 text-xs">{errors.telefonoLaboral.message as string}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="sueldoMensual" className="text-sm font-medium text-gray-700">
          Sueldo Mensual
        </label>
        <input
          id="sueldoMensual"
          type="number"
          {...register("sueldoMensual")}
          className="input input-bordered w-full"
        />
        {errors.sueldoMensual && <p className="text-red-500 text-xs">{errors.sueldoMensual.message as string}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="eps" className="text-sm font-medium text-gray-700">
          EPS
        </label>
        <input
          id="eps"
          {...register("eps")}
          className="input input-bordered w-full"
        />
        {errors.eps && <p className="text-red-500 text-xs">{errors.eps.message as string}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="fondoPension" className="text-sm font-medium text-gray-700">
          Fondo de Pensiones
        </label>
        <input
          id="fondoPension"
          {...register("fondoPension")}
          className="input input-bordered w-full"
        />
        {errors.fondoPension && <p className="text-red-500 text-xs">{errors.fondoPension.message as string}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="porcentajeDescuento" className="text-sm font-medium text-gray-700">
          Porcentaje de Descuento Autorizado (%)
        </label>
        <input
          id="porcentajeDescuento"
          type="number"
          {...register("porcentajeDescuento")}
          className="input input-bordered w-full"
        />
        {errors.porcentajeDescuento && <p className="text-red-500 text-xs">{errors.porcentajeDescuento.message as string}</p>}
      </div>
    </div>
  );
};

export default InformacionLaboralSection;
