import { Demanda } from "./Demanda";


export interface Venta {
    id:number;
    fecha_venta:string;
    total_venta: number;
    id_demanda: Demanda;
}