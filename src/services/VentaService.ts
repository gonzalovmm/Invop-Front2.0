import {Articulo} from "../types/Articulo";
import {Venta} from "../types/Venta"

const BASE_URL ='http://localhost:8082'; 

export const VentaService= {
    getVentas:async (): Promise<Venta[]>=>{
        const response = await fetch(`${BASE_URL}/api/v1/ventas`);
        const data = await response.json();
        return data;
    },

    getVenta: async (id: number): Promise<Venta> => {

        const response = await fetch(`${BASE_URL}/api/v1/ventas/${id}`, {
            method: "GET",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return data;
    },

    createVenta: async (articulosSeleccionados: { articulo: Articulo, cantidad: number, invalid: boolean }[]): Promise<string> => {
        // Filtramos los artículos que no sean válidos mediante la funcion callback as => !as.invalid
        const validArticulos = articulosSeleccionados.filter(as => !as.invalid).map(as => ({
            articuloId: as.articulo.id,
            cantidad: as.cantidad
        }));
        //validArticulos es un array que contiene solamente aquellos articulos que sean validos 
        const response = await fetch(`${BASE_URL}api/v1/ventas/nuevaVenta`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ articulos: validArticulos }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    },

}