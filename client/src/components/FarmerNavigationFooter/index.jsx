import { FaHome, FaUser, FaBell } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const NavigationFooter = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm">
      <div className="flex justify-around items-center h-14">
        {/* Home */}
        <Link to="/farmer" className="flex flex-col items-center">
          <FaHome
            className={`w-6 h-6 ${
              location.pathname === "/farmer-home"
                ? "text-black"
                : "text-gray-600"
            }`}
          />
        </Link>

        {/* Profile */}
        <Link to="/farmerdashboard" className="flex flex-col items-center">
          <FaUser
            className={`w-6 h-6 ${
              location.pathname === "/farmerdashboard"
                ? "text-black"
                : "text-gray-600"
            }`}
          />
        </Link>

        {/* Orders Manager via Bell */}
        <Link to="/ordersmanager" className="relative flex flex-col items-center">
          <FaBell
            className={`w-6 h-6 ${
              location.pathname === "/ordersmanager"
                ? "text-black"
                : "text-gray-600"
            }`}
          />
        </Link>

        {/* Logo */}
        <Link to="/aboutus" className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dojo8unri/image/upload/v1758691122/b9bddf2546ed6616e2bc1483c5ea20584fa50b93_yhd5l7.png" // replace with actual logo path
            alt="Karshak Logo"
            className="w-6 h-6 object-contain"
          />
        </Link>
      </div>
    </div>
  );
};

export default NavigationFooter;
