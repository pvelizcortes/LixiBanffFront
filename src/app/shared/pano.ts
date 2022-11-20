export interface Pano {
    panoId: number,
    posicionPano?: number,
    codigoPano?: string,
    nombrePano?: string,
    cantidadNodo: number,
    anchoPano?: number,
    largoPano?: number,
    descripcionPano?: string, 
    pilaId?: number, 
    clienteId?: number, 
    createDate?: Date,
    active: boolean,
}