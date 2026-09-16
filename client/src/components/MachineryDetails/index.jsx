import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import apiClient from "../../api/axios";
import BuyerNavigationFooter from "../BuyerNavigationFooter";

const MachineryDetails = () => {
  const machinery = useLoaderData();
  const [expanded, setExpanded] = useState(false);
  const [duration, setDuration] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();

  if (!machinery) {
    return <div className="p-4 text-gray-500">No machinery found</div>;
  }

  const calculateTotal = () => {
    if (!duration || !quantity) return 0;
    return machinery.price * duration * quantity;
  };

  const calculateDurationFromDates = () => {
    if (!startDate || !endDate) return duration;
    
    let start, end;
    
    if (machinery.pricingType === 'hourly') {
      // For hourly, use datetime
      start = new Date(`${startDate}T${startTime || '00:00'}`);
      end = new Date(`${endDate}T${endTime || '00:00'}`);
    } else {
      // For daily/halfday, use dates only
      start = new Date(startDate);
      end = new Date(endDate);
    }
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (machinery.pricingType === 'hourly') {
      // For hourly, calculate hours between datetime
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      return Math.max(1, diffHours);
    } else if (machinery.pricingType === 'daily') {
      // For daily, calculate days
      return Math.max(1, diffDays);
    } else if (machinery.pricingType === 'halfday') {
      // For half day, calculate half days (2 half days = 1 day)
      return Math.max(1, Math.ceil(diffDays * 2));
    }
    
    return duration;
  };

  // Update duration when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const calculatedDuration = calculateDurationFromDates();
      setDuration(calculatedDuration);
    }
  }, [startDate, endDate, startTime, endTime, machinery.pricingType]);

  const rentMachinery = async () => {
    if (!machinery.isAvailable) {
      alert("This machinery is not available for rent");
      return;
    }

    // Build cart item and add to local storage cart, then navigate to payment
    try {
      const CART_KEY = 'karshak_cart_v1';
      const existing = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      const cartItem = {
        id: machinery.id,
        type: 'rental',
        name: machinery.name,
        price: Number(machinery.price),
        imageUrl: machinery.imageUrl,
        farmer: machinery.farmer || null,
        quantity: quantity,
        duration: duration,
        pricingType: machinery.pricingType,
        startDate: startDate || null,
        endDate: endDate || null,
        startTime: startTime || null,
        endTime: endTime || null,
      };
      const next = [...existing, cartItem];
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      // Also prime checkout payload and go to payment directly
      const subTotal = next.reduce((s, it) => s + (it.price * (it.quantity || 1) * (it.type === 'rental' ? (it.duration || 1) : 1)), 0);
      const taxPct = 5; const discountPct = 0;
      const tax = (taxPct / 100) * subTotal; const discount = (discountPct / 100) * subTotal;
      const totals = { subTotal, taxPct, tax, discountPct, discount, total: subTotal + tax - discount };
      localStorage.setItem('karshak_checkout_payload', JSON.stringify({ items: next, totals }));
      navigate('/payment');
    } catch (e) {
      console.error('Add to cart error:', e);
      alert('Could not add to cart');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-md">
        <button onClick={() => navigate(-1)} className="mr-2">
          <IoIosArrowBack className="text-2xl text-black hover:text-green-600 transition" />
        </button>
        <h2 className="text-lg font-bold">Machinery Rental</h2>
      </div>

      {/* Machinery container */}
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
                src={machinery.imageUrl || "https://via.placeholder.com/80x80?text=Machinery"}
                alt={machinery.name}
                className="w-20 h-20 rounded-lg object-cover shadow-sm"
              />
              <div>
                <h3 className="font-semibold">{machinery.name}</h3>
                {machinery.farmer?.name && (
                  <p className="text-sm text-gray-600">
                    By {machinery.farmer.name}
                  </p>
                )}
                <p className="text-md font-bold">₹{machinery.price} / {machinery.pricingType}</p>
                <p className="text-xs text-gray-500">Qty: {machinery.quantity}</p>
                <span className={`px-2 py-1 rounded-full text-xs ${machinery.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {machinery.isAvailable ? 'Available' : 'Rented'}
                </span>
              </div>
            </div>

            {/* RIGHT → Quantity controls */}
            <div className="flex items-center rounded-full px-4 py-1 shadow-sm bg-gray-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
                disabled={quantity === 1}
                className={`px-2 text-lg font-bold ${
                  quantity === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-black hover:text-red-500"
                }`}
              >
                –
              </button>
              <span className="px-3 font-medium">{quantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const next = quantity + 1;
                  setQuantity(Math.min(next, Math.max(1, machinery.quantity || 1)));
                }}
                className="px-2 text-lg font-bold text-black hover:text-green-600"
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
                {machinery.description && <p>{machinery.description}</p>}
                {machinery.farmer && (
                  <div className="mt-2 text-gray-700">
                    <p className="font-semibold">Farmer Details</p>
                    <p>Name: {machinery.farmer.name}</p>
                    {machinery.farmer.phoneNumber !== undefined && (
                      <p>Phone: {machinery.farmer.phoneNumber}</p>
                    )}
                    {machinery.farmer.address && (
                      <p>Address: {machinery.farmer.address}</p>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rental form */}
          <div className="mt-3 space-y-3">
            {machinery.pricingType === 'hourly' ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      value={startDate && startTime ? `${startDate}T${startTime}` : ''}
                      onChange={(e) => {
                        const [date, time] = e.target.value.split('T');
                        setStartDate(date);
                        setStartTime(time);
                      }}
                      className="w-full px-3 py-2 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">End Date & Time</label>
                    <input
                      type="datetime-local"
                      value={endDate && endTime ? `${endDate}T${endTime}` : ''}
                      onChange={(e) => {
                        const [date, time] = e.target.value.split('T');
                        setEndDate(date);
                        setEndTime(time);
                      }}
                      className="w-full px-3 py-2 border rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm"
                  />
                </div>
              </div>
            )}
            
            <div className="text-right">
              <p className="text-sm text-gray-600">Total: ₹{calculateTotal().toFixed(2)}</p>
              <p className="text-xs text-gray-500">
                ({quantity} qty × {duration} {machinery.pricingType === 'halfday' ? 'half days' : machinery.pricingType} × ₹{machinery.price})
              </p>
              {startDate && endDate && (
                <p className="text-xs text-gray-400">
                  {machinery.pricingType === 'hourly' ? 
                    `From ${startDate} ${startTime} to ${endDate} ${endTime}` :
                    `From ${startDate} to ${endDate}`
                  }
                </p>
              )}
            </div>
          </div>

          {/* Note for user */}
          <p className="text-xs text-gray-400 italic text-center">
            Tap on the card to view more details
          </p>
          
          <div className="mt-3">
            <button 
              className="w-full py-2 rounded-lg bg-black text-white disabled:bg-gray-400" 
              onClick={(e) => {
                e.stopPropagation();
                rentMachinery();
              }}
              disabled={!machinery.isAvailable}
            >
              {machinery.isAvailable ? 'Request Rental' : 'Not Available'}
            </button>
          </div>
        </motion.div>
      </div>

      <BuyerNavigationFooter />
    </div>
  );
};

// Loader
export const MachineryLoader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await apiClient.get(`/machinery/${id}`);
    return response.data?.machinery ?? null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default MachineryDetails;
