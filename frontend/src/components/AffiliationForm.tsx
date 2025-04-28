import React, { useState } from "react";

// Interfaz para los datos del formulario
interface FormData {
  nombre: string;
  email: string;
  puesto: string;
  archivo: File | null;
}

const AffiliationForm: React.FC = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    puesto: "",
    archivo: null,
  });

  // Estado para manejar el mensaje de error o éxito
  const [message, setMessage] = useState<string>("");

  // Función para manejar cambios en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar el archivo adjunto
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      archivo: file,
    }));
  };

  // Función para enviar los datos
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.puesto || !formData.archivo) {
      setMessage("Todos los campos son requeridos.");
      return;
    }

    const form = new FormData();
    form.append("nombre", formData.nombre);
    form.append("email", formData.email);
    form.append("puesto", formData.puesto);
    form.append("archivo", formData.archivo);

    try {
      // Reemplazar con tu endpoint del backend
      const response = await fetch("/api/postular", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        setMessage("Postulación enviada correctamente.");
      } else {
        setMessage("Hubo un error al enviar la postulación.");
      }
    } catch (error) {
      setMessage("Error al enviar la solicitud.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Formulario de Postulación</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="puesto" className="block">Puesto</label>
          <input
            type="text"
            id="puesto"
            name="puesto"
            value={formData.puesto}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="archivo" className="block">Subir Formulario</label>
          <input
            type="file"
            id="archivo"
            name="archivo"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Enviar Postulación
          </button>
        </div>
        {message && <p className="text-center mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default AffiliationForm;
