// pages/index.tsx
import { useState, useEffect } from 'react';
import VehicleList from '../components/VehicleList';
import VehicleForm from '../components/VehicleForm';
import { useVehicleStore } from '../stores/vehicleStore';
import { Vehicle } from '../types/vehicle';

export default function Home() {
  const { vehicles, loadVehicles } = useVehicleStore();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 rounded-lg mb-6 shadow-md">
        <h1 className="text-3xl font-bold mb-2">Sistema de Gestión de Automotora</h1>
        <p className="opacity-90">Aplicación funciona completamente offline</p>
      </header>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              {showForm ? 'Ver Vehículos' : 'Agregar Vehículo'}
            </button>
            
            {!showForm && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar vehículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border rounded pl-10"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  🔍
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
            <span>{vehicles.length} vehículos en inventario</span>
          </div>
        </div>
        
        {showForm ? (
          <VehicleForm onCancel={() => setShowForm(false)} />
        ) : (
          <VehicleList vehicles={filteredVehicles} />
        )}
      </div>
      
      <footer className="text-center text-gray-500 text-sm mt-8">
        <p>Sistema de Automotora - Trabaja sin conexión - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}