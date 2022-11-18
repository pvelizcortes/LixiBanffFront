export interface Pano {
    panoId: number,
    posicionPano?: number,
    codigoPano?: string,
    nombrePano?: string,
    anchoPano?: number,
    largoPano?: number,
    descripcionPano?: string, 
    pilaId?: number, 
    clienteId?: number, 
    createDate?: Date,
    active: boolean,
}