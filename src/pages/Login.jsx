import { useState, useContext } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      await axios.get('/auth/me').then(({ data }) => setUser(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error desconocido');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
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
          Entrar
        </button>
        <p className="mt-4 text-center">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-blue-500 underline">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}