import { FC, useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import Dropzone from "react-dropzone";

/**
 * Sección para subir firma y cédula (frente y reverso) del formulario de afiliación.
 * Requiere que las imágenes sean nítidas, sin reflejos y legibles.
 */
const FirmaYCedulaSection: FC<{
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}> = () => {
  const [firma, setFirma] = useState<File | null>(null);
  const [cedulaFrente, setCedulaFrente] = useState<File | null>(null);
  const [cedulaReverso, setCedulaReverso] = useState<File | null>(null);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-700 border-b pb-2">
        Firma y Documentos de Identidad
      </h3>

      {/* Firma */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Firma del Empleado (legible, sin distorsión)
        </label>
        <Dropzone
          accept={{ "image/*": [] }}
          maxSize={2 * 1024 * 1024}
          onDrop={(acceptedFiles) => setFirma(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="border-2 border-dashed rounded-xl p-6 cursor-pointer text-center bg-gray-50 hover:bg-gray-100"
            >
              <input {...getInputProps()} />
              <p className="text-gray-500">
                {firma ? `Archivo seleccionado: ${firma.name}` : "Subir imagen de firma (máx 2MB)"}
              </p>
            </div>
          )}
        </Dropzone>
      </div>

      {/* Cédula frente y reverso */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cédula - Frente
          </label>
          <Dropzone
            accept={{ "image/*": [] }}
            maxSize={2 * 1024 * 1024}
            onDrop={(acceptedFiles) => setCedulaFrente(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-xl p-6 cursor-pointer text-center bg-gray-50 hover:bg-gray-100"
              >
                <input {...getInputProps()} />
                <p className="text-gray-500">
                  {cedulaFrente ? `Archivo: ${cedulaFrente.name}` : "Subir imagen clara del frente"}
                </p>
              </div>
            )}
          </Dropzone>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cédula - Reverso
          </label>
          <Dropzone
            accept={{ "image/*": [] }}
            maxSize={2 * 1024 * 1024}
            onDrop={(acceptedFiles) => setCedulaReverso(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-xl p-6 cursor-pointer text-center bg-gray-50 hover:bg-gray-100"
              >
                <input {...getInputProps()} />
                <p className="text-gray-500">
                  {cedulaReverso ? `Archivo: ${cedulaReverso.name}` : "Subir imagen clara del reverso"}
                </p>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    </div>
  );
};

export default FirmaYCedulaSection;
