import { useState } from 'react';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const { id, title, description, status, dueDate } = task;
  const [newStatus, setNewStatus] = useState(status);

  const handleStatusChange = (e) => {
    const selected = e.target.value;
    setNewStatus(selected);
    if (selected !== status) {
      onStatusChange(id, selected);
    }
  };

  const isAllowed = (from, to) => {
    if (from === 'pendiente') return to === 'pendiente' || to === 'en progreso';
    if (from === 'en progreso') return to === 'en progreso' || to === 'completada';
    return to === from; // completada: no puede cambiar
  };

  const statusOptions = ['pendiente', 'en progreso', 'completada'];

  return (
    <div className="bg-white rounded shadow p-4 mb-3">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-600">{description || 'Sin descripción'}</p>
      <p className="text-sm">Fecha límite: {dueDate ? new Date(dueDate).toLocaleDateString() : 'N/A'}</p>

      <div className="mt-3">
        <label className="block text-sm font-semibold">Estado:</label>
        <select
          className="mt-1 p-2 border rounded w-full"
          value={newStatus}
          onChange={handleStatusChange}
          disabled={status === 'completada'}
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt} disabled={!isAllowed(status, opt)}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onEdit}
          className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}