import { EstadoOrdenCompra } from "./EstadoOrdenCompra";
import { Proveedor } from "./Proveedor";

export interface OrdenDeCompra{
    id:number;
    estadoOrdenCompra: EstadoOrdenCompra;
    fechaOrdenCompra: string;
    totalOrdenCompra: number;
    proveedor: Proveedor;
}