import { useNavigate, Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import BuyerNavigationFooter from "../BuyerNavigationFooter";
import { useEffect, useState } from "react";

const categoriesList = [
  {
    id: "VEGETABLES",
    categoryImage:
      "https://res.cloudinary.com/dvezyc7gx/image/upload/v1756835709/Image_dlqijg.png",
    categoryName: "Vegetables",
  },
  {
    id: "FRUITS",
    categoryImage:
      "https://res.cloudinary.com/dvezyc7gx/image/upload/v1756835751/Image_2_bxws1m.png",
    categoryName: "Fruits",
  },
  {
    id: "RICE",
    categoryImage:
      "https://res.cloudinary.com/dojo8unri/image/upload/v1756835594/Image_1_vlfufe.png",
    categoryName: "Rice",
  },
  {
    id: "GRAINS",
    categoryImage:
      "https://res.cloudinary.com/dojo8unri/image/upload/v1756835711/Image_4_c1d0f9.png",
    categoryName: "Grains",
  },
  {
    id: "COTTON",
    categoryImage:
      "https://res.cloudinary.com/dojo8unri/image/upload/v1758785313/GettyImages-1320201171_iki4qq.avif",
    categoryName: "Cotton",
  },
  {
    id: "RENTALS",
    categoryImage:
      "https://res.cloudinary.com/dojo8unri/image/upload/v1758785352/WhatsApp_Image_2025-09-25_at_12.58.41_9d4dceb5_bggzea.jpg",
    categoryName: "Rentals",
  },
 
];

// Banner images
const bannerImages = [
  "https://res.cloudinary.com/dvezyc7gx/image/upload/v1758689287/Green_Minimalist_Summer_Big_Sale_Medium_Banner_nsqqqs.png",
  "https://res.cloudinary.com/dvezyc7gx/image/upload/v1758690153/Grey_and_Black_Simple_Opening_Soon_Banner_1_zfzmwj.png",
];

const BuyerHome = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto change banner every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  const getRoles = () => {
    try {
      const raw = localStorage.getItem("roles");
      if (raw) return JSON.parse(raw);
    } catch {
      /* no-op */
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const payload = JSON.parse(jsonPayload);
      return Array.isArray(payload.role) ? payload.role : [];
    } catch {
      return [];
    }
  };

  const roles = getRoles();
  const hasFarmer = roles.includes("FARMER");

  const handleToggle = () => {
    if (hasFarmer) navigate("/farmer");
  };

  return (
    <div className="min-h-screen bg-white relative pb-20">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Karshak</h1>
        <div className="flex items-center gap-2">
          {hasFarmer && (
            <button
              onClick={handleToggle}
              className="px-3 py-1 text-sm border border-gray-400 rounded-lg hover:bg-gray-100 transition"
            >
              Switch to Farmer
            </button>
          )}
          <Link
              to="/buyerdashboard"
              className="px-3 py-1 text-sm border border-gray-400 rounded-lg hover:bg-gray-100 transition"
            >
              Profile
            </Link>
          <button
            onClick={() => {
              try {
                localStorage.clear();
              } catch {
                /* no-op */
              }
              window.location.href = "/login";
            }}
            className="px-3 py-1 text-sm border border-gray-400 rounded-lg hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Banner - Auto Switching every 10s */}
      <div className="relative w-full sm:w-4/5 md:w-3/4 mx-auto h-48 sm:h-64 md:h-72 overflow-hidden rounded-xl mb-6 mt-5">
        {bannerImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Banner ${index}`}
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-700 ${
              currentBanner === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Categories */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-lg font-bold">Categories</h1>
          {/* <MdKeyboardArrowRight className="text-xl" /> */}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categoriesList.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="flex flex-col items-center p-3 rounded-xl border-2 border-dashed border-gray-300 
                         bg-white shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={cat.categoryImage}
                alt={cat.categoryName}
                className="w-20 h-20 object-cover rounded-lg mb-2"
              />
              <span className="font-medium text-center">{cat.categoryName}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0">
        <BuyerNavigationFooter />
      </div>
    </div>
  );
};

export default BuyerHome;
