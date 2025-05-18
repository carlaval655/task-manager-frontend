import { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchTasks = async () => {
    try {
      let url = '/tasks';
      const params = {};
      if (filter) params.status = filter;
      if (search) params.search = search;

      const res = await axios.get(url, { params });
      setTasks(res.data);
    } catch (err) {
      alert('Error al cargar tareas');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter, search]);

  const handleCreate = async (data) => {
    try {
      await axios.post('/tasks', data);
      fetchTasks();
    } catch {
      alert('Error al crear tarea');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await axios.put(`/tasks/${editingTask.id}`, data);
      setEditingTask(null);
      fetchTasks();
    } catch {
      alert('Error al actualizar tarea');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'No se pudo cambiar el estado');
    }
  };

  const handleDelete = async (task) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta tarea? Solo las completadas se pueden eliminar.')) return;
    try {
      await axios.delete(`/tasks/${task.id}`);
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al eliminar tarea');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hola, {user?.name}</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="mb-4">
        {editingTask ? (
          <TaskForm
            initialData={editingTask}
            onSubmit={handleUpdate}
            onCancel={() => setEditingTask(null)}
          />
        ) : (
          <TaskForm onSubmit={handleCreate} />
        )}
      </section>

      <section className="mb-4 flex gap-4">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="input"
        >
          <option value="">Filtrar por estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
        <input
          type="text"
          placeholder="Buscar por título o descripción"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input flex-grow"
        />
      </section>

      <section>
        {tasks.length === 0 && <p className="text-center text-gray-500">No hay tareas para mostrar.</p>}
        {tasks.map(task => (
          <TaskCard
          key={task.id}
          task={task}
          onEdit={() => setEditingTask(task)} // ← Este ya debería funcionar
          onDelete={() => handleDelete(task)}
          onStatusChange={handleStatusChange}
          />
        ))}
      </section>
    </div>
  );
}