export interface Marca{
    idMarca?: number;
    descripcion: string;
    activo?: boolean; // Aquí permitimos que activo sea boolean o undefined
}