import { useEffect, useMemo, useState } from "react";
import { FaTrashAlt, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../../api/axios";
import Loading from "../Loading";
import BuyerNavigationFooter from "../BuyerNavigationFooter";
import { useTranslation } from 'react-i18next';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const buyerId = useMemo(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
      const payload = JSON.parse(jsonPayload);
      return payload.userId || payload.id || null;
    } catch { return null; }
  }, []);

  useEffect(() => {
    if (!buyerId) return;
    setLoading(true);
    apiClient.get(`/orders/buyer/${buyerId}`)
      .then((res) => {
        const list = (res.data?.orders || []).map((o) => ({
          id: o.id,
          status: o.status,
          time: new Date(o.createdAt).toLocaleString(),
          items: o.items?.map((it) => ({
            id: it.id,
            type: it.type,
            name: it.type === 'rental' ? it.machinery?.name : it.product?.name,
            quantity: it.quantity,
            duration: it.duration,
            pricingType: it.pricingType,
            price: it.price,
            imageUrl: it.type === 'rental' ? it.machinery?.imageUrl : it.product?.imageUrl,
            productId: it.productId,
            machinery: it.machinery || null,
            product: it.product || null,
            farmer: it.product?.farmer || it.machinery?.farmer || null,
          })) || [],
          total: o.total,
          buyer: { id: o.buyerId },
        }));
        setOrders(list);
        setError(null);
      })
      .catch(() => setError('Failed to fetch orders'))
      .finally(() => setLoading(false));
  }, [buyerId]);

  const removeOrder = (orderId) => {
    apiClient.delete(`/orders/${orderId}`)
      .then(() => setOrders((prev) => prev.filter((o) => o.id !== orderId)))
      .catch(() => {});
  };

  const buyAgain = (productId) => {
    if (!productId) return;
    navigate(`/product/${productId}`);
  };

  const filteredOrders = orders.filter((o) => {
    const term = query.trim().toLowerCase();
    if (!term) return true;
    const inId = o.id.toLowerCase().includes(term);
    const inItems = o.items.some((it) => (it.name || '').toLowerCase().includes(term));
    const inStatus = (o.status || '').toLowerCase().includes(term);
    return inId || inItems || inStatus;
  });

  let orderCount=0;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {loading && (
        <div className="absolute inset-0 z-20 bg-white/70">
          <Loading />
        </div>
      )}
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <span className="w-5 h-5" />
        <h1 className="text-lg font-semibold">{t('My Orders')}</h1>
        <span className="w-5 h-5" />
      </header>

      {/* Main content area that grows and becomes scrollable */}
      <main className="flex-1 px-4 py-4">
        <div className="mb-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchProducts')}
            className="w-full border rounded-full px-4 py-2 text-sm"
          />
        </div>
        {/* Conditional rendering based on loading, error, or data state */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-400">{t('noOrders')}</p>
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  className="px-4 py-3 border rounded-2xl shadow-sm bg-white"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Order no: {++orderCount}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                        {order.status === 'Delivered' ? t('delivered') : order.status === 'In Progress' ? t('inProgress') : t('pending')}
                      </span>
                      <button onClick={() => removeOrder(order.id)} className="text-red-500" title="Remove order">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    {order.items.map((it) => (
                      <div key={it.id} className="flex items-center gap-3">
                        {it.type === 'rental' ? (
                          it.machinery?.imageUrl ? (
                            <img src={it.machinery.imageUrl} alt={it.machinery?.name} className="w-12 h-12 object-cover rounded-md" />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-md" />
                          )
                        ) : (
                          it.product?.imageUrl ? (
                            <img src={it.product.imageUrl} alt={it.product?.name} className="w-12 h-12 object-cover rounded-md" />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-md" />
                          )
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {it.type === 'rental' ? it.machinery?.name : it.product?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {it.type === 'rental' ? `${t('duration')}: ${it.duration} ${it.pricingType}` : `${t('quantityShort')}: ${it.quantity}`}
                          </p>
                          {(it.farmer?.name || it.machinery?.farmer?.name) && (
                            <p className="text-xs text-gray-500">
                              Farmer: {it.farmer?.name || it.machinery?.farmer?.name}
                              {(it.farmer?.phoneNumber || it.machinery?.farmer?.phoneNumber) !== undefined ?
                                ` · ${it.farmer?.phoneNumber || it.machinery?.farmer?.phoneNumber}` : ''}
                            </p>
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full ${it.type === 'rental' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                            {it.type === 'rental' ? t('rental') : t('product')}
                          </span>
                        </div>
                        <div className="text-sm font-semibold">₹{Number(it.price * (it.quantity || it.duration || 1)).toFixed(2)}</div>
                        {it.type === 'product' && (
                          <button
                            className="ml-2 text-xs px-3 py-1 rounded-full border hover:bg-gray-50 flex items-center gap-1"
                            onClick={() => buyAgain(it.productId)}
                            title="Buy Again"
                          >
                            <FaShoppingBag /> Buy Again
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-right text-sm font-semibold">{t('total')}: ₹{Number(order.total).toFixed(2)}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* This footer will now stick to the bottom of the screen */}
      <footer className="sticky bottom-0 z-10 bg-white">
        <BuyerNavigationFooter />
      </footer>
    </div>
  );
}