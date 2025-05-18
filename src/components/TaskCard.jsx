import { useState } from "react";
import { Pencil, Trash2, FileText, ClipboardList, Info, Clock, Loader, CheckCircle, ChevronDown, } from "lucide-react";
import { Listbox } from '@headlessui/react';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const { id, title, description, status, dueDate } = task;
  const [newStatus, setNewStatus] = useState(status);

  const isAllowed = (from, to) => {
    if (from === "pendiente") return to === "pendiente" || to === "en progreso";
    if (from === "en progreso") return to === "en progreso" || to === "completada";
    return to === from; // completada: no puede cambiar
  };

  const statusOptions = [
    {
      label: "pendiente",
      icon: Clock,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      label: "en progreso",
      icon: Loader,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "completada",
      icon: CheckCircle,
      color: "text-green-600 bg-green-100",
    },
  ];

  const statusColors = {
    pendiente: "bg-yellow-100 border-yellow-400",
    "en progreso": "bg-blue-100 border-blue-400",
    completada: "bg-green-100 border-green-400",
  };

  const selectedOption = statusOptions.find((option) => option.label === newStatus);

  return (
    <div className={`border-l-8 ${statusColors[status]} rounded shadow-md p-4 mb-4 mx-auto max-w-xl`}>
      <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800">
        <ClipboardList size={20} className="text-indigo-500" />
        {title}
      </h3>

      <p className="text-gray-600 flex items-center gap-2 mt-1">
        <FileText size={18} className="text-gray-400" />
        {description || <span className="italic text-sm">Sin descripción</span>}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Fecha límite:{" "}
        {dueDate
          ? new Date(dueDate).toLocaleDateString("es-BO", {
              timeZone: "UTC",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Sin fecha límite"}
      </p>

      <div className="mt-3">
        <div className="flex items-center justify-between">
          {/* Etiqueta + Select */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold flex items-center gap-1 text-gray-700">
              <Info size={16} className="text-blue-500" />
              Estado:
            </label>

            <Listbox
              value={newStatus}
              onChange={(value) => {
                setNewStatus(value);
                if (value !== status) onStatusChange(id, value);
              }}
              disabled={status === 'completada'}
            >
              <div className="relative w-48">
                <Listbox.Button
                  className={`w-full p-2 flex items-center gap-2 border border-gray-300 rounded text-left ${selectedOption?.color || 'bg-gray-100'}`}
                >
                  {selectedOption && <selectedOption.icon size={16} className="text-gray-600" />}
                  <span className="capitalize">{selectedOption?.label}</span>
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-200 rounded shadow z-10">
                  {statusOptions.map(({ label, icon: Icon }) => (
                    <Listbox.Option
                      key={label}
                      value={label}
                      disabled={!isAllowed(status, label)}
                      className={({ active }) =>
                        `flex items-center gap-2 p-2 cursor-pointer capitalize ${
                          active ? 'bg-gray-200' : ''
                        } ${!isAllowed(status, label) ? 'opacity-50 cursor-not-allowed' : ''}`
                      }
                    >
                      <Icon size={16} className="text-gray-600" />
                      {label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded"
              title="Editar"
            >
              <Pencil size={20} className="text-white" />
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-600 p-2 rounded"
              title="Eliminar"
            >
              <Trash2 size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}