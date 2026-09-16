import React, { useEffect, useState } from "react";
import apiClient from "../../api/axios";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    category: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [productNames, setProductNames] = useState([]);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiClient.get('/products').then((res) => {
      setProductNames(res.data?.names || []);
    }).catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
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

    // ✅ always send a number (default 0)
    const payload = {
      name: product.name,
      description: product.description,
      price: product.price !== "" ? Number(product.price) : 0,
      category: product.category,
      stock: product.quantity !== "" ? Number(product.quantity) : 0,
      farmerId,
      imageUrl,
    };

    try {
      const res = await apiClient.post("/products", payload);
      console.log("Product Added:", res.data);
      // Reset full form
      setProduct({
        name: "",
        price: "",
        quantity: "",
        description: "",
        category: ""
      });
      setImageFile(null);
      alert("Product added");
      navigate("/farmer");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Failed to add product");
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4 py-6">
      {/* Top Bar */}
      <div className="flex items-center w-full max-w-2xl mb-6">
        <button
          className="text-2xl"
          onClick={() => navigate("/farmer")}
        >
          <FiArrowLeft />
        </button>
        <h1 className="flex-1 text-center font-semibold text-lg sm:text-xl md:text-2xl">
          Karshak
        </h1>
      </div>

      {/* Image Upload */}
      <div className="w-full max-w-2xl mb-6">
        <label className="block mb-2 text-sm sm:text-base font-medium">
          Product Image
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
        {submitting && (
          <div className="absolute inset-0 z-10 bg-white/70"><Loading /></div>
        )}
        <div>
          <label className="block text-sm sm:text-base mb-1">Product Name</label>
          <input
            list="product-names"
            type="text"
            name="name"
            placeholder="Name of the product"
            value={product.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm outline-none text-sm sm:text-base"
          />
          <datalist id="product-names">
            {productNames.map((n) => (
              <option key={n} value={n} />
            ))}
          </datalist>
        </div>
        <input
          type="number"
          name="price"
          placeholder="Price per Kg"
          value={product.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm outline-none text-sm sm:text-base"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg shadow-sm outline-none text-sm sm:text-base"
        />
        <div>
          <label className="block text-sm sm:text-base mb-1">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm outline-none text-sm sm:text-base"
          >
            <option value="">Select Category</option>
            <option value="VEGETABLES">Vegetables</option>
            <option value="FRUITS">Fruits</option>
            <option value="RICE">Rice</option>
            <option value="GRAINS">Grains</option>
            <option value="COTTON">Cotton</option>
          </select>
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 border rounded-lg shadow-sm outline-none resize-none text-sm sm:text-base"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-lg text-sm sm:text-base md:text-lg"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
