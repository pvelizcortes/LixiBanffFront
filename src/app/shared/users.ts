export class UsuarioDto{ 
    nombreUsuario: string;
    password: string;
}

export interface Users {
    nombreUsuario: string,
    password: string,
    usuarioId: number,  
    active: boolean,
    clienteId:number,
    correoUsuario?: string,
    createDate?: Date,
    descripcionUsuario?: string,
    perfilId:number,
    telefonoUsuario?: string,
    isSuperAdmin:boolean,
    passwordNotEncripted?: string
}
