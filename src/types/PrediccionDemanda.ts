// PrediccionDemanda.ts

import { Articulo } from "./Articulo";
import { Demanda } from "./Demanda";
import { MetodoPrediccion } from "./MetodoPrediccion";

export interface PrediccionDemanda {
    id:number,
    fechaPrediccion:Date,
    valorPrediccion: number;
    idDemanda: Demanda;
    metodoPrediccion: MetodoPrediccion; 
    idArticulo: Articulo;
}
