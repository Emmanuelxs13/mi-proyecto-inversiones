import { FC } from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

/**
 * Sección de Información de Vivienda para el formulario de afiliación.
 * Incluye campos como tipo de vivienda, dirección, ciudad y teléfonos.
 */
const ViviendaSection: FC<{
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}> = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <h3 className="text-2xl font-semibold text-gray-700 col-span-2 border-b pb-2">
        Información de Vivienda
      </h3>

      <div className="flex flex-col gap-1">
        <label htmlFor="tipoVivienda" className="text-sm font-medium text-gray-700">
          Tipo de Vivienda
        </label>
        <select
          id="tipoVivienda"
          {...register("tipoVivienda")}
          className="select select-bordered w-full"
        >
          <option value="">Selecciona una opción</option>
          <option value="Propia">Propia</option>
          <option value="Familiar">Familiar</option>
          <option value="Arriendo">Arriendo</option>
        </select>
        {errors.tipoVivienda && (
          <p className="text-red-500 text-xs">{errors.tipoVivienda.message as string}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="direccionVivienda" className="text-sm font-medium text-gray-700">
          Dirección
        </label>
        <input
          id="direccionVivienda"
          {...register("direccionVivienda")}
          className="input input-bordered w-full"
        />
        {errors.direccionVivienda && (
          <p className="text-red-500 text-xs">{errors.direccionVivienda.message as string}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="ciudadVivienda" className="text-sm font-medium text-gray-700">
          Ciudad
        </label>
        <input
          id="ciudadVivienda"
          {...register("ciudadVivienda")}
          className="input input-bordered w-full"
        />
        {errors.ciudadVivienda && (
          <p className="text-red-500 text-xs">{errors.ciudadVivienda.message as string}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="telefonoFijo" className="text-sm font-medium text-gray-700">
          Teléfono Fijo (opcional)
        </label>
        <input
          id="telefonoFijo"
          {...register("telefonoFijo")}
          className="input input-bordered w-full"
        />
        {errors.telefonoFijo && (
          <p className="text-red-500 text-xs">{errors.telefonoFijo.message as string}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="celular" className="text-sm font-medium text-gray-700">
          Celular
        </label>
        <input
          id="celular"
          {...register("celular")}
          className="input input-bordered w-full"
        />
        {errors.celular && (
          <p className="text-red-500 text-xs">{errors.celular.message as string}</p>
        )}
      </div>
    </div>
  );
};

export default ViviendaSection;
