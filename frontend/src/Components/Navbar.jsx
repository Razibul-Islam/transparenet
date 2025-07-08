import { Home, Menu, Shield, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { UseTNContext } from "../../context/TransparenetContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { account, Isowner, connectWallet } = UseTNContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transparenet
            </span>
          </Link>

          {/* User Profile & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/verification"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
              >
                <Shield className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Verification</span>
              </Link>
              {Isowner && (
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                >
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              )}
            </div>

            {/* Desktop Wallet Section */}
            <div className="hidden md:flex items-center space-x-3">
              {account ? (
                <div className="text-xs text-gray-500 font-mono">
                  {`${account.slice(0, 5)}...${account.slice(-5)}`}
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 hover:shadow-lg"
                >
                  <div className="w-5 h-5 bg-white/20 rounded border border-white/30 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white/90 backdrop-blur-md border-t border-gray-200">
          <Link
            to="/verification"
            onClick={closeMenu}
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
          >
            <Shield className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Verification</span>
          </Link>
          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Dashboard</span>
          </Link>

          {/* Mobile User Profile */}
          <div className="flex items-center space-x-3 px-4 py-3 border-t border-gray-200 mt-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">A</span>
            </div>
            <span className="text-gray-700 font-medium">Admin</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
