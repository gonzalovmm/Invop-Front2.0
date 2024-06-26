export interface Articulo{
    id:number
    cantidadAPedir: number;
    cantidadMaxima: number;
    cgi: number;
    costoAlmacenamiento: number;
    costoPedido: number;
    demandaAnual: number;
    loteOptimo: number;
    modeloInventario: string;	
    nombre: string;
    precio: number;
    puntoPedido: number;	
    stockActual: number;	
    stockSeguridad: number;
    tiempoRevision: number;	
    proveedorPred: string;	

}

