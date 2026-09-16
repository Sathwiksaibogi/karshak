import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import apiClient from "../../api/axios";
import Loading from "../Loading";
import BuyerNavigationFooter from "../BuyerNavigationFooter";

const MachineryRentals = () => {
  const [machinery, setMachinery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get('/machinery/all').then((res) => {
      setMachinery(res.data?.machinery || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filteredMachinery = machinery
    .filter((m) => Number(m.quantity) > 0 && m.isAvailable !== false)
    .filter((m) => (m.name || '').toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative">
      {loading && (
        <div className="absolute inset-0 z-10 bg-white/70">
          <Loading />
        </div>
      )}
      
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-md z-20">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <MdArrowBack className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold">Karshak</h1>
          <div className="w-8" />
        </div>

        {/* Search */}
        <div className="px-4 pb-3 bg-white">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 shadow-sm">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search machinery"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Category Title */}
      <h2 className="px-4 mt-4 text-xl font-bold">Machinery Rentals</h2>

      {/* Machinery List */}
      <div className="flex flex-col gap-5 px-4 mt-3">
        {filteredMachinery.map((m) => (
          <div
            key={m.id}
            onClick={() => navigate(`/machinery-details/${m.id}`)}
            className="flex items-center gap-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.01] p-4 cursor-pointer"
          >
            <img
              src={m.imageUrl || "https://via.placeholder.com/96x96?text=Machinery"}
              alt={m.name}
              className="w-24 h-24 rounded-xl object-cover shadow-md"
            />
            <div className="text-left flex-1">
              <h2 className="text-lg font-semibold">{m.name}</h2>
              <p className="text-sm text-gray-500">By {m.farmer?.name}</p>
              <p className="text-sm text-gray-500">₹{Number(m.price).toFixed(2)} / {m.pricingType}</p>
              <p className="text-xs text-gray-500">Qty: {m.quantity}</p>
              <p className="text-xs text-gray-400 mt-1">{m.description}</p>
            </div>
            <div className="text-right">
              <span className={`px-2 py-1 rounded-full text-xs ${m.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {m.isAvailable ? 'Available' : 'Rented'}
              </span>
            </div>
          </div>
        ))}
        {filteredMachinery.length === 0 && !loading && (
          <p className="text-center text-gray-400 py-8">No machinery available</p>
        )}
      </div>
      
      <BuyerNavigationFooter />
    </div>
  );
};

export default MachineryRentals;
