import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaCopy } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import BuyerNavigationFooter from "../BuyerNavigationFooter";
import apiClient from "../../api/axios";

const ProductCategories = () => {
  const { categoryId, products } = useLoaderData();
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null); // State for copy feedback
  const navigate = useNavigate();

  const handleCopyLink = (e, productId) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    const url = `${window.location.origin}/product/${productId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(productId);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000); // Reset feedback message after 2 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    // The main container is set to the full screen height and uses a flex-column layout.
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-md z-20">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <MdArrowBack className="w-6 h-6 text-gray-700" />
          </button>

          {/* Title */}
          <h1 className="text-lg font-bold">Karshak</h1>

          {/* Spacer (keeps title centered) */}
          <div className="w-8" />
        </div>

        {/* Search */}
        <div className="px-4 pb-3 bg-white">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 shadow-sm">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* This area expands to fill available space and scrolls if content overflows. */}
      <div className="flex-1 overflow-y-auto">
        {/* Category Title */}
        <h2 className="px-4 mt-4 text-xl font-bold">
          {categoryId.charAt(0).toUpperCase() + categoryId.slice(1).toLowerCase()}
        </h2>

        {/* Products List */}
        <div className="flex flex-col gap-5 px-4 mt-3 pb-4">
          {products
            .filter((p) => Number(p.stock) > 0)
            .filter((p) => (p.name || '').toLowerCase().includes(query.trim().toLowerCase()))
            .map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex items-start justify-between gap-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.01] p-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-24 h-24 rounded-xl object-cover shadow-md"
                  />
                  <div className="text-left">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <h3 className="text-sm text-gray-500">
                      ₹{typeof product.price === 'number' ? product.price.toFixed(2) : Number(product.price || 0).toFixed(2)}
                    </h3>
                  </div>
                </div>
                {/* <button
                  onClick={(e) => handleCopyLink(e, product.id)}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors self-center"
                  aria-label="Copy product link"
                >
                  {copiedId === product.id ? (
                    <span className="text-xs font-semibold text-green-600">Copied!</span>
                  ) : (
                    <FaCopy className="text-gray-500" />
                  )}
                </button> */}
              </Link>
            ))}
        </div>
      </div>

      {/* This div makes the footer sticky to the bottom of the screen. */}
      <div className="sticky bottom-0">
        <BuyerNavigationFooter />
      </div>
    </div>
  );
};

export const CategoryLoader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await apiClient.get(`/products/category/${id}`);
    const products = Array.isArray(response.data?.products)
      ? response.data.products
      : [];
    return { categoryId: id, products };
  } catch (e) {
    console.log(e);
    return { categoryId: id, products: [] };
  }
};

export default ProductCategories;

