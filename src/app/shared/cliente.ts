export interface Cliente {
    clienteId: number,
    clientePadreId: number,
    nombreCliente: string,
    correoCliente?: string,
    telefonoCliente?: string,
    direccionCliente?: string,
    descripcionCliente?: string,
    createDate?: Date,
    active: boolean,
}
