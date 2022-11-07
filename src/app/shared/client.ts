export interface Client {
    clienteId: number,
    nombreCliente: string,
    correoCliente?: string,
    telefonoCliente?: string,
    direccionCliente?: string,
    descripcionCliente?: string,
    createDate?: Date,
    active: boolean,
}
