import { VentaArticulo } from "../types/VentaArticulo";

const BASE_URL ='http://localhost:8082'; 


export const VentaArticuloService = {

    getVentaArticulos:async (): Promise<VentaArticulo[]>=>{
        const response = await fetch(`${BASE_URL}/all`);
        const data = await response.json();
        return data;
    },

    getVentaArticulo: async (id: number): Promise<VentaArticulo[]> => {

        const response = await fetch(`${BASE_URL}/id/${id}`);
        const data = await response.json();
        return data;
    },

    createVentaArticulo:async (venta: VentaArticulo): Promise<VentaArticulo> => {
        const response = await fetch(`${BASE_URL}/api/v1/ventasdetalles`, {
            method: "POST", 
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        });

        const data = await response.json();
        return data;

    },

    updateVentaArticulo: async (id: number, venta: VentaArticulo): Promise<VentaArticulo> => {
        const response = await fetch(`${BASE_URL}/api/v1/ventasdetalles/${id}`, {
            method: "PUT",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        });

        const data = await response.json();
        return data;
    }, 

    deleteVentaArticulo:async (id:number): Promise<void> => {
        await fetch (`${BASE_URL}/api/v1/ventasdetalles/${id}`,{
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
            },
        });
    }
}