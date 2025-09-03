// components/VehicleForm.tsx
import { useState } from 'react';
import { useVehicleStore } from '../stores/vehicleStore';
import { Vehicle, VehicleState } from '../types/vehicle';

interface VehicleFormProps {
  onCancel: () => void;
}

export default function VehicleForm({ onCancel }: VehicleFormProps) {
  const { addVehicle } = useVehicleStore();
  const [formData, setFormData] = useState<Omit<Vehicle, 'id'>>({
    marca: '',
    modelo: '',
    año: new Date().getFullYear(),
    precio: 0,
    estado: 'disponible',
    fechaIngreso: new Date().toISOString().split('T')[0],
    caracteristicas: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVehicle({ ...formData, id: Date.now() });
    setFormData({
      marca: '',
      modelo: '',
      año: new Date().getFullYear(),
      precio: 0,
      estado: 'disponible',
      fechaIngreso: new Date().toISOString().split('T')[0],
      caracteristicas: ''
    });
    onCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'año' ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Agregar Vehículo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Marca</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="Ej: Toyota, Ford, etc."
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Modelo</label>
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="Ej: Corolla, F-150, etc."
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Año</label>
          <input
            type="number"
            name="año"
            min="1990"
            max={new Date().getFullYear() + 1}
            value={formData.año}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Precio ($)</label>
          <input
            type="number"
            name="precio"
            min="0"
            value={formData.precio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Fecha de Ingreso</label>
          <input
            type="date"
            name="fechaIngreso"
            value={formData.fechaIngreso}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="disponible">Disponible</option>
            <option value="vendido">Vendido</option>
            <option value="reservado">Reservado</option>
            <option value="mantenimiento">En Mantenimiento</option>
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Características</label>
        <textarea
          name="caracteristicas"
          value={formData.caracteristicas}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Color, transmisión, accesorios, etc."
        />
      </div>
      
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Guardar Vehículo
        </button>
      </div>
    </form>
  );
}