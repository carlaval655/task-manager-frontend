import { useState, useEffect } from 'react';
import { FaRegCalendarAlt, FaSave, FaTimes, FaRegStickyNote, FaHeading } from 'react-icons/fa';

export default function TaskForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  const today = new Date();
  const localDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const minDate = localDate.toISOString().split('T')[0];

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setDueDate(initialData.dueDate ? initialData.dueDate.slice(0, 10) : '');
    } else {
      // Limpiar campos si no hay datos iniciales
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [initialData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return alert('El título es obligatorio');
    onSubmit({ 
      title: title.trim(), 
      description: description.trim() || null, 
      dueDate: dueDate || null 
    });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white rounded-xl shadow-lg p-6 max-w-xl mx-auto mb-8"
    >
      <div className="mb-4">
        <label className="block font-semibold mb-1 flex items-center gap-2">
          <FaHeading className="text-blue-500" />
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1 flex items-center gap-2">
          <FaRegStickyNote className="text-purple-500" />
          Descripción
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1 flex items-center gap-2">
          <FaRegCalendarAlt className="text-green-500" />
          Fecha límite
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          min={minDate}
        />
      </div>

      <div className="flex gap-3 mt-6 justify-end">
        <button
          type="submit"
          title="Guardar tarea"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          <FaSave />
          Guardar
        </button>

        {onCancel && (
          <button
            type="button"
            title="Cancelar"
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded shadow"
          >
            <FaTimes />
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}