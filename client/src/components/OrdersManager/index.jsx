import { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import OrdersReceived from "./OrdersReceived";
import OrdersDelivered from "./OrdersDelivered";
import Loading from "../Loading";
import { useTranslation } from 'react-i18next';

export default function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const farmerId = (() => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
        const payload = JSON.parse(jsonPayload);
        return payload.userId || payload.id || null;
      } catch { return null; }
    })();
    if (!farmerId) return;
    apiClient.get(`/orders/farmer/${farmerId}`).then((res) => {
      const fetched = (res.data?.orders || []).map((o) => ({
        id: o.id,
        status: o.status,
        time: new Date(o.createdAt).toLocaleTimeString(),
        seen: o.status !== 'Pending',
        items: o.items,
        buyer: o.buyer,
      }));
      setOrders(fetched);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const updateOrderStatus = (id, newStatus) => {
    apiClient.patch(`/orders/${id}/status`, { status: newStatus }).then(() => {
      setOrders((prev) => prev.map((order) => order.id === id ? { ...order, status: newStatus, seen: true } : order));
    }).catch(() => {});
  };

  // 👇 separate orders into two lists
  const receivedOrders = orders.filter(
    (o) => o.status === "Pending" || o.status === "In Progress"
  );
  const deliveredOrders = orders.filter((o) => o.status === "Delivered");

  return (
    <div className="flex flex-col min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 z-10 bg-white/70">
          <Loading />
        </div>
      )}
      <OrdersReceived orders={receivedOrders} updateOrderStatus={updateOrderStatus} />
      <OrdersDelivered orders={deliveredOrders} />
      {deliveredOrders.length > 0 && (
        <div className="p-4">
          <button
            className="px-4 py-2 text-sm border rounded-full hover:bg-gray-50"
            onClick={async () => {
              try {
                await Promise.all(deliveredOrders.map((o) => apiClient.delete(`/orders/${o.id}/delivered`)));
                window.location.reload();
              } catch {}
            }}
          >
            Clear Delivered History
          </button>
        </div>
      )}
    </div>
  );
}
