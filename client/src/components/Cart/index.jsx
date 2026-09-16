// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MdArrowBack } from "react-icons/md"; // Added icon import
// import BuyerNavigationFooter from "../BuyerNavigationFooter";

// const CART_KEY = 'karshak_cart_v1';

// const Cart = () => {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(CART_KEY);
//       if (raw) setItems(JSON.parse(raw));
//     } catch { }
//   }, []);

//   const save = (next) => {
//     setItems(next);
//     localStorage.setItem(CART_KEY, JSON.stringify(next));
//   };

//   const updateQty = (id, delta) => {
//     const next = items.map((it) => it.id === id ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it);
//     save(next);
//   };

//   const removeItem = (id) => {
//     const next = items.filter((it) => it.id !== id);
//     save(next);
//   };

//   const totals = useMemo(() => {
//     const subTotal = items.reduce((sum, it) => sum + (it.price * it.quantity), 0);
//     const taxPct = 5;
//     const discountPct = 0;
//     const tax = (taxPct / 100) * subTotal;
//     const discount = (discountPct / 100) * subTotal;
//     const total = subTotal + tax - discount;
//     return { subTotal, taxPct, tax, discountPct, discount, total };
//   }, [items]);

//   const proceedToPay = () => {
//     localStorage.setItem('karshak_checkout_payload', JSON.stringify({ items, totals }));
//     navigate('/payment');
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <div className="flex items-center justify-between px-4 py-3 border-b">
//         {/* Back Button - REPLACED */}
//         <button
//           onClick={() => navigate(-1)}
//           className="p-2 rounded-full hover:bg-gray-200 transition"
//         >
//           <MdArrowBack className="w-6 h-6 text-gray-700" />
//         </button>
//         <h1 className="text-lg font-semibold">Cart</h1>
//         <span className="w-5" />
//       </div>

//       <div className="p-4 flex-1">
//         {items.length === 0 ? (
//           <p className="text-center text-gray-500">Your cart is empty</p>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {items.map((it) => (
//               <div key={it.id} className="flex items-center justify-between p-3 border rounded-xl shadow-sm">
//                 <div className="flex items-center gap-3">
//                   <img src={it.imageUrl} alt={it.name} className="w-16 h-16 rounded-lg object-cover" />
//                   <div>
//                     <p className="font-semibold">{it.name}</p>
//                     <p className="text-sm text-gray-500">₹{it.price}</p>
//                     <p className="text-xs text-gray-500">Farmer: {it.farmer?.name || '—'}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button className="px-2" onClick={() => updateQty(it.id, -1)}>-</button>
//                   <span>{it.quantity}</span>
//                   <button className="px-2" onClick={() => updateQty(it.id, 1)}>+</button>
//                   <button className="ml-4 text-red-500" onClick={() => removeItem(it.id)}>Remove</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {items.length > 0 && (
//         <div className="p-4 border-t">
//           <div className="flex justify-between text-sm">
//             <span>Subtotal</span>
//             <span>₹{totals.subTotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Taxes ({totals.taxPct}%)</span>
//             <span>₹{totals.tax.toFixed(2)}</span>
//           </div>
//           {totals.discountPct > 0 && (
//             <div className="flex justify-between text-sm">
//               <span>Discount ({totals.discountPct}%)</span>
//               <span>-₹{totals.discount.toFixed(2)}</span>
//             </div>
//           )}
//           <div className="flex justify-between font-semibold mt-2">
//             <span>Total</span>
//             <span>₹{totals.total.toFixed(2)}</span>
//           </div>
//           <button className="mt-3 w-full py-2 bg-black text-white rounded-lg" onClick={proceedToPay}>
//             Proceed to Payment
//           </button>
//         </div>
//       )}
//       <div className="fixed bottom-0 left-0 right-0">
//         <BuyerNavigationFooter />
//       </div>
//     </div>
//   );
// };

// export default Cart;


import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import BuyerNavigationFooter from "../BuyerNavigationFooter";

const CART_KEY = 'karshak_cart_v1';

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch { }
  }, []);

  const save = (next) => {
    setItems(next);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
  };

  const updateQty = (id, delta) => {
    const next = items.map((it) => it.id === id ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it);
    save(next);
  };

  const removeItem = (id) => {
    const next = items.filter((it) => it.id !== id);
    save(next);
  };

  const totals = useMemo(() => {
    const subTotal = items.reduce((sum, it) => sum + (it.price * it.quantity), 0);
    const taxPct = 5;
    const discountPct = 0;
    const tax = (taxPct / 100) * subTotal;
    const discount = (discountPct / 100) * subTotal;
    const total = subTotal + tax - discount;
    return { subTotal, taxPct, tax, discountPct, discount, total };
  }, [items]);

  const proceedToPay = () => {
    localStorage.setItem('karshak_checkout_payload', JSON.stringify({ items, totals }));
    navigate('/payment');
  };

  return (
    // ✅ CHANGE 1: Use h-screen to constrain height to the viewport
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <MdArrowBack className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold">Cart</h1>
        <span className="w-5" />
      </div>

      {/* ✅ CHANGE 2: Add overflow-y-auto to the main content area */}
      <div className="p-4 flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((it) => (
              <div key={it.id} className="flex items-center justify-between p-3 border rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={it.imageUrl} alt={it.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold">{it.name}</p>
                    <p className="text-sm text-gray-500">₹{it.price}</p>
                    <p className="text-xs text-gray-500">Farmer: {it.farmer?.name || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2" onClick={() => updateQty(it.id, -1)}>-</button>
                  <span>{it.quantity}</span>
                  <button className="px-2" onClick={() => updateQty(it.id, 1)}>+</button>
                  <button className="ml-4 text-red-500" onClick={() => removeItem(it.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{totals.subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Taxes ({totals.taxPct}%)</span>
            <span>₹{totals.tax.toFixed(2)}</span>
          </div>
          {totals.discountPct > 0 && (
            <div className="flex justify-between text-sm">
              <span>Discount ({totals.discountPct}%)</span>
              <span>-₹{totals.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold mt-2">
            <span>Total</span>
            <span>₹{totals.total.toFixed(2)}</span>
          </div>
          <button className="mt-3 w-full py-2 bg-black text-white rounded-lg" onClick={proceedToPay}>
            Proceed to Payment
          </button>
        </div>
      )}
      
      {/* ✅ CHANGE 3: Remove fixed positioning to integrate footer into the layout */}
      <footer>
        <BuyerNavigationFooter />
      </footer>
    </div>
  );
};

export default Cart;