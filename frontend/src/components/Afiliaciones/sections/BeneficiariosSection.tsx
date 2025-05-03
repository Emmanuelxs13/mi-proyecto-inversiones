import React from "react";
import { useFieldArray, FieldValues, UseFormRegister, FieldErrors, Control } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues>;
}

export default function BeneficiariosSection({ register, errors, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "beneficiarios",
  });

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-blue-800 border-b pb-2">
        Beneficiarios
      </h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid md:grid-cols-2 gap-4 border-b border-gray-200 pb-4 mb-4"
        >
          {/* Nombres */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Nombre</label>
            <input
              {...register(`beneficiarios.${index}.nombre`)}
              className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
              placeholder="Nombre completo"
            />
            {errors?.beneficiarios?.[index]?.nombre && (
              <p className="text-sm text-red-500">
                {errors.beneficiarios[index]?.nombre?.message as string}
              </p>
            )}
          </div>

          {/* Documento */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Documento</label>
            <input
              {...register(`beneficiarios.${index}.documento`)}
              className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
              placeholder="Número de documento"
            />
            {errors?.beneficiarios?.[index]?.documento && (
              <p className="text-sm text-red-500">
                {errors.beneficiarios[index]?.documento?.message as string}
              </p>
            )}
          </div>

          {/* Parentesco */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Parentesco</label>
            <input
              {...register(`beneficiarios.${index}.parentesco`)}
              className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
              placeholder="Ej: Hijo, Madre, Cónyuge"
            />
            {errors?.beneficiarios?.[index]?.parentesco && (
              <p className="text-sm text-red-500">
                {errors.beneficiarios[index]?.parentesco?.message as string}
              </p>
            )}
          </div>

          {/* Fecha de nacimiento */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Fecha de Nacimiento</label>
            <input
              type="date"
              {...register(`beneficiarios.${index}.fechaNacimiento`)}
              className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
            />
            {errors?.beneficiarios?.[index]?.fechaNacimiento && (
              <p className="text-sm text-red-500">
                {errors.beneficiarios[index]?.fechaNacimiento?.message as string}
              </p>
            )}
          </div>

          {/* Porcentaje */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">% Asignado</label>
            <input
              type="number"
              {...register(`beneficiarios.${index}.porcentaje`)}
              className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors py-1"
              placeholder="Ej: 25"
            />
            {errors?.beneficiarios?.[index]?.porcentaje && (
              <p className="text-sm text-red-500">
                {errors.beneficiarios[index]?.porcentaje?.message as string}
              </p>
            )}
          </div>

          {/* Eliminar beneficiario */}
          <div className="md:col-span-2 flex justify-end items-end">
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 hover:underline text-sm"
            >
              Eliminar beneficiario
            </button>
          </div>
        </div>
      ))}

      {/* Agregar beneficiario */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={() =>
            append({
              nombre: "",
              documento: "",
              parentesco: "",
              fechaNacimiento: "",
              porcentaje: "",
            })
          }
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          + Agregar otro beneficiario
        </button>
      </div>
    </div>
  );
}
 

