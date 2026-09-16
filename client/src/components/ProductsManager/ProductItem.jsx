import React, { useState } from "react";

// ✅ REMOVED: Unused import for BuyerNavigationFooter

export default function ProductItem({ product, onQuantityChange }) {
  if (!product) return null;

  const { id, name, price, farmer, image } = product;

  const [qty, setQty] = useState(1);

  const increment = () => {
    const newQty = qty + 1;
    setQty(newQty);
    onQuantityChange?.(id, newQty);
  };

  const decrement = () => {
    if (qty > 0) {
      const newQty = qty - 1;
      setQty(newQty);
      onQuantityChange?.(id, newQty);
    }
  };

  // ✅ IMPROVED: Safely handles farmer data whether it's a string or an object
  const farmerName = farmer?.name || farmer;

  return (
    <div className="flex items-center justify-between rounded-2xl shadow-md border px-3 py-2 mb-3 bg-white">
      {/* LEFT → Image & Info */}
      <div className="flex gap-3 items-center">
        <img src={image} alt={name} className="w-16 h-16 rounded-xl object-cover" />
        <div className="flex flex-col text-sm">
          <span className="text-gray-500 font-semibold">Karshak</span>
          <span className="text-black font-bold">{name}</span>
          {farmerName && <span className="text-gray-700">{farmerName} Farmer</span>}
          <span className="text-black font-medium">₹{price} /kg</span>
        </div>
      </div>

      {/* RIGHT → Qty Controls */}
      <div className="flex items-center gap-2 border rounded-full px-2 py-1">
        <button
          onClick={decrement}
          disabled={qty === 0}
          className={`px-2 text-lg ${
            qty === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-black hover:text-red-500"
          }`}
        >
          
        </button>
        <span className="font-medium w-6 text-center">{qty}</span>
        <button
          onClick={increment}
          className="px-2 text-lg text-black hover:text-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
}