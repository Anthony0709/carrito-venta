export interface Categoria{
    idCategoria?: number;
    descripcion: string;
    activo?: boolean; // Aquí permitimos que activo sea boolean o undefined
}