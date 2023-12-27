export interface Nodo {
    nodoId: number,
    posicionNodo?: number,
    codigoNodo?: string,
    nombreNodo?: string,
    mac?: string,
    panoId?: number,
    pilaId?: number,
    tipoNodoId?: number,
    zonaId?: number,
    latLongNodo: string,
    mediciones: NodoMediciones[],

    clienteId?: number,
    createDate?: Date,
    active: boolean,
}

export interface NodoMediciones {
    posicion: number,
    mac: string,
    descripcion: string,
    sensores: string
}