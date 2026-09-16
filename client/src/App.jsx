import { 
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import BuyerHome from "./components/BuyerHome";
import FarmerHome from "./components/FarmerHome";
import AddProduct from "./components/AddProduct";
import MyProducts from "./components/ProductsManager/MyProducts";
import AboutUs from "./components/AboutUs";
import PaymentSection from "./components/PaymentSection";
import OrdersManager from "./components/OrdersManager";
import MyOrders from "./components/MyOrders";
import Checkout from "./components/Checkout";
import FarmerProfile from "./components/FarmerProfile";
import Cart from "./components/Cart";
import FarmerDashboard from "./components/FarmerDashboard"; // ✅ Added
import BuyerDashboard from "./components/BuyerDashboard";
import AddMachinery from "./components/AddMachinery";
import MyMachinery from "./components/MyMachinery";
import MachineryRentals from "./components/MachineryRentals";
import MachineryDetails, { MachineryLoader } from "./components/MachineryDetails";

// ProductsManager components
import ProductCategories, { CategoryLoader } from "./components/ProductsManager/ProductCategories";
import ProductDetails, { ProductLoader } from "./components/ProductsManager/ProductItemDetails";

// Helper to check JWT expiration
const isTokenExpired = (jwt) => {
  try {
    const base64Url = jwt.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    if (typeof payload.exp !== "number") return false;
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Router configuration
const router = createBrowserRouter([
  // Public Routes
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/aboutus", element: <AboutUs /> },

  // Protected Routes
  {
    path: "/buyer",
    element: (
      <ProtectedRoute>
        <BuyerHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/farmer",
    element: (
      <ProtectedRoute>
        <FarmerHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/farmerdashboard", // ✅ Added FarmerDashboard
    element: (
      <ProtectedRoute>
        <FarmerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/buyerdashboard",
    element: (
      <ProtectedRoute>
        <BuyerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-machinery",
    element: (
      <ProtectedRoute>
        <AddMachinery />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-machinery",
    element: (
      <ProtectedRoute>
        <MyMachinery />
      </ProtectedRoute>
    ),
  },
  {
    path: "/category/RENTALS",
    element: (
      <ProtectedRoute>
        <MachineryRentals />
      </ProtectedRoute>
    ),
  },
  {
    path: "/machinery-details/:id",
    element: (
      <ProtectedRoute>
        <MachineryDetails />
      </ProtectedRoute>
    ),
    loader: MachineryLoader,
  },
  {
    path: "/add-product",
    element: (
      <ProtectedRoute>
        <AddProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      <ProtectedRoute>
        <PaymentSection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-products",
    element: (
      <ProtectedRoute>
        <MyProducts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ordersmanager",
    element: (
      <ProtectedRoute>
        <OrdersManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/myorders",
    element: (
      <ProtectedRoute>
        <MyOrders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/farmer-profile",
    element: (
      <ProtectedRoute>
        <FarmerProfile />
      </ProtectedRoute>
    ),
  },

  // ProductsManager Routes with Loaders
  {
    path: "/category/:id",
    element: (
      <ProtectedRoute>
        <ProductCategories />
      </ProtectedRoute>
    ),
    loader: CategoryLoader,
  },
  {
    path: "/product/:id",
    element: (
      <ProtectedRoute>
        <ProductDetails />
      </ProtectedRoute>
    ),
    loader: ProductLoader,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
