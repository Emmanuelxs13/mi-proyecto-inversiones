// Contact.tsx
// Sección de contacto con enfoque claro y directo para facilitar la comunicación
// Incluye formulario visual, accesible y responsivo con contacto por redes y correo

import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="mt-6">
        <div className="grid sm:grid-cols-2 items-start gap-12 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          {/* Información de contacto */}
          <div>
            <h1 className="text-slate-900 text-3xl font-semibold">Contáctanos</h1>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">
              Estamos aquí para ayudarte. Envíanos tus dudas o sugerencias.
            </p>

            {/* Email */}
            <div className="mt-12">
              <h2 className="text-slate-900 text-base font-semibold">Email</h2>
              <ul className="mt-4">
                <li className="flex items-center">
                  <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 479.058 479.058">
                      <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
                    </svg>
                  </div>
                  <a href="#" className="text-sm ml-4">
                    <small className="block text-slate-900">Email</small>
                    <span className="text-blue-600 font-medium">contacto@botopia.tech</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Redes sociales */}
            <div className="mt-12">
              <h2 className="text-slate-900 text-base font-semibold">Nuestras redes</h2>
              <ul className="flex mt-4 space-x-4">
                {/* WhatsApp */}
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <a href="https://api.whatsapp.com/send?phone=573228726267&text=%C2%A1Hola%20Botopia!%20necesito%20tecnolog%C3%ADa.">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#007bff" viewBox="0 0 24 24">
                            <path d="M20.52 3.48A11.78 11.78 0 0 0 12 0C5.37 0 0 5.37 0 12a11.9 11.9 0 0 0 1.66 6L0 24l6.3-1.65A11.9 11.9 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.18-1.24-6.17-3.48-8.52zM12 22a9.87 9.87 0 0 1-5-1.36l-.36-.22-3.74.97.99-3.65-.23-.38A9.88 9.88 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.21-7.75c-.27-.14-1.61-.8-1.86-.89s-.43-.14-.61.14-.7.86-.86 1.04-.32.21-.59.07a8.11 8.11 0 0 1-2.38-1.47 8.83 8.83 0 0 1-1.63-2.02c-.17-.29 0-.44.13-.58.13-.13.29-.34.44-.51s.2-.29.3-.49a.52.52 0 0 0-.03-.51c-.08-.14-.61-1.47-.84-2s-.44-.47-.6-.48h-.51c-.17 0-.44.06-.67.29s-.88.86-.88 2.1.9 2.44 1.02 2.6c.13.17 1.77 2.7 4.3 3.79.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.7-1.18.21-.59.21-1.09.14-1.18-.06-.1-.24-.17-.5-.31z"/>
                        </svg>
                    </a>
                </li>

                {/* LinkedIn */}
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <a href="https://www.linkedin.com/company/botopiasas/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                        viewBox="0 0 511 512">
                        <path
                        d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2 34.848 0 63.195-28.352 63.195-63.2C126.898 28.352 98.551 0 63.703 0zm0 96.395c-18.308 0-33.203-14.891-33.203-33.2C30.5 44.891 45.395 30 63.703 30c18.305 0 33.195 14.89 33.195 33.195 0 18.309-14.89 33.2-33.195 33.2zm289.207 62.148c-22.8 0-45.273 5.496-65.398 15.777-.684-7.652-7.11-13.656-14.942-13.656h-96.406c-8.281 0-15 6.719-15 15V497c0 8.285 6.719 15 15 15h96.406c8.285 0 15-6.715 15-15V320.266c0-22.735 18.5-41.23 41.235-41.23 22.734 0 41.226 18.495 41.226 41.23V497c0 8.285 6.719 15 15 15h96.403c8.285 0 15-6.715 15-15V302.066c0-79.14-64.383-143.523-143.524-143.523zM466.434 482h-66.399V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-66.402V190.664h66.402v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.313-16.294 44.852-24.907 70.953-24.907 62.598 0 113.524 50.926 113.524 113.523zm0 0"
                        data-original="#000000" />
                    </svg>
                    </a>
                </li>

                {/* Instagram */}
                <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="https://www.instagram.com/botopia.tech/">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                    viewBox="0 0 24 24">
                    <path
                      d="M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0-1.8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm5.85-.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 4.8c-2.227 0-2.59.006-3.626.052-.706.034-1.18.128-1.618.299a2.59 2.59 0 0 0-.972.633 2.601 2.601 0 0 0-.634.972c-.17.44-.265.913-.298 1.618C4.805 9.367 4.8 9.714 4.8 12c0 2.227.006 2.59.052 3.626.034.705.128 1.18.298 1.617.153.392.333.674.632.972.303.303.585.484.972.633.445.172.918.267 1.62.3.993.047 1.34.052 3.626.052 2.227 0 2.59-.006 3.626-.052.704-.034 1.178-.128 1.617-.298.39-.152.674-.333.972-.632.304-.303.485-.585.634-.972.171-.444.266-.918.299-1.62.047-.993.052-1.34.052-3.626 0-2.227-.006-2.59-.052-3.626-.034-.704-.128-1.18-.299-1.618a2.619 2.619 0 0 0-.633-.972 2.595 2.595 0 0 0-.972-.634c-.44-.17-.914-.265-1.618-.298-.993-.047-1.34-.052-3.626-.052ZM12 3c2.445 0 2.75.009 3.71.054.958.045 1.61.195 2.185.419A4.388 4.388 0 0 1 19.49 4.51c.457.45.812.994 1.038 1.595.222.573.373 1.227.418 2.185.042.96.054 1.265.054 3.71 0 2.445-.009 2.75-.054 3.71-.045.958-.196 1.61-.419 2.185a4.395 4.395 0 0 1-1.037 1.595 4.44 4.44 0 0 1-1.595 1.038c-.573.222-1.227.373-2.185.418-.96.042-1.265.054-3.71.054-2.445 0-2.75-.009-3.71-.054-.958-.045-1.61-.196-2.185-.419A4.402 4.402 0 0 1 4.51 19.49a4.414 4.414 0 0 1-1.037-1.595c-.224-.573-.374-1.227-.419-2.185C3.012 14.75 3 14.445 3 12c0-2.445.009-2.75.054-3.71s.195-1.61.419-2.185A4.392 4.392 0 0 1 4.51 4.51c.45-.458.994-.812 1.595-1.037.574-.224 1.226-.374 2.185-.419C9.25 3.012 9.555 3 12 3Z">
                    </path>
                  </svg>
                </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Formulario de contacto */}
          <form className="space-y-4">
            <input type='text' placeholder='Nombre' className="w-full text-slate-900 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-blue-500" />
            <input type='email' placeholder='Correo' className="w-full text-slate-900 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-blue-500" />
            <input type='text' placeholder='Asunto' className="w-full text-slate-900 rounded-md py-2.5 px-4 border text-sm outline-none focus:border-blue-500" />
            <textarea placeholder='Mensaje' rows={6} className="w-full text-slate-900 rounded-md px-4 border text-sm pt-2.5 outline-none focus:border-blue-500"></textarea>
            <button type='button' className="text-white bg-blue-500 hover:bg-blue-600 rounded-md text-[15px] font-medium px-4 py-2 w-full mt-6">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
