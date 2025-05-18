import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error desconocido');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Registro</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="input mb-2 w-full"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="input mb-2 w-full"
          required
        />
        <input
          name="password"
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="input mb-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded"
        >
          Registrarse
        </button>
        <p className="mt-4 text-center">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-500 underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}