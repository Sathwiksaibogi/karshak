
import apiClient from '../../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../Loading';

const Login = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    apiClient
      .post('/auth/login', {
        phoneNumber: String(e.target.phone.value || '').trim(),
        password: e.target.password.value,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('id', res.data.user.id);
        try {
          localStorage.setItem('roles', JSON.stringify(res.data.user.role || []));
        } catch {
          /* no-op */
        }
        const rolePath = (res.data.user.role?.[0] || '').toLowerCase();
        navigate(`/${rolePath}`);
      })
      .catch((err) => {
        console.log(err);
        setError(err?.response?.data?.message || 'Login failed. Please check your credentials.');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 relative">
      {submitting && (
        <div className="absolute inset-0 z-10 bg-white/70">
          <Loading />
        </div>
      )}
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-10">Karshak</h1>

      {/* Login Section */}
      <div className="w-full max-w-xs">
        <h2 className="text-lg font-semibold text-center mb-1">Welcome Back</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your details to continue
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white shadow-md rounded-xl px-6 py-8"
        >
          {error && (
            <div className="mb-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">{error}</div>
          )}
          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full text-white py-3 rounded-lg font-medium transition-all duration-200 ${submitting ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}`}
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="font-medium cursor-pointer text-black hover:underline">
            <span className="font-medium cursor-pointer text-black hover:underline">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;



