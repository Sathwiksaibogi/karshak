// import { useEffect, useMemo, useState } from "react";
// import { FaMoneyBillWave } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { SiPhonepe } from "react-icons/si";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import apiClient from "../../api/axios";
// import Loading from "../Loading";
// import { MdArrowBack } from "react-icons/md"; // Added icon import

// const Payment = () => {
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState(null);
//   const [items, setItems] = useState([]);
//   const [totals, setTotals] = useState(null);
//   const [isPaying, setIsPaying] = useState(false);
//   const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', text: string }

//   useEffect(() => {
//     try {
//       const payload = JSON.parse(localStorage.getItem('karshak_checkout_payload') || 'null');
//       if (payload && Array.isArray(payload.items)) {
//         setItems(payload.items);
//         setTotals(payload.totals);
//       }
//     } catch { }
//   }, []);

//   const buyerId = useMemo(() => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) return null;
//       const base64Url = token.split(".")[1];
//       const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//       const jsonPayload = decodeURIComponent(atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
//       const payload = JSON.parse(jsonPayload);
//       return payload.userId || payload.id || null;
//     } catch {
//       return null;
//     }
//   }, []);

//   const options = [
//     { id: "cod", label: "Cash On Delivery", icon: <FaMoneyBillWave className="text-green-600 text-2xl" /> },
//     { id: "gpay", label: "Google Pay", icon: <FcGoogle className="text-2xl" /> },
//     { id: "phonepe", label: "Phone Pay", icon: <SiPhonepe className="text-purple-600 text-2xl" /> },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="flex flex-col min-h-screen bg-white px-6 py-4 relative"
//     >
//       {isPaying && (
//         <div className="absolute inset-0 z-10 bg-white/70"><Loading /></div>
//       )}
//       {/* Header */}
//       <div className="flex items-center justify-between py-3 border-b">
//         {/* Back Button - REPLACED */}
//         <button
//           onClick={() => navigate(-1)}
//           className="p-2 rounded-full hover:bg-gray-200 transition"
//         >
//           <MdArrowBack className="w-6 h-6 text-gray-700" />
//         </button>
//         <h1 className="text-lg font-semibold">Karshak</h1>
//         <span className="w-5" />
//       </div>

//       {/* Title */}
//       <motion.h2
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         className="text-xl font-semibold text-center mt-6 mb-6"
//       >
//         Payment
//       </motion.h2>

//       {/* Payment Options */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//         className="flex flex-col gap-4"
//       >
//         {options.map((opt) => (
//           <motion.button
//             key={opt.id}
//             whileTap={{ scale: 0.97 }}
//             onClick={() => setSelected(opt.id)}
//             className={`flex items-center gap-3 border rounded-full px-4 py-3 font-medium shadow-sm transition-colors duration-300
//               ${selected === opt.id ? "bg-black text-white" : "bg-white text-black"}
//             `}
//           >
//             {opt.icon}
//             {opt.label}
//           </motion.button>
//         ))}
//       </motion.div>

//       {/* Order Summary */}
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.6 }}
//         className="mt-8 text-sm"
//       >
//         <div className="flex justify-between mb-2">
//           <span>Subtotal ({items.length})</span>
//           <span>₹{Number(totals?.subTotal || 0).toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Shipping total</span>
//           <span>Free</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Taxes</span>
//           <span>₹{Number(totals?.tax || 0).toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between font-semibold text-base mt-2">
//           <span>Total</span>
//           <span>₹{Number(totals?.total || 0).toFixed(2)}</span>
//         </div>
//       </motion.div>

//       {/* Feedback */}
//       {feedback && (
//         <div className={`mt-6 text-sm px-3 py-2 rounded-md ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
//           {feedback.text}
//         </div>
//       )}

//       {/* Pay Button */}
//       <motion.button
//         whileTap={{ scale: 0.97 }}
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6, duration: 0.5 }}
//         disabled={!selected || isPaying}
//         className={`mt-8 w-full py-3 rounded-lg font-medium transition-all duration-300 
//           ${selected && !isPaying ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 text-gray-600 cursor-not-allowed"}
//         `}
//         onClick={async () => {
//           if (!selected || !items.length || !buyerId || isPaying) return;
//           setFeedback(null);
//           setIsPaying(true);
//           try {
//             // Mock payment: simulate async gateway and success
//             await new Promise((resolve) => setTimeout(resolve, 1000));
//             const paymentSuccess = true; // mock response

//             if (!paymentSuccess) {
//               setFeedback({ type: 'error', text: 'Payment failed. Please try another method.' });
//               setIsPaying(false);
//               return;
//             }

//             // Create separate order per item to associate with correct farmer
//             for (const it of items) {
//               const payload = it.type === 'rental'
//                 ? {
//                   buyerId,
//                   machineryId: it.id,
//                   quantity: it.quantity,
//                   paymentMethod: selected,
//                   duration: it.duration,
//                   pricingType: it.pricingType,
//                   startDate: it.startDate || null,
//                   endDate: it.endDate || null,
//                   taxPct: totals?.taxPct ?? 0,
//                   discountPct: totals?.discountPct ?? 0,
//                 }
//                 : {
//                   buyerId,
//                   productId: it.id,
//                   quantity: it.quantity,
//                   paymentMethod: selected,
//                   taxPct: totals?.taxPct ?? 0,
//                   discountPct: totals?.discountPct ?? 0,
//                 };
//               await apiClient.post('/orders', payload);
//             }

//             // Remove purchased items from cart; keep others
//             try {
//               const CART_KEY = 'karshak_cart_v1';
//               const existing = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
//               const purchasedIds = new Set(items.map((it) => it.id));
//               const remaining = existing.filter((it) => !purchasedIds.has(it.id));
//               localStorage.setItem(CART_KEY, JSON.stringify(remaining));
//             } catch { }
//             // Clear checkout payload
//             localStorage.removeItem('karshak_checkout_payload');
//             setFeedback({ type: 'success', text: 'Payment successful! Your order has been placed.' });
//           } catch (e) {
//             console.error(e);
//             setFeedback({ type: 'error', text: 'Something went wrong while placing your order.' });
//           } finally {
//             setIsPaying(false);
//           }
//         }}
//       >
//         {isPaying ? 'Processing...' : (selected ? `Pay with ${options.find((o) => o.id === selected)?.label}` : 'Select a Payment Option')}
//       </motion.button>
//     </motion.div>
//   );
// };

// export default Payment;


import React, { useEffect, useMemo, useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiPhonepe } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "../../api/axios";
import Loading from "../Loading";
import { MdArrowBack } from "react-icons/md";

const Payment = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState([]);
  const [totals, setTotals] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', text: string }

  useEffect(() => {
    try {
      const payload = JSON.parse(localStorage.getItem('karshak_checkout_payload') || 'null');
      if (payload && Array.isArray(payload.items)) {
        setItems(payload.items);
        setTotals(payload.totals);
      }
    } catch { }
  }, []);

  const buyerId = useMemo(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
      const payload = JSON.parse(jsonPayload);
      return payload.userId || payload.id || null;
    } catch {
      return null;
    }
  }, []);

  const options = [
    { id: "cod", label: "Cash On Delivery", icon: <FaMoneyBillWave className="text-green-600 text-2xl" /> },
    { id: "gpay", label: "Google Pay", icon: <FcGoogle className="text-2xl" /> },
    { id: "phonepe", label: "Phone Pay", icon: <SiPhonepe className="text-purple-600 text-2xl" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col min-h-screen bg-white px-6 py-4 relative"
    >
      {isPaying && (
        <div className="absolute inset-0 z-10 bg-white/70"><Loading /></div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between py-3 border-b">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <MdArrowBack className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold">Karshak</h1>
        <span className="w-5" />
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-xl font-semibold text-center mt-6 mb-6"
      >
        Payment
      </motion.h2>

      {/* Payment Options */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected(opt.id)}
            className={`flex items-center gap-3 border rounded-full px-4 py-3 font-medium shadow-sm transition-colors duration-300
              ${selected === opt.id ? "bg-black text-white" : "bg-white text-black"}
            `}
          >
            {opt.icon}
            {opt.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-8 text-sm"
      >
        <div className="flex justify-between mb-2">
          <span>Subtotal ({items.length})</span>
          <span>₹{Number(totals?.subTotal || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping total</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Taxes</span>
          <span>₹{Number(totals?.tax || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base mt-2">
          <span>Total</span>
          <span>₹{Number(totals?.total || 0).toFixed(2)}</span>
        </div>
      </motion.div>

      {/* Feedback */}
      {feedback && (
        <div className={`mt-6 text-sm px-3 py-2 rounded-md ${feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {feedback.text}
        </div>
      )}

      {/* Pay Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        disabled={!selected || isPaying}
        className={`mt-8 w-full py-3 rounded-lg font-medium transition-all duration-300 
          ${selected && !isPaying ? "bg-black text-white hover:bg-gray-800" : "bg-gray-300 text-gray-600 cursor-not-allowed"}
        `}
        onClick={async () => {
          if (!selected || !items.length || !buyerId || isPaying) return;
          setFeedback(null);
          setIsPaying(true);
          try {
            // Mock payment: simulate async gateway and success
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const paymentSuccess = true; // mock response

            if (!paymentSuccess) {
              setFeedback({ type: 'error', text: 'Payment failed. Please try another method.' });
              setIsPaying(false);
              return;
            }

            // Create separate order per item to associate with correct farmer
            for (const it of items) {
              const payload = it.type === 'rental'
                ? {
                  buyerId,
                  machineryId: it.id,
                  quantity: it.quantity,
                  paymentMethod: selected,
                  duration: it.duration,
                  pricingType: it.pricingType,
                  startDate: it.startDate || null,
                  endDate: it.endDate || null,
                  taxPct: totals?.taxPct ?? 0,
                  discountPct: totals?.discountPct ?? 0,
                }
                : {
                  buyerId,
                  productId: it.id,
                  quantity: it.quantity,
                  paymentMethod: selected,
                  taxPct: totals?.taxPct ?? 0,
                  discountPct: totals?.discountPct ?? 0,
                };
              await apiClient.post('/orders', payload);
            }

            // Remove purchased items from cart; keep others
            try {
              const CART_KEY = 'karshak_cart_v1';
              const existing = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
              const purchasedIds = new Set(items.map((it) => it.id));
              const remaining = existing.filter((it) => !purchasedIds.has(it.id));
              localStorage.setItem(CART_KEY, JSON.stringify(remaining));
            } catch { }
            
            // ✅ UPDATED SECTION FOR REDIRECTION
            localStorage.removeItem('karshak_checkout_payload');
            setFeedback({ type: 'success', text: 'Payment successful! Redirecting to your orders...' });

            // Navigate after a 2-second delay
            setTimeout(() => {
                navigate('/Myorders', { replace: true });
            }, 2000);

          } catch (e) {
            console.error(e);
            setFeedback({ type: 'error', text: 'Something went wrong while placing your order.' });
            setIsPaying(false);
          } finally {
            // Note: We leave setIsPaying(false) here. If an error occurs before navigation,
            // the button will become active again. If success, the component unmounts.
            if (feedback?.type !== 'success') {
                setIsPaying(false);
            }
          }
        }}
      >
        {isPaying ? 'Processing...' : (selected ? `Pay with ${options.find((o) => o.id === selected)?.label}` : 'Select a Payment Option')}
      </motion.button>
    </motion.div>
  );
};

export default Payment;