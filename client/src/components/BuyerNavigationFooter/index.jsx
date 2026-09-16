import { FaHome } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GiFarmTractor } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BuyerNavigationFooter = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-auto flex justify-around items-center border-t py-3 text-gray-600 text-sm bg-white shadow-inner">
      <button className="flex flex-col items-center" onClick={() => navigate('/buyer')}>
        <FaHome className="w-5 h-5" />
      </button>
      <button className="flex flex-col items-center" onClick={() => navigate('/myorders')}>
        <FaClipboardList className="w-5 h-5" />
      </button>
      <button className="flex flex-col items-center" onClick={() => navigate('/cart')}>
        <FiShoppingCart className="w-5 h-5" />
      </button>
      <Link to="/aboutus" className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dojo8unri/image/upload/v1758691122/b9bddf2546ed6616e2bc1483c5ea20584fa50b93_yhd5l7.png" // replace with actual logo path
            alt="Karshak Logo"
            className="w-6 h-6 object-contain"
          />
        </Link>
    </div>
  )
}

export default BuyerNavigationFooter;