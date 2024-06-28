// PrediccionDemanda.ts

import { Articulo } from "./Articulo";

export interface PrediccionDemanda {
    id: number;
    porcentajeDeError: number;
    error: number;
    fechaInicio: Date;
    fechaFin: Date;
    cantidadPeriodo: string; // Ajusta el tipo según corresponda
    metodoPrediccion: string; // Ajusta el tipo según corresponda
    articulo: Articulo;
    valorPrediccion: number;
}
