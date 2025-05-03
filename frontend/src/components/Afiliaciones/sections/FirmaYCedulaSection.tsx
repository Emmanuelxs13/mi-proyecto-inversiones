import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function FirmaYCedulaSection({ register, errors }: Props) {
  const [previews, setPreviews] = useState<{
    firma?: string;
    cedulaFrente?: string;
    cedulaReverso?: string;
  }>({});

  const handlePreview = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof previews
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviews((prev) => ({ ...prev, [field]: file.name }));
    }
  };

  const renderPreview = (preview?: string) => {
    if (!preview) return null;
    return preview.startsWith("data:image") ? (
      <img
        src={preview}
        alt="preview"
        className="mt-2 rounded-md shadow border max-h-40 object-contain"
      />
    ) : (
      <p className="mt-2 text-sm text-gray-600 italic">{preview}</p>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-blue-800 border-b pb-2">
        Firma y Documento de Identidad
      </h3>

      {/* Firma */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">
          Cargar Firma (imagen o PDF)
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          {...register("firma")}
          onChange={(e) => handlePreview(e, "firma")}
          className="border border-gray-300 rounded p-2"
        />
        {errors.firma && (
          <p className="text-sm text-red-500">{errors.firma.message as string}</p>
        )}
        {renderPreview(previews.firma)}
      </div>

      {/* Cédula - Anverso */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">
          Cédula - Anverso
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          {...register("cedulaFrente")}
          onChange={(e) => handlePreview(e, "cedulaFrente")}
          className="border border-gray-300 rounded p-2"
        />
        {errors.cedulaFrente && (
          <p className="text-sm text-red-500">
            {errors.cedulaFrente.message as string}
          </p>
        )}
        {renderPreview(previews.cedulaFrente)}
      </div>

      {/* Cédula - Reverso */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">
          Cédula - Reverso
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          {...register("cedulaReverso")}
          onChange={(e) => handlePreview(e, "cedulaReverso")}
          className="border border-gray-300 rounded p-2"
        />
        {errors.cedulaReverso && (
          <p className="text-sm text-red-500">
            {errors.cedulaReverso.message as string}
          </p>
        )}
        {renderPreview(previews.cedulaReverso)}
      </div>
    </div>
  );
}
