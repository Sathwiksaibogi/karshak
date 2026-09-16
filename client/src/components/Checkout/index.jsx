import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import BuyerNavigationFooter from "../BuyerNavigationFooter";

const Checkout = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-6 text-black">
      {/* Top Bar */}
      <div className="flex items-center mb-6">
        <button className="text-2xl">
          <FiArrowLeft />
        </button>
        <h1 className="flex-1 text-center font-semibold text-lg">Checkout</h1>
      </div>

      {/* Shipping Section */}
      <div className="border-b py-4 flex justify-between items-center">
        <p className="font-medium">SHIPPING</p>
        <span className="text-gray-500 cursor-pointer">Add shipping address &gt;</span>
      </div>

      {/* Delivery Section */}
      <div className="border-b py-4 flex justify-between items-center">
        <p className="font-medium">DELIVERY</p>
        <span className="text-gray-500">Free Standard | 3-4 days</span>
      </div>

      {/* Payment Section */}
      <div className="border-b py-4 flex justify-between items-center">
        <p className="font-medium">PAYMENT</p>
        <span className="text-gray-500">Cash on delivery</span>
      </div>

      {/* Items List */}
      <div className="mt-6">
        {/* Item 1 */}
        <div className="grid grid-cols-3 items-center gap-4 border-b pb-4 mb-4">
          <img
            src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            alt="Watermelon"
            className="w-16 h-16 rounded-md object-cover"
          />
          <div className="col-span-1 text-sm">
            <p className="font-semibold">Karshak</p>
            <p>Watermelon</p>
            <p className="text-gray-500">Quantity: 01</p>
          </div>
          <p className="text-right font-medium">₹20.99</p>
        </div>

        {/* Item 2 */}
        <div className="grid grid-cols-3 items-center gap-4 border-b pb-4">
          <img
            src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            alt="Pear"
            className="w-16 h-16 rounded-md object-cover"
          />
          <div className="col-span-1 text-sm">
            <p className="font-semibold">Karshak</p>
            <p>Pear</p>
            <p className="text-gray-500">Quantity: 01</p>
          </div>
          <p className="text-right font-medium">₹10.99</p>
        </div>
      </div>

      {/* Price Summary */}
      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal (2)</p>
          <p>₹19.98</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping total</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between">
          <p>Taxes</p>
          <p>₹2.00</p>
        </div>
        <div className="flex justify-between font-bold text-base">
          <p>Total</p>
          <p>₹21.98</p>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        type="button"
        className="w-full bg-black text-white font-semibold py-3 rounded-lg mt-4 active:bg-gray-800 transition"
      >
        Place order
      </button>
      <BuyerNavigationFooter />
    </div>
  );
};

export default Checkout;
