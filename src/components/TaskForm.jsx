import { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setDueDate(initialData.dueDate ? initialData.dueDate.slice(0, 10) : '');
    }
  }, [initialData]); // 🔥 se vuelve a ejecutar cuando cambia

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return alert('El título es obligatorio');
    onSubmit({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-5">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="input mb-2 w-full"
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="input mb-2 w-full"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="input mb-2 w-full"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Guardar
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}