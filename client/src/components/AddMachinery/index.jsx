import React, { useState } from "react";
import apiClient from "../../api/axios";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const AddMachinery = () => {
  const [machinery, setMachinery] = useState({
    name: "",
    price: "",
    description: "",
    pricingType: "hourly",
    quantity: 1
  });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMachinery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const farmerId = localStorage.getItem("id");
    if (!farmerId) {
      alert("Please login again. User id missing.");
      setSubmitting(false);
      return;
    }

    let imageUrl = "";
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadRes = await apiClient.post("/uploads", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadRes.data.url;
      } catch (err) {
        console.log(err);
        alert("Image upload failed");
        setSubmitting(false);
        return;
      }
    }

    const payload = {
      name: machinery.name,
      description: machinery.description,
      price: machinery.price !== "" ? Number(machinery.price) : 0,
      pricingType: machinery.pricingType,
      quantity: machinery.quantity !== "" ? Number(machinery.quantity) : 1,
      farmerId,
      imageUrl,
    };

    try {
      const res = await apiClient.post("/machinery", payload);
      console.log("Machinery Added:", res.data);
      setMachinery({
        name: "",
        price: "",
        description: "",
        pricingType: "hourly",
        quantity: 1
      });
      setImageFile(null);
      alert("Machinery added");
      navigate("/farmer");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Failed to add machinery");
    } finally { 
      setSubmitting(false); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-6 relative">
      {submitting && (
        <div className="absolute inset-0 z-10 bg-white/70">
          <Loading />
        </div>
      )}
      
      {/* Top Bar */}
      <div className="flex items-center w-full max-w-2xl mb-6">
        <button
          className="text-2xl"
          onClick={() => navigate("/farmer")}
        >
          <FiArrowLeft />
        </button>
        <h1 className="flex-1 text-center font-semibold text-lg sm:text-xl md:text-2xl">
          Add Machinery
        </h1>
      </div>

      {/* Image Upload */}
      <div className="w-full max-w-2xl mb-6">
        <label className="block mb-2 text-sm sm:text-base font-medium">
          Machinery Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm outline-none text-sm sm:text-base"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-4 bg-gray-50 p-4 sm:p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Name of the machinery"
          value={machinery.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm outline-none text-sm sm:text-base"
        />
        
        <div>
          <label className="block text-sm sm:text-base mb-1">Pricing Type</label>
          <select
            name="pricingType"
            value={machinery.pricingType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm outline-none text-sm sm:text-base"
          >
            <option value="hourly">Per Hour</option>
            <option value="daily">Per Day</option>
            <option value="halfday">Half Day</option>
          </select>
        </div>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={machinery.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm outline-none text-sm sm:text-base"
        />
        
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={machinery.quantity}
          onChange={handleChange}
          min="1"
          className="w-full px-4 py-2 border rounded-lg shadow-sm outline-none text-sm sm:text-base"
        />
        
        <textarea
          name="description"
          placeholder="Description"
          value={machinery.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 border rounded-lg shadow-sm outline-none resize-none text-sm sm:text-base"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-lg text-sm sm:text-base md:text-lg"
        >
          Add Machinery
        </button>
      </form>
    </div>
  );
};

export default AddMachinery;
