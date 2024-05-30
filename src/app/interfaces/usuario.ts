export interface Usuario{
    idUsuario?: number;
    nombre: string;
    apellido: string;
    correo: string;
    clave: string;
    activo?: boolean; // Aquí permitimos que activo sea boolean o undefined
}