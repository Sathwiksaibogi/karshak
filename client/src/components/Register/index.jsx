// import { Link, useNavigate } from 'react-router-dom'; 
// import apiClient from '../../api/axios';

// const Register = () => {
//     const navigate = useNavigate(); 

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const roleInput = e.target.role.value;
//         const newUser = {
//             name: e.target.name.value,
//             email: e.target.email.value,
//             password: e.target.password.value,
//             phoneNumber: Number(e.target.phone.value),
//             address: e.target.address.value,
//             role: roleInput.includes(',')
//                 ? roleInput.split(',').map(r => r.trim()).filter(Boolean)
//                 : [roleInput.trim()],
//         }
//         apiClient.post('/auth/register', newUser)
//         .then(res => {
//             console.log(res)
//             console.log(res.data)
//             navigate('/login') 
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }
//  return (
//     <div className="signup-container">      
//         <h1>Signup</h1>
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="name" placeholder="Name" />
//             <input type="email" name="email" placeholder="Email" />
//             <input type="password" name="password" placeholder="Password" />
//             <input type="tel" name="phone" placeholder="Phone" /> 
//             <input type="text" name="address" placeholder="Address" /> 
//             <input type="text" name="role" placeholder="Role" />
//             <button type="submit">Signup</button>
//         </form>
//         <p>Already have an account? <Link to="/login">Login</Link></p>
//     </div>
//   )
// }

// export default Register


import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading';

const Register = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedRoles, setSelectedRoles] = useState(['BUYER']);

  // no product names needed in Register component

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const newUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phoneNumber: String(e.target.phone.value || '').trim(),
      address: e.target.address.value,
      role: selectedRoles,
    };
    apiClient
      .post('/auth/register', newUser)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        setError(err?.response?.data?.message || 'Registration failed. Please try again.');
      })
      .finally(() => setSubmitting(false));
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

      {/* Signup Section */}
      <div className="w-full max-w-xs">
        <h2 className="text-lg font-semibold text-center mb-1">
          Create an account
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Fill in the details to register
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white shadow-md rounded-xl px-6 py-8"
        >
          {error && (
            <div className="mb-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">{error}</div>
          )}
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <div className="mb-6">
            <label className="block text-sm mb-1">Role</label>
            <select
              multiple
              value={selectedRoles}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, o => o.value);
                if (values.includes('BOTH')) {
                  setSelectedRoles(['BUYER','FARMER']);
                } else {
                  setSelectedRoles(values);
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="BUYER">Buyer</option>
              <option value="FARMER">Farmer</option>
              <option value="BOTH">Both (Buyer + Farmer)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full text-white py-3 rounded-lg font-medium transition-all duration-200 ${submitting ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}`}
          >
            {submitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Already have an account? {" "}
          <Link
            to="/login"
            className="font-medium text-black hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
