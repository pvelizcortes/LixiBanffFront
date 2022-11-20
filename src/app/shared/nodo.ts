export interface Nodo {
    nodoId: number,
    posicionNodo?: number,
    codigoNodo?: string,
    nombreNodo?: string,
    mac?: string,
    panoId?: number, 
    pilaId?: number, 
    tipoNodoId?: number,
   
    clienteId?: number, 
    createDate?: Date,
    active: boolean,
}