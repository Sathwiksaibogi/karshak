import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ✅ Correct relative imports
import ProductCategories, { CategoryLoader } from "./ProductCategories";
import ProductItemGroup, { ProductItemLoader } from "./ProductItemGroup";

const router = createBrowserRouter([
  {
    path: "/categories/:id",
    element: <ProductCategories />,
    loader: CategoryLoader,
  },
  {
    path: "/categories/:id/:product",
    element: <ProductItemGroup />,
    loader: ProductItemLoader,
  },
]);

const ProductsManager = () => {
  return <RouterProvider router={router} />;
};

export default ProductsManager;
