// src/components/CategoryTabItem.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryTabItem({ element }) {
  const { id, categoryImage, categoryName } = element;
  const navigate = useNavigate();

  const onCategorySelect = () => navigate(`/categories/${id}`);

  return (
    <button
      onClick={onCategorySelect}
      className="flex flex-col items-center text-center focus:outline-none hover:scale-105 transition"
    >
      {/* Medium-sized circular avatar with soft shadow */}
      <img
        src={categoryImage}
        alt={categoryName}
        className="w-24 h-24 rounded-full object-cover shadow-md border border-gray-200"
      />
      {/* Text below, no overflow mess */}
      <span className="mt-2 text-sm font-semibold text-gray-700 w-28 truncate">
        {categoryName}
      </span>
    </button>
  );
}
