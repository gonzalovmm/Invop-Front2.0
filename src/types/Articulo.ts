export interface Articulo{
    id:number
    cantidad_a_pedir: number;
    cantidad_maxima: number;
    cgi: number;
    costo_almacenamiento: number;
    costo_pedido: number;
    demanda_anual: number;
    lote_optimo: number;
    modelo_inventario: string;	
    nombre_articulo: string;
    precio_articulo: number;
    punto_pedido: number;	
    stock_actual: number;	
    stock_seguridad: number;
    tiempo_revision: number;	
    proveedor_predeterminado: string;	
    seleccionado: boolean; // Atributo para manejar la selección
}