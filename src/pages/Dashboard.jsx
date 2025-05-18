import { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchTasks = async () => {
    try {
      let url = "/tasks";
      const params = {};
      if (filter) params.status = filter;
      if (search) params.search = search;

      // 👇 Agregamos filtros de fechas si están definidos
      if (fromDate) params.from = fromDate;
      if (toDate) params.to = toDate;

      const res = await axios.get(url, { params });
      setTasks(res.data);
    } catch (err) {
      alert("Error al cargar tareas");
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [filter, search, fromDate, toDate]);

  const handleCreate = async (data) => {
    try {
      await axios.post("/tasks", data);
      fetchTasks();
    } catch {
      alert("Error al crear tarea");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await axios.put(`/tasks/${editingTask.id}`, data);
      setEditingTask(null);
      fetchTasks();
    } catch {
      alert("Error al actualizar tarea");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "No se pudo cambiar el estado");
    }
  };

  const handleDelete = async (task) => {
    if (
      !window.confirm(
        "¿Seguro que quieres eliminar esta tarea? Solo las completadas se pueden eliminar."
      )
    )
      return;
    try {
      await axios.delete(`/tasks/${task.id}`);
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Error al eliminar tarea");
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

      <section className="mb-4 flex flex-wrap gap-2 justify-around ml-40 mr-40">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Filtrar por estado</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input w-60"
          >
            <option value="">Todas las tareas</option>
            <option value="pendiente">Pendientes</option>
            <option value="en progreso">En progreso</option>
            <option value="completada">Completadas</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Buscar por título o descripción
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pr-20 w-60"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                title="Borrar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">De:</label>
          <div className="relative">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                const newFromDate = e.target.value;
                setFromDate(newFromDate);
                if (toDate && newFromDate > toDate) {
                  setToDate("");
                }
              }}
              className="input pr-10 w-36"
            />
            {fromDate && (
              <button
                onClick={() => setFromDate("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                title="Borrar fecha de inicio"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">A:</label>
          <div className="relative">
            <input
              type="date"
              value={toDate}
              min={fromDate || undefined}
              onChange={(e) => setToDate(e.target.value)}
              className="input pr-10 w-36"
            />
            {toDate && (
              <button
                onClick={() => setToDate("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                title="Borrar fecha de fin"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      <section>
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">
            No hay tareas para mostrar.
          </p>
        )}
        {tasks.map((task) => (
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
