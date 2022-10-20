export interface Client {
    ClienteId: number,
    NombreCliente: string,
    CorreoCliente?: string,
    TelefonoCliente?: string,
    DireccionCliente?: string,
    DescripcionCliente?: string,
    CreateDate?: Date,
    Active: boolean,
}
