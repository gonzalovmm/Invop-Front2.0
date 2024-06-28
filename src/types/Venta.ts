import { Demanda } from "./Demanda";


export interface Venta {
    id:number;
    fechaVenta:string;
    totalVenta: number;
    id_demanda: Demanda;

    
}