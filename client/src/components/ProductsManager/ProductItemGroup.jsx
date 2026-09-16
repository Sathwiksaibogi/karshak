import { useParams, useLoaderData } from "react-router-dom";
import ProductItemDetails from "./ProductItemDetails";
import NavigationFooter from "../FarmerNavigationFooter";

const productItemGroupList = [
  {
    id: "ONION",
    groupList: [
      { id: 1, name: "Red Onion", cost: "₹40/kg", productImg: "https://via.placeholder.com/100" },
      { id: 2, name: "White Onion", cost: "₹50/kg", productImg: "https://via.placeholder.com/100" },
    ],
  },
];

const ProductItemGroup = () => {
  const { id } = useParams();
  const productGroupList = useLoaderData();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3">Karshak</h1>
      <input type="search" placeholder="Search" className="border px-3 py-1 rounded mb-3 w-full" />
      {productGroupList.groupList.map((p) => (
        <ProductItemDetails key={p.id} product={p} />
      ))}
    </div>
  );
};

export const ProductItemLoader = async ({ params }) => {
  const { id } = params;
  return productItemGroupList.find((group) => group.id.toLowerCase() === id.toLowerCase());
};

export default ProductItemGroup;
