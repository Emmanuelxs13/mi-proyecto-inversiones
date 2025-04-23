// PrestamoVista.ts
// Tipado para representar un préstamo en la interfaz visual con datos relacionados

// src/types/PrestamoVista.ts
export interface PrestamoVista {
    id: number;
    nombreSocio: string;
    tipoPrestamo: string;
    monto: number;
    cuotasTotal: number;
    fechaInicio: string;
    estado: "vigente" | "pendiente" | "cancelado";
  }
  