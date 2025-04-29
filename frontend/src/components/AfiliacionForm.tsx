import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Dropzone from "react-dropzone";

const schema = yup
  .object({
    primerApellido: yup.string().required("Primer apellido obligatorio"),
    segundoApellido: yup.string().required("Segundo apellido obligatorio"),
    nombres: yup.string().required("Nombres obligatorios"),
    tipoDocumento: yup.string().required("Tipo de documento obligatorio"),
    numeroDocumento: yup.string().matches(/^\d+$/, "Solo números permitidos"),
    correo: yup
      .string()
      .email("Correo inválido")
      .required("Correo obligatorio"),
    fechaNacimiento: yup.date().max(new Date(), "Fecha no puede ser futura"),
    sexo: yup.string().required("Sexo obligatorio"),
    estadoCivil: yup.string().required("Estado civil obligatorio"),
    rh: yup.string().required("RH obligatorio"),
    nivelEstudios: yup.string().required("Nivel académico obligatorio"),
    tituloObtenido: yup.string().required("Título obligatorio"),
    tipoVivienda: yup.string().required("Tipo de vivienda obligatorio"),
    direccionVivienda: yup
      .string()
      .required("Dirección de vivienda obligatoria"),
    ciudadVivienda: yup.string().required("Ciudad de vivienda obligatoria"),
    telefonoFijo: yup.string().matches(/^\d+$/, "Solo números permitidos"),
    celular: yup
      .string()
      .matches(/^\d+$/, "Solo números permitidos")
      .required("Celular obligatorio"),
    sueldoMensual: yup.number().positive("Debe ser mayor a 0"),
    porcentajeDescuento: yup
      .number()
      .min(3)
      .max(10)
      .required("% obligatorio entre 3 y 10"),
    beneficiarios: yup
      .array()
      .of(
        yup.object({
          nombre: yup.string().required("Nombre requerido"),
          documento: yup.string().matches(/^\d+$/, "Solo números permitidos"),
          parentesco: yup.string().required("Parentesco requerido"),
          fechaNacimiento: yup.date().max(new Date(), "Fecha inválida"),
          porcentaje: yup
            .number()
            .positive("Debe ser mayor a 0")
            .max(100, "Máximo 100%"),
        })
      )
      .min(1, "Agregar al menos un beneficiario")
      .required(),
  })
  .required();

export default function AfiliacionForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      beneficiarios: [
        {
          nombre: "",
          documento: "",
          parentesco: "",
          fechaNacimiento: "",
          porcentaje: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "beneficiarios",
  });
  const [firma, setFirma] = useState(null);
  const [cedulaFrente, setCedulaFrente] = useState(null);
  const [cedulaReverso, setCedulaReverso] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    // Aquí iría la llamada API al backend
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 col-span-2 border-b pb-2">
        Datos Personales
      </h2>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="primerApellido"
          className="text-sm font-medium text-gray-700"
        >
          Primer Apellido
        </label>
        <input
          id="primerApellido"
          {...register("primerApellido")}
          className="input input-bordered w-full"
        />
        {errors.primerApellido && (
          <p className="text-red-500 text-xs">
            {errors.primerApellido.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="segundoApellido"
          className="text-sm font-medium text-gray-700"
        >
          Segundo Apellido
        </label>
        <input
          id="segundoApellido"
          {...register("segundoApellido")}
          className="input input-bordered w-full"
        />
        {errors.segundoApellido && (
          <p className="text-red-500 text-xs">
            {errors.segundoApellido.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="nombres" className="text-sm font-medium text-gray-700">
          Nombres Completos
        </label>
        <input
          id="nombres"
          {...register("nombres")}
          className="input input-bordered w-full"
        />
        {errors.nombres && (
          <p className="text-red-500 text-xs">{errors.nombres.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="numeroDocumento"
          className="text-sm font-medium text-gray-700"
        >
          Número de Documento
        </label>
        <input
          id="numeroDocumento"
          {...register("numeroDocumento")}
          className="input input-bordered w-full"
        />
        {errors.numeroDocumento && (
          <p className="text-red-500 text-xs">
            {errors.numeroDocumento.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="correo" className="text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <input
          id="correo"
          {...register("correo")}
          className="input input-bordered w-full"
        />
        {errors.correo && (
          <p className="text-red-500 text-xs">{errors.correo.message}</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 col-span-2 mt-12 border-b pb-2">
        Formación Académica
      </h2>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="nivelEstudios"
          className="text-sm font-medium text-gray-700"
        >
          Nivel de Estudios
        </label>
        <select
          id="nivelEstudios"
          {...register("nivelEstudios")}
          className="select select-bordered w-full"
        >
          <option value="">Seleccionar nivel de estudios</option>
          <option value="Primaria">Primaria</option>
          <option value="Bachillerato">Bachillerato</option>
          <option value="Técnico">Técnico</option>
          <option value="Universitario">Universitario</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.nivelEstudios && (
          <p className="text-red-500 text-xs">{errors.nivelEstudios.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="tituloObtenido"
          className="text-sm font-medium text-gray-700"
        >
          Título Obtenido
        </label>
        <input
          id="tituloObtenido"
          {...register("tituloObtenido")}
          className="input input-bordered w-full"
        />
        {errors.tituloObtenido && (
          <p className="text-red-500 text-xs">
            {errors.tituloObtenido.message}
          </p>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 col-span-2 mt-12 border-b pb-2">
        Información de Vivienda
      </h2>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="tipoVivienda"
          className="text-sm font-medium text-gray-700"
        >
          Tipo de Vivienda
        </label>
        <select
          id="tipoVivienda"
          {...register("tipoVivienda")}
          className="select select-bordered w-full"
        >
          <option value="">Seleccionar tipo de vivienda</option>
          <option value="Propia">Propia</option>
          <option value="Familiar">Familiar</option>
          <option value="Arriendo">Arriendo</option>
        </select>
        {errors.tipoVivienda && (
          <p className="text-red-500 text-xs">{errors.tipoVivienda.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="direccionVivienda"
          className="text-sm font-medium text-gray-700"
        >
          Dirección
        </label>
        <input
          id="direccionVivienda"
          {...register("direccionVivienda")}
          className="input input-bordered w-full"
        />
        {errors.direccionVivienda && (
          <p className="text-red-500 text-xs">
            {errors.direccionVivienda.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="ciudadVivienda"
          className="text-sm font-medium text-gray-700"
        >
          Ciudad
        </label>
        <input
          id="ciudadVivienda"
          {...register("ciudadVivienda")}
          className="input input-bordered w-full"
        />
        {errors.ciudadVivienda && (
          <p className="text-red-500 text-xs">
            {errors.ciudadVivienda.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="telefonoFijo"
          className="text-sm font-medium text-gray-700"
        >
          Teléfono Fijo (Opcional)
        </label>
        <input
          id="telefonoFijo"
          {...register("telefonoFijo")}
          className="input input-bordered w-full"
        />
        {errors.telefonoFijo && (
          <p className="text-red-500 text-xs">{errors.telefonoFijo.message}</p>
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
          <p className="text-red-500 text-xs">{errors.celular.message}</p>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 col-span-2 mt-12 border-b pb-2">
        Firma y Documentos
      </h2>

      <div className="col-span-2">
        <Dropzone
          accept={{ "image/*": [] }}
          maxSize={2000000}
          onDrop={(acceptedFiles) => setFirma(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="border-2 border-dashed rounded-xl p-6 cursor-pointer text-center"
            >
              <input {...getInputProps()} />
              <p className="text-gray-400">Subir Imagen de Firma (máx 2MB)</p>
            </div>
          )}
        </Dropzone>
        {firma && <p className="text-green-500 text-xs mt-2">{firma.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
        <Dropzone
          accept={{ "image/*": [] }}
          maxSize={2000000}
          onDrop={(acceptedFiles) => setCedulaFrente(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="border-2 border-dashed rounded-xl p-6 cursor-pointer text-center"
            >
              <input {...getInputProps()} />
              <p className="text-gray-400">Cédula Frente</p>
            </div>
          )}
        </Dropzone>

        <Dropzone
          accept={{ "image/*": [] }}
          maxSize={2000000}
          onDrop={(acceptedFiles) => setCedulaReverso(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="border-2 border-dashed rounded-xl p-6 cursor-pointer text-center"
            >
              <input {...getInputProps()} />
              <p className="text-gray-400">Cédula Reverso</p>
            </div>
          )}
        </Dropzone>
      </div>

      {/* Información Laboral */}
      <h2 className="text-2xl font-semibold text-gray-700 col-span-2 mt-12 border-b pb-2">
        Información Laboral
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="sede" className="text-sm font-medium text-gray-700">
          Sede / ERON / Regional o EPN
        </label>
        <input
          id="sede"
          {...register("sede")}
          className="input input-bordered w-full"
          placeholder="Ej: ERON Bogotá"
        />
        {errors.sede && (
          <p className="text-red-500 text-xs">{errors.sede.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="direccionLaboral"
          className="text-sm font-medium text-gray-700"
        >
          Dirección Laboral
        </label>
        <input
          id="direccionLaboral"
          {...register("direccionLaboral")}
          className="input input-bordered w-full"
          placeholder="Dirección completa de la sede"
        />
        {errors.direccionLaboral && (
          <p className="text-red-500 text-xs">
            {errors.direccionLaboral.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="telefonoLaboral"
          className="text-sm font-medium text-gray-700"
        >
          Teléfono Laboral
        </label>
        <input
          id="telefonoLaboral"
          {...register("telefonoLaboral")}
          className="input input-bordered w-full"
          placeholder="Ej: 6014567890"
        />
        {errors.telefonoLaboral && (
          <p className="text-red-500 text-xs">
            {errors.telefonoLaboral.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="sueldoMensual"
          className="text-sm font-medium text-gray-700"
        >
          Sueldo Mensual
        </label>
        <input
          id="sueldoMensual"
          type="number"
          {...register("sueldoMensual")}
          className="input input-bordered w-full"
          placeholder="$ COP"
        />
        {errors.sueldoMensual && (
          <p className="text-red-500 text-xs">{errors.sueldoMensual.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="eps" className="text-sm font-medium text-gray-700">
          EPS
        </label>
        <input
          id="eps"
          {...register("eps")}
          className="input input-bordered w-full"
          placeholder="Nombre de la EPS"
        />
        {errors.eps && (
          <p className="text-red-500 text-xs">{errors.eps.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="fondoPension"
          className="text-sm font-medium text-gray-700"
        >
          Fondo de Pensiones
        </label>
        <input
          id="fondoPension"
          {...register("fondoPension")}
          className="input input-bordered w-full"
          placeholder="Nombre del fondo de pensiones"
        />
        {errors.fondoPension && (
          <p className="text-red-500 text-xs">{errors.fondoPension.message}</p>
        )}
      </div>

      <div className="col-span-2">
        <button
          type="submit"
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg"
        >
          Enviar Solicitud
        </button>
      </div>
    </form>
  );
}
