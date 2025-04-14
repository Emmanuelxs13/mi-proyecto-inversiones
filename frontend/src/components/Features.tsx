// Features.tsx
// Sección que presenta características clave o beneficios del servicio

const Features = () => {
    return (
      <section
        id="features"
        className="py-20 bg-white text-center border-t border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-700 mb-12">
            ¿Por qué elegirnos?
          </h2>
  
          {/* Tres características en tarjetas */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Tarjeta 1 */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Simulación en tiempo real
              </h3>
              <p className="text-gray-600">
                Calcula tus inversiones y proyecciones fácilmente.
              </p>
            </div>
  
            {/* Tarjeta 2 */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Interfaz amigable
              </h3>
              <p className="text-gray-600">
                Diseñada para usuarios sin experiencia financiera.
              </p>
            </div>
  
            {/* Tarjeta 3 */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Resultados confiables
              </h3>
              <p className="text-gray-600">
                Basados en fórmulas y tasas actualizadas.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
  