export type VehicleState = 'disponible' | 'vendido' | 'reservado' | 'mantenimiento';

export interface Vehicle {
  id: number;
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  estado: VehicleState;
  fechaIngreso: string;
  caracteristicas: string;
}