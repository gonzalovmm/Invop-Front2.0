import { Articulo } from "./Articulo";

export interface Demanda{
    id: number,
    fecha_desde: Date,
    fecha_hasta: Date,
    total_demanda: number,
    id_articulo: Articulo;
}