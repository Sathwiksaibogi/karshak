import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="flex flex-col min-h-screen items-center bg-white px-6 py-8">
      {/* Header */}
      <header className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Karshak</h1>
        <span />
      </header>

      {/* Auth Section */}
      <main className="w-full max-w-sm flex flex-col items-center flex-grow justify-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="https://res.cloudinary.com/dojo8unri/image/upload/v1758691133/a260fb2e444173fff757ab2aa86b3316fa34307f_dfgvxx.png"
            alt="Karshak Logo"
            className="w-32 h-32 sm:w-40 sm:h-40"
          />
        </div>

        <p className="text-lg font-medium mb-6">Welcome</p>

        {/* Login Button */}
        <Link to="/login" className="w-full">
          <button className="w-full bg-black text-white py-3 rounded-lg mb-4 font-medium hover:bg-gray-800 transition-all duration-200">
            Login
          </button>
        </Link>

        {/* Signup Button */}
        <Link to="/register" className="w-full">
          <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200">
            Register
          </button>
        </Link>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By clicking continue, you agree to our{" "}
          <span className="font-medium">Terms of Service</span> and{" "}
          <span className="font-medium">Privacy Policy</span>
        </p>
      </main>
    </div>
  );
};

export default Home;