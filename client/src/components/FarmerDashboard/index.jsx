import React, { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import Loading from "../Loading";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, monthly: [] });
  const [profile, setProfile] = useState({ name: '', email: '', phoneNumber: '', address: '' });
  const farmerId = localStorage.getItem('id');

  useEffect(() => {
    if (!farmerId) return;
    Promise.all([
      apiClient.get(`/reporting/farmer/${farmerId}`),
      apiClient.get(`/users/${farmerId}`)
    ]).then(([r1, r2]) => {
      setStats(r1.data || { totalRevenue: 0, totalOrders: 0, monthly: [] });
      setProfile(r2.data?.user || profile);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [farmerId]);

  const saveProfile = () => {
    apiClient.patch(`/users/${farmerId}`, profile).then((res) => setProfile(res.data.user)).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col items-center p-6 relative">
      {loading && <div className="absolute inset-0 z-10 bg-white/70"><Loading /></div>}
      <h1 className="text-2xl font-bold mb-6">Karshak</h1>
      <h2 className="text-xl font-semibold mb-6 self-start">Farmer Dashboard</h2>

      <div className="grid gap-6 w-full max-w-4xl md:grid-cols-2">
        <div className="bg-white shadow-md rounded-2xl p-6 border">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h3 className="text-3xl font-bold mt-2">₹ {Number(stats.totalRevenue || 0).toFixed(2)}</h3>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 border">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h3 className="text-3xl font-bold mt-2">{stats.totalOrders}</h3>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-6 bg-white border rounded-2xl p-6">
        <p className="text-sm text-gray-500 mb-3">Monthly Revenue</p>
        <div className="space-y-2">
          {stats.monthly.map((m) => (
            <div key={m.month} className="flex justify-between text-sm">
              <span>{m.month}</span>
              <span>₹ {Number(m.total).toFixed(2)}</span>
            </div>
          ))}
          {stats.monthly.length === 0 && <p className="text-xs text-gray-400">No data yet</p>}
        </div>
      </div>

      <div className="w-full max-w-4xl mt-6 bg-white border rounded-2xl p-6">
        <p className="text-sm text-gray-500 mb-3">Edit Profile</p>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="border px-3 py-2 rounded" placeholder="Name" value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <input className="border px-3 py-2 rounded" placeholder="Email" value={profile.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <input className="border px-3 py-2 rounded" placeholder="Phone" value={profile.phoneNumber || ''} onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })} />
          <input className="border px-3 py-2 rounded" placeholder="Address" value={profile.address || ''} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
        </div>
        <button className="mt-3 px-4 py-2 border rounded" onClick={saveProfile}>Save</button>
      </div>
    </div>
  );
};

export default Dashboard;
