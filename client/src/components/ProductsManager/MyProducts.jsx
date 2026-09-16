import { useEffect, useState } from 'react';
import Loading from '../Loading';
import apiClient from '../../api/axios';

// Note: NavigationFooter import was removed as it wasn't used in the provided JSX.
// You can add it back if needed for your complete layout.

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const farmerId = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get(`/products/mine/${farmerId}`);
        setProducts(res.data.products || []);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    if (farmerId) {
      fetchData();
    } else {
      // If no farmerId, don't show loading forever
      setLoading(false);
    }
  }, [farmerId]);

  const handleChange = (id, field, value) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const saveProduct = async (p) => {
    try {
      const payload = {
        name: p.name,
        description: p.description,
        price: Number(p.price),
        stock: Number(p.stock),
        category: p.category,
      };
      const res = await apiClient.patch(`/products/${p.id}`, payload);
      // Sync with server result to get the most updated data
      setProducts(prev => prev.map(x => (x.id === p.id ? res.data.product : x)));
      alert('Product saved successfully!');
    } catch (e) {
      console.log(e);
      alert('Failed to save product. Please try again.');
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
        <h1 className="text-3xl font-bold text-slate-800 mb-4">My Products</h1>
        <div className="mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search my products"
            className="w-full max-w-md border rounded-full px-4 py-2 text-sm"
          />
        </div>
        
        <div className="space-y-6">
          {products
            .filter(p => (p.name || '').toLowerCase().includes(query.trim().toLowerCase()))
            .map(p => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-xl shadow-sm transition-shadow hover:shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Product Image */}
                  {p.imageUrl && (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full sm:w-32 h-32 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  
                  {/* Product Main Info */}
                  <div className="flex-grow w-full">
                    {/* Product Name */}
                    <div>
                      <label htmlFor={`name-${p.id}`} className="block text-sm font-medium text-slate-600">Product Name</label>
                      <input
                        id={`name-${p.id}`}
                        className="mt-1 block w-full text-xl font-semibold text-slate-900 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        value={p.name || ''}
                        onChange={(e) => handleChange(p.id, 'name', e.target.value)}
                      />
                    </div>

                    {/* Product Category */}
                    <div className="mt-4">
                      <label htmlFor={`category-${p.id}`} className="block text-sm font-medium text-slate-600">Category</label>
                      <input
                        id={`category-${p.id}`}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        value={p.category || ''}
                        onChange={(e) => handleChange(p.id, 'category', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details Grid */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Description */}
                  <div className="md:col-span-2">
                    <label htmlFor={`description-${p.id}`} className="block text-sm font-medium text-slate-600">Description</label>
                    <textarea
                      id={`description-${p.id}`}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                      rows={3}
                      value={p.description || ''}
                      onChange={(e) => handleChange(p.id, 'description', e.target.value)}
                    />
                  </div>
                  
                  {/* Price */}
                  <div>
                    <label htmlFor={`price-${p.id}`} className="block text-sm font-medium text-slate-600">Price ($)</label>
                    <input
                      id={`price-${p.id}`}
                      type="number"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                      value={p.price}
                      onChange={(e) => handleChange(p.id, 'price', e.target.value)}
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label htmlFor={`stock-${p.id}`} className="block text-sm font-medium text-slate-600">Stock (Units)</label>
                    <input
                      id={`stock-${p.id}`}
                      type="number"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                      value={p.stock}
                      onChange={(e) => handleChange(p.id, 'stock', e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    className="bg-slate-900 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
                    onClick={() => saveProduct(p)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty State */}
          {products.length === 0 && !loading && (
            <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-xl">
              <p className="text-slate-500">No products found.</p>
              <p className="text-sm text-slate-400 mt-2">You can add new products from your dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;