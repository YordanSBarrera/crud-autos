// stores/vehicleStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Vehicle, VehicleState } from '../types/vehicle';

interface VehicleStore {
  vehicles: Vehicle[];
  loadVehicles: () => void;
  addVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: number) => void;
  updateVehicle: (updatedVehicle: Vehicle) => void;
  getVehicle: (id: number) => Vehicle | undefined;
  getVehiclesByState: (state: VehicleState) => Vehicle[];
}

// Función para simular almacenamiento local
const storage = {
  getItem: (name: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(name);
    }
    return null;
  },
  setItem: (name: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(name);
    }
  }
};

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set, get) => ({
      vehicles: [],
      
      loadVehicles: () => {
        // Los datos se cargan automáticamente gracias al middleware persist
      },
      
      addVehicle: (vehicle) => {
        set((state) => ({ vehicles: [...state.vehicles, vehicle] }));
      },
      
      deleteVehicle: (id) => {
        set((state) => ({ 
          vehicles: state.vehicles.filter(v => v.id !== id) 
        }));
      },
      
      updateVehicle: (updatedVehicle) => {
        set((state) => ({
          vehicles: state.vehicles.map(v => 
            v.id === updatedVehicle.id ? updatedVehicle : v
          )
        }));
      },
      
      getVehicle: (id) => {
        return get().vehicles.find(v => v.id === id);
      },
      
      getVehiclesByState: (state) => {
        return get().vehicles.filter(v => v.estado === state);
      }
    }),
    {
      name: 'vehicle-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);