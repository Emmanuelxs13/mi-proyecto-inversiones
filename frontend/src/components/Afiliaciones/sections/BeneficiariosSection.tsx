import { FC } from "react";
import { useFieldArray, UseFormRegister, FieldErrors, FieldValues, Control } from "react-hook-form";

/**
 * Sección de Beneficiarios del formulario de afiliación.
 * Permite agregar múltiples beneficiarios con sus datos respectivos.
 */
const BeneficiariosSection: FC<{
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues>;
}> = ({ register, errors, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "beneficiarios",
  });

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-700 border-b pb-2">
        Información de Beneficiarios
      </h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-lg p-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Nombres Completos
            </label>
            <input
              {...register(`beneficiarios.${index}.nombre`)}
              className="input input-bordered w-full"
            />
            {errors?.beneficiarios?.[index]?.nombre && (
              <p className="text-red-500 text-xs">
                {errors.beneficiarios[index]?.nombre?.message as string}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Documento</label>
            <input
              {...register(`beneficiarios.${index}.documento`)}
              className="input input-bordered w-full"
            />
            {errors?.beneficiarios?.[index]?.documento && (
              <p className="text-red-500 text-xs">
                {errors.beneficiarios[index]?.documento?.message as string}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Parentesco</label>
            <input
              {...register(`beneficiarios.${index}.parentesco`)}
              className="input input-bordered w-full"
            />
            {errors?.beneficiarios?.[index]?.parentesco && (
              <p className="text-red-500 text-xs">
                {errors.beneficiarios[index]?.parentesco?.message as string}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              {...register(`beneficiarios.${index}.fechaNacimiento`)}
              className="input input-bordered w-full"
            />
            {errors?.beneficiarios?.[index]?.fechaNacimiento && (
              <p className="text-red-500 text-xs">
                {errors.beneficiarios[index]?.fechaNacimiento?.message as string}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Porcentaje</label>
            <input
              type="number"
              {...register(`beneficiarios.${index}.porcentaje`)}
              className="input input-bordered w-full"
            />
            {errors?.beneficiarios?.[index]?.porcentaje && (
              <p className="text-red-500 text-xs">
                {errors.beneficiarios[index]?.porcentaje?.message as string}
              </p>
            )}
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-sm text-red-600 hover:underline"
            >
              Eliminar beneficiario
            </button>
          </div>
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={() =>
            append({ nombre: "", documento: "", parentesco: "", fechaNacimiento: "", porcentaje: 0 })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Agregar Beneficiario
        </button>
      </div>
    </div>
  );
};

export default BeneficiariosSection;
