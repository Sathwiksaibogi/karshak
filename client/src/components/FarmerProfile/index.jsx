import { FaUserCircle, FaShoppingBag, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa"; 
import { MdPhone, MdLocationOn } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";

import FarmerNavigationFooter from "../FarmerNavigationFooter";

const Profile = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      {/* Top Refresh Icon */}
      <div className="self-start mb-2">
        <FiRefreshCcw size={20} className="text-gray-700 cursor-pointer" />
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold">Karshak</h1>
      <p className="text-sm mt-1">Profile</p>

      {/* Profile Image Placeholder */}
      <div className="mt-4 flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center border rounded-2xl shadow-md">
          <FaUserCircle size={40} className="text-gray-600" />
        </div>
      </div>

      {/* Profile Details */}
      <div className="mt-6 space-y-2 text-sm w-full max-w-xs">
        <p className="flex items-center">
          <FaUserCircle className="mr-1" /> <strong>Name :</strong>&nbsp; Your Name
        </p>
        <p className="flex items-center">
          <MdPhone className="mr-1" /> <strong>Phone Number :</strong>&nbsp; +91 123*****9
        </p>
        <p className="flex items-center">
          <MdLocationOn className="mr-1" /> <strong>Address :</strong>&nbsp; India, Telangana
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="flex flex-col items-center p-4 border rounded-2xl shadow-md">
          <FaShoppingBag size={28} className="mb-2 text-gray-700" />
          <span className="text-sm">Your Orders</span>
        </div>
        <div className="flex flex-col items-center p-4 border rounded-2xl shadow-md">
          <FaQuestionCircle size={28} className="mb-2 text-gray-700" />
          <span className="text-sm">Help & Support</span>
        </div>
      </div>

      {/* Logout Button */}
      <button className="mt-8 w-full max-w-xs py-2 bg-black text-white rounded-lg flex items-center justify-center">
        <FaSignOutAlt className="mr-2" /> Log Out
      </button>
      <FarmerNavigationFooter />
    </div>
  );
};

export default Profile;
