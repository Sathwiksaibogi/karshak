// src/components/TabItem.jsx
import React from "react";

const TabItem = ({ element }) => {
  const { icon, tabName } = element;

  return (
    <div
      className="
        flex flex-col items-center gap-2 
        cursor-pointer hover:text-green-600 transition
      "
    >
      {/* Icon */}
      <span className="text-2xl">{icon}</span>

      {/* Label */}
      <span className="text-sm font-medium tracking-wide">
        {tabName}
      </span>
    </div>
  );
};

export default TabItem;