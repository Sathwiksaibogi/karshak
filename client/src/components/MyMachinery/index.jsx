import { useEffect, useState } from 'react';
import apiClient from '../../api/axios';
import Loading from '../Loading';

const MyMachinery = () => {
  const [machinery, setMachinery] = useState([]);
  const [loading, setLoading] = useState(true);
  const farmerId = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get(`/machinery/mine/${farmerId}`);
        setMachinery(res.data.machinery || []);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    if (farmerId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [farmerId]);

  const handleChange = (id, field, value) => {
    setMachinery(prev =>
      prev.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const saveMachinery = async (m) => {
    try {
      const payload = {
        name: m.name,
        description: m.description,
        price: Number(m.price),
        pricingType: m.pricingType,
        quantity: Number(m.quantity),
        isAvailable: m.isAvailable,
      };
      const res = await apiClient.patch(`/machinery/${m.id}`, payload);
      setMachinery(prev => prev.map(x => (x.id === m.id ? res.data.machinery : x)));
      alert('Machinery saved successfully!');
    } catch (e) {
      console.log(e);
      alert('Failed to save machinery. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen relative">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Machinery</h1>
        
        <div className="space-y-6">
          {machinery.map(m => (
            <div key={m.id} className="bg-white border border-slate-200 rounded-xl shadow-sm transition-shadow hover:shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Machinery Image */}
                  {m.imageUrl && (
                    <img
                      src={m.imageUrl}
                      alt={m.name}
                      className="w-full sm:w-32 h-32 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  
                  {/* Machinery Main Info */}
                  <div className="flex-grow w-full">
                    {/* Machinery Name */}
                    <div>
                      <label htmlFor={`name-${m.id}`} className="block text-sm font-medium text-slate-600">Machinery Name</label>
                      <input
                        id={`name-${m.id}`}
                        className="mt-1 block w-full text-xl font-semibold text-slate-900 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        value={m.name || ''}
                        onChange={(e) => handleChange(m.id, 'name', e.target.value)}
                      />
                    </div>

                    {/* Pricing Type */}
                    <div className="mt-4">
                      <label htmlFor={`pricingType-${m.id}`} className="block text-sm font-medium text-slate-600">Pricing Type</label>
                      <select
                        id={`pricingType-${m.id}`}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        value={m.pricingType || ''}
                        onChange={(e) => handleChange(m.id, 'pricingType', e.target.value)}
                      >
                        <option value="hourly">Per Hour</option>
                        <option value="daily">Per Day</option>
                        <option value="halfday">Half Day</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Machinery Details Grid */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Description */}
                  <div className="md:col-span-2">
                    <label htmlFor={`description-${m.id}`} className="block text-sm font-medium text-slate-600">Description</label>
                    <textarea
                      id={`description-${m.id}`}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                      rows={3}
                      value={m.description || ''}
                      onChange={(e) => handleChange(m.id, 'description', e.target.value)}
                    />
                  </div>
                  
                  {/* Price */}
                  <div>
                    <label htmlFor={`price-${m.id}`} className="block text-sm font-medium text-slate-600">Price (₹)</label>
                    <input
                      id={`price-${m.id}`}
                      type="number"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                      value={m.price}
                      onChange={(e) => handleChange(m.id, 'price', e.target.value)}
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label htmlFor={`quantity-${m.id}`} className="block text-sm font-medium text-slate-600">Quantity</label>
                    <input
                      id={`quantity-${m.id}`}
                      type="number"
                      min="1"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                      value={m.quantity}
                      onChange={(e) => handleChange(m.id, 'quantity', e.target.value)}
                    />
                  </div>

                  {/* Availability */}
                  <div>
                    <label htmlFor={`isAvailable-${m.id}`} className="block text-sm font-medium text-slate-600">Availability</label>
                    <select
                      id={`isAvailable-${m.id}`}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                      value={m.isAvailable ? 'true' : 'false'}
                      onChange={(e) => handleChange(m.id, 'isAvailable', e.target.value === 'true')}
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    className="bg-slate-900 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                    onClick={() => saveMachinery(m)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty State */}
          {machinery.length === 0 && !loading && (
            <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-xl">
              <p className="text-slate-500">No machinery found.</p>
              <p className="text-sm text-slate-400 mt-2">You can add new machinery from your dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMachinery;
