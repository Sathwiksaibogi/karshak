// import React, { useState } from "react";
// import { useLoaderData, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoIosArrowBack } from "react-icons/io";
// import apiClient from "../../api/axios";
// import BuyerNavigationFooter from "../BuyerNavigationFooter";

// // ✅ REMOVED: Unused icon imports (FaHome, FaSearch, etc.)

// const ProductItemDetails = () => {
//   const product = useLoaderData();
//   const [qty, setQty] = useState(0);
//   const [expanded, setExpanded] = useState(false);
//   const navigate = useNavigate();

//   if (!product) {
//     return <div className="p-4 text-gray-500">No product found</div>;
//   }

//   const increment = () => setQty(qty + 1);
//   const decrement = () => {
//     if (qty > 0) setQty(qty - 1);
//   };

//   const addToCartAndCheckout = (goToPayment = false) => {
//     const CART_KEY = 'karshak_cart_v1';
//     const existing = (() => { try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; } })();
//     const idx = existing.findIndex((it) => it.id === product.id);
//     const quantity = Math.max(1, qty || 1);
//     const baseItem = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       imageUrl: product.imageUrl,
//       farmer: product.farmer || null,
//       quantity,
//     };
//     if (idx >= 0) {
//       existing[idx] = { ...existing[idx], quantity: existing[idx].quantity + quantity };
//     } else {
//       existing.push(baseItem);
//     }
//     localStorage.setItem(CART_KEY, JSON.stringify(existing));
//     navigate(goToPayment ? '/payment' : '/cart');
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="flex items-center p-4 bg-white shadow-md">
//         <button onClick={() => navigate(-1)} className="mr-2">
//           <IoIosArrowBack className="text-2xl text-black hover:text-green-600 transition" />
//         </button>
//         <h2 className="text-lg font-bold">{product.category}</h2>
//       </div>

//       {/* Product container */}
//       <div className="flex-1 p-4">
//         <motion.div
//           layout
//           onClick={() => setExpanded(!expanded)}
//           className="cursor-pointer flex flex-col gap-3 rounded-xl p-4 bg-white shadow-lg hover:shadow-xl transition-transform duration-200 ease-out"
//         >
//           <div className="flex justify-between items-center">
//             {/* LEFT → image & info */}
//             <div className="flex items-center gap-4">
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-20 h-20 rounded-lg object-cover shadow-sm"
//               />
//               <div>
//                 <h3 className="font-semibold">{product.name}</h3>
//                 {product.farmer?.name && (
//                   <p className="text-sm text-gray-600">
//                     By {product.farmer.name}
//                   </p>
//                 )}
//                 {typeof product.price === "number" && (
//                   <p className="text-md font-bold">₹{product.price}</p>
//                 )}
//               </div>
//             </div>

//             {/* RIGHT → Qty controls */}
//             <div className="flex items-center rounded-full px-4 py-1 shadow-sm bg-gray-50">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   decrement();
//                 }}
//                 disabled={qty === 0}
//                 className={`px-2 text-lg font-bold ${
//                   qty === 0
//                     ? "text-gray-300 cursor-not-allowed"
//                     : "text-black hover:text-red-500"
//                 }`}
//               >
//                 –
//               </button>
//               <span className="px-3 font-medium">{qty}</span>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   increment();
//                 }}
//                 className="px-2 text-lg font-bold text-black hover:text-green-600"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Expandable details */}
//           <AnimatePresence>
//             {expanded && (
//               <motion.div
//                 key="extra"
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className="overflow-hidden text-gray-600 text-sm pl-2"
//               >
//                 {product.description && <p>{product.description}</p>}
//                 {typeof product.stock === "number" && (
//                   <p>Stock available: {product.stock}</p>
//                 )}
//                 {product.farmer && (
//                   <div className="mt-2 text-gray-700">
//                     <p className="font-semibold">Farmer Details</p>
//                     <p>Name: {product.farmer.name}</p>
//                     {product.farmer.phoneNumber !== undefined && (
//                       <p>Phone: {product.farmer.phoneNumber}</p>
//                     )}
//                     {product.farmer.address && (
//                       <p>Address: {product.farmer.address}</p>
//                     )}
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Note for user */}
//           <p className="text-xs text-gray-400 italic text-center">
//             Tap on the card to view more details
//           </p>
//           <div className="mt-3 grid grid-cols-2 gap-2">
//             <button className="py-2 rounded-lg border" onClick={() => addToCartAndCheckout(false)}>Add to Cart</button>
//             {/* <button className="py-2 rounded-lg bg-black text-white" onClick={() => addToCartAndCheckout(true)}>Order</button> */}
//           </div>
//         </motion.div>
//       </div>

//       <BuyerNavigationFooter />
//     </div>
//   );
// };

// // Loader
// export const ProductLoader = async ({ params }) => {
//   const { id } = params;
//   try {
//     const response = await apiClient.get(`/products/${id}`);
//     return response.data?.product ?? null;
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
// };

// export default ProductItemDetails;


import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import apiClient from "../../api/axios";
import BuyerNavigationFooter from "../BuyerNavigationFooter";

const ProductItemDetails = () => {
  const product = useLoaderData();
  const [qty, setQty] = useState(0); // Default to 0, user must increment
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  if (!product) {
    return <div className="p-4 text-gray-500">No product found</div>;
  }

  // ✅ FIX: Check against stock before incrementing
  const increment = () => {
    if (product.stock && qty < product.stock) {
      setQty(qty + 1);
    }
  };

  const decrement = () => {
    if (qty > 0) {
      setQty(qty - 1);
    }
  };

  const addToCartAndCheckout = (goToPayment = false) => {
    const CART_KEY = 'karshak_cart_v1';
    const existing = (() => { try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; } })();
    const idx = existing.findIndex((it) => it.id === product.id);
    const quantity = Math.max(1, qty || 1);
    const baseItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      farmer: product.farmer || null,
      quantity,
    };
    if (idx >= 0) {
      existing[idx] = { ...existing[idx], quantity: existing[idx].quantity + quantity };
    } else {
      existing.push(baseItem);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(existing));
    navigate(goToPayment ? '/payment' : '/cart');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-md">
        <button onClick={() => navigate(-1)} className="mr-2">
          <IoIosArrowBack className="text-2xl text-black hover:text-green-600 transition" />
        </button>
        <h2 className="text-lg font-bold">{product.category}</h2>
      </div>

      {/* Product container */}
      <div className="flex-1 p-4">
        <motion.div
          layout
          onClick={() => setExpanded(!expanded)}
          className="cursor-pointer flex flex-col gap-3 rounded-xl p-4 bg-white shadow-lg hover:shadow-xl transition-transform duration-200 ease-out"
        >
          <div className="flex justify-between items-center">
            {/* LEFT → image & info */}
            <div className="flex items-center gap-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover shadow-sm"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                {product.farmer?.name && (
                  <p className="text-sm text-gray-600">
                    By {product.farmer.name}
                  </p>
                )}
                {typeof product.price === "number" && (
                  <p className="text-md font-bold">₹{product.price}</p>
                )}
              </div>
            </div>

            {/* RIGHT → Qty controls */}
            <div className="flex items-center rounded-full px-4 py-1 shadow-sm bg-gray-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  decrement();
                }}
                disabled={qty === 0}
                className={`px-2 text-lg font-bold ${
                  qty === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-black hover:text-red-500"
                }`}
              >
                –
              </button>
              <span className="px-3 font-medium">{qty}</span>
              {/* ✅ FIX: Added disabled state and styling */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  increment();
                }}
                disabled={qty >= product.stock}
                className={`px-2 text-lg font-bold ${
                  qty >= product.stock
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-black hover:text-green-600"
                }`}
              >
                +
              </button>
            </div>
          </div>

          {/* Expandable details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="extra"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden text-gray-600 text-sm pl-2"
              >
                {product.description && <p>{product.description}</p>}
                {typeof product.stock === "number" && (
                  <p>Stock available: {product.stock}</p>
                )}
                {product.farmer && (
                  <div className="mt-2 text-gray-700">
                    <p className="font-semibold">Farmer Details</p>
                    <p>Name: {product.farmer.name}</p>
                    {product.farmer.phoneNumber !== undefined && (
                      <p>Phone: {product.farmer.phoneNumber}</p>
                    )}
                    {product.farmer.address && (
                      <p>Address: {product.farmer.address}</p>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Note for user */}
          <p className="text-xs text-gray-400 italic text-center">
            Tap on the card to view more details
          </p>
          <div className="mt-3">
             <button 
                className="w-full py-2 rounded-lg border disabled:bg-gray-200 disabled:cursor-not-allowed" 
                onClick={() => addToCartAndCheckout(false)}
                disabled={qty === 0}
              >
                Add to Cart
              </button>
          </div>
        </motion.div>
      </div>

      <BuyerNavigationFooter />
    </div>
  );
};

// Loader
export const ProductLoader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data?.product ?? null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default ProductItemDetails;