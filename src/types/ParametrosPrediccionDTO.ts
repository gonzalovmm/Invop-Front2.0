// ParametrosPrediccionDTO.ts

import { MetodoPrediccion } from "./MetodoPrediccion";
export interface ParametrosPrediccionDTO {
    articuloId: number;
    fechaDesde: string; // Usaremos formato de fecha en string ISO
    fechaHasta: string; // Usaremos formato de fecha en string ISO
    coeficientes: number[];
    mesPrediccion: number;
    anioPrediccion: number;
    metodoPrediccion: MetodoPrediccion;
    alfa: number;
    cantidadPeriodosAPredecir: number;
    cantidadPeriodosAUsar: number;
    cantidadDemandaAnual: number;
    error: number;
    porcentajeDeError: number;
    prediccion: number;
}
