import { useState } from "react";
// The FaArrowLeft import has been removed as it is no longer needed.
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';

import apiClient from "../../api/axios";

export default function OrdersDelivered({ orders }) {
  const [expandedId, setExpandedId] = useState(null);
  const { t } = useTranslation();

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter only updated orders
  const filteredOrders = orders.filter(
    (order) => order.status === "Delivered" || order.status === "In Progress"
  );

  return (
    <div className="flex flex-col bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-center px-4 py-3 border-b">
        {/* The arrow icon has been removed and the title is now centered. */}
        <h1 className="text-lg font-semibold">{t('Delivered')}</h1>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-4 px-4 mt-4">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-400">{t('noOrders')}</p>
        ) : (
          filteredOrders.map((order) => {
            const isExpanded = expandedId === order.id;

            return (
              <motion.div
                key={order.id}
                layout
                onClick={() => toggleExpand(order.id)}
                className="px-4 py-3 border rounded-2xl shadow-md cursor-pointer bg-white"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Order no: {order.id}</p>
                  <div className="flex flex-col items-end text-xs text-gray-500">
                    <span>{order.status}</span>
                    <span>{order.time}</span>
                  </div>
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="mt-3 text-sm text-gray-700 overflow-hidden"
                    >
                      {(order.items || []).map((it) => (
                        <div key={it.id} className="flex items-center gap-3 mb-2">
                          {it.type === 'rental' ? (
                            it.machinery?.imageUrl ? (
                              <img src={it.machinery.imageUrl} alt={it.machinery?.name} className="w-12 h-12 rounded-md object-cover" />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded-md" />
                            )
                          ) : (
                            it.product?.imageUrl ? (
                              <img src={it.product.imageUrl} alt={it.product?.name} className="w-12 h-12 rounded-md object-cover" />
                            ) : (
                              <div className="w-12 h-12 bg-gray-200 rounded-md" />
                            )
                          )}
                          <div className="flex-1">
                            <p className="font-semibold">
                              {it.type === 'rental' ? it.machinery?.name : it.product?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {it.type === 'rental' ? `${t('duration')}: ${it.duration} ${it.pricingType}` : `${t('quantityShort')}: ${it.quantity}`}
                            </p>
                            {typeof it.price === 'number' && (
                              <p className="text-xs">{t('price')}: ₹{Number(it.price).toFixed(2)}</p>
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full ${it.type === 'rental' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                              {it.type === 'rental' ? t('rental') : t('product')}
                            </span>
                          </div>
                        </div>
                      ))}

                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="font-semibold">{t('buyerLabel')}</p>
                          <p>Name: {order.buyer?.name || '-'}</p>
                          {order.buyer?.phoneNumber !== undefined && <p>Phone: {order.buyer.phoneNumber}</p>}
                          {order.buyer?.address && <p>Address: {order.buyer.address}</p>}
                        </div>
                        <div>
                          <p className="font-semibold">{t('farmerLabel')}</p>
                          <p>Name: {order.items?.[0]?.product?.farmer?.name || order.items?.[0]?.machinery?.farmer?.name || '-'}</p>
                          {(order.items?.[0]?.product?.farmer?.phoneNumber || order.items?.[0]?.machinery?.farmer?.phoneNumber) !== undefined &&
                            <p>Phone: {order.items[0].product?.farmer?.phoneNumber || order.items[0].machinery?.farmer?.phoneNumber}</p>}
                          {(order.items?.[0]?.product?.farmer?.address || order.items?.[0]?.machinery?.farmer?.address) &&
                            <p>Address: {order.items[0].product?.farmer?.address || order.items[0].machinery?.farmer?.address}</p>}
                        </div>
                      </div>

                      <div className="mt-3 flex justify-end">
                        <button
                          className="px-3 py-1 text-xs border rounded-full hover:bg-gray-50"
                          onClick={() => {
                            apiClient.delete(`/orders/${order.id}/delivered`).then(() => {
                              // Optimistic removal – rely on parent refresh or page reload in real app
                              window.location.reload();
                            }).catch(() => {});
                          }}
                        >
                          Delete This Delivery
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

