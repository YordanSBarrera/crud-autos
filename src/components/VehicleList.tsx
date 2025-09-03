// components/VehicleList.tsx
import { useVehicleStore } from '../stores/vehicleStore';
import { Vehicle } from '../types/vehicle';

interface VehicleListProps {
  vehicles: Vehicle[];
}

export default function VehicleList({ vehicles }: VehicleListProps) {
  const { deleteVehicle } = useVehicleStore();

  if (vehicles.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-5xl mb-4">🚗</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No hay vehículos registrados</h2>
        <p className="text-gray-500">Comienza agregando tu primer vehículo al inventario</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold p-4 bg-gray-50 text-gray-800 border-b">Inventario de Vehículos</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <th className="px-4 py-3 font-medium">Marca/Modelo</th>
              <th className="px-4 py-3 font-medium">Año</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Fecha Ingreso</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehicles.map(vehicle => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{vehicle.marca}</div>
                  <div className="text-gray-500">{vehicle.modelo}</div>
                  {vehicle.caracteristicas && (
                    <div className="text-xs text-gray-400 mt-1">{vehicle.caracteristicas.substring(0, 40)}...</div>
                  )}
                </td>
                <td className="px-4 py-3">{vehicle.año}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold">${vehicle.precio.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    vehicle.estado === 'disponible' ? 'bg-green-100 text-green-800' :
                    vehicle.estado === 'vendido' ? 'bg-red-100 text-red-800' :
                    vehicle.estado === 'reservado' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {vehicle.estado}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(vehicle.fechaIngreso).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => deleteVehicle(vehicle.id)}
                    className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors"
                    title="Eliminar vehículo"
                  >
                    <span className="mr-1">🗑️</span>
                    <span>Eliminar</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}