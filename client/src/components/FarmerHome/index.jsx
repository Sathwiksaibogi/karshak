import { useNavigate } from "react-router-dom";
import FarmerNavigationFooter from "../FarmerNavigationFooter";

const FarmerHome = () => {
  const navigate = useNavigate();

  const getRoles = () => {
    try {
      const raw = JSON.parse(localStorage.getItem("roles"));
      return raw || [];
    } catch {}
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
  const hasBuyer = roles.includes("BUYER");

  const cardStyle = "flex flex-col items-center justify-center text-center font-medium p-6 rounded-xl border-2 border-dashed border-gray-300 bg-white shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300";

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* Header */}
      <header className="flex justify-between items-center w-full">
        <h1 className="text-lg font-semibold">Karshak</h1>
        <div className="flex items-center gap-4">
          {hasBuyer && (
            <button
              onClick={() => navigate('/buyer')}
              className="px-3 py-1 text-sm border border-gray-400 rounded-lg hover:bg-gray-100 transition"
            >
              Switch to Buyer
            </button>
          )}
          <button
            onClick={() => {
              try { localStorage.clear(); } catch {}
              window.location.href = '/login';
            }}
            className="px-3 py-1 text-sm border border-gray-400 rounded-lg hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Logo */}
      <div className="mt-10">
        <img
          src="https://res.cloudinary.com/dojo8unri/image/upload/v1758691133/a260fb2e444173fff757ab2aa86b3316fa34307f_dfgvxx.png"
          alt="Karshak Logo"
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 mx-auto"
        />
      </div>

      {/* Actions */}
      <main className="mt-8 w-full max-w-2xl mx-auto grid grid-cols-2 gap-6 pb-24">
        <button
          onClick={() => navigate('/add-product')}
          className={cardStyle}
        >
          Add Products
        </button>

        <button
          onClick={() => navigate('/my-products')}
          className={cardStyle}
        >
          My Products
        </button>

        <button
          onClick={() => navigate('/add-machinery')}
          className={cardStyle}
        >
          Add Machinery
        </button>

        <button
          onClick={() => navigate('/my-machinery')}
          className={cardStyle}
        >
          My Machinery
        </button>
      </main>

      {/* Footer fixed at bottom */}
      <footer className="fixed bottom-0 left-0 right-0">
        <FarmerNavigationFooter />
      </footer>
    </div>
  );
};

export default FarmerHome;