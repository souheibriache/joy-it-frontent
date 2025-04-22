"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Bell,
  Calendar,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { resetAuth } from "@/redux/auth/auth-slice";
import { resetUser } from "@/redux/auth/user-slice";
import { resetCompany } from "@/redux/auth/company-slice";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import HeaderLogo from "../assets/header-logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { accessToken } = useSelector((state: any) => state.auth);
  const { currentUser } = useSelector((state: any) => state.user);
  const { currentCompany } = useSelector((state: any) => state.company);

  const [soldMenuOpen, setSoldMenuOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const soldMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);
  const userProfileRef = useRef<HTMLDivElement>(null);

  const currentPlan = currentCompany?.serviceOrders?.find(
    (order: any) => order.status === "ACTIVE"
  );

  const availableServices: Record<string, number> = {};
  currentPlan?.details.forEach(
    (detail: any) =>
      (availableServices[detail.serviceType] =
        detail.allowedBookings - detail.bookingsUsed)
  );

  const totalAvailableBookings = Object.values(availableServices).reduce(
    (sum: number, value: number) => {
      return (sum += value);
    },
    0
  );

  const handleLogout = () => {
    dispatch(resetAuth());
    dispatch(resetUser());
    dispatch(resetCompany());
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.pathname = "/login";
  };

  const redirectToMyJoyit = () => {
    navigate("/my-account");
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        soldMenuOpen &&
        soldMenuRef.current &&
        bellRef.current &&
        !soldMenuRef.current.contains(event.target as Node) &&
        !bellRef.current.contains(event.target as Node)
      ) {
        setSoldMenuOpen(false);
      }

      if (
        userMenuOpen &&
        userMenuRef.current &&
        userProfileRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        !userProfileRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [soldMenuOpen, userMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/activities", label: "Nos services" },
    { path: "/blog", label: "Actualités" },
    { path: "/order", label: "Abonnements" },
    { path: "/about-us", label: "À Propos" },
    { path: "/contact-us", label: "Nous contacter" },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 h-[80px] md:h-[100px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="h-full flex items-center">
          <img src={HeaderLogo} alt="Logo" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-gray-600 hover:text-primary transition-colors duration-200 relative py-2",
                isActive(link.path) && "font-semibold text-primary"
              )}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-primary"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Auth/User Section */}
        <div className="hidden md:flex items-center space-x-4">
          {!accessToken || !currentUser ? (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-primary hover:bg-gray-100"
                onClick={() => navigate("/login")}
              >
                Se connecter
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => navigate("/sign-up")}
              >
                S'inscrire
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Notifications Bell */}
              <div className="relative" ref={bellRef}>
                <button
                  className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 hover:text-primary"
                  onClick={() => {
                    setUserMenuOpen(false);
                    setSoldMenuOpen(!soldMenuOpen);
                  }}
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {totalAvailableBookings > 0 && (
                    <div className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white font-bold h-5 w-5 flex justify-center items-center text-xs">
                      {totalAvailableBookings}
                    </div>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {soldMenuOpen && (
                  <div
                    ref={soldMenuRef}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-10 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-bold text-gray-800">Vos soldes</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-700">Snacking</p>
                        <span className="font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                          {availableServices["NOURRITURE"] || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-700">Bien être</p>
                        <span className="font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                          {availableServices["BIEN_ETRE"] || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-700">Team building</p>
                        <span className="font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                          {availableServices["TEAM_BUILDING"] || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-gray-300"></div>

              {/* User Profile */}
              <div className="relative" ref={userProfileRef}>
                <button
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-full pr-2 transition-colors duration-200"
                  onClick={() => {
                    setSoldMenuOpen(false);
                    setUserMenuOpen(!userMenuOpen);
                  }}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src={
                        currentCompany?.logo?.fullUrl ||
                        "/placeholder.svg?height=48&width=48"
                      }
                      className="w-full h-full object-cover"
                      alt={currentCompany?.name || "Company logo"}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-gray-800 text-sm">
                      {currentUser.userName}
                    </span>
                    <span className="text-gray-500 text-xs truncate max-w-[120px]">
                      {currentCompany?.name}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div
                    ref={userMenuRef}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-10 overflow-hidden"
                  >
                    {/* Header Info */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <p className="text-sm text-gray-600">
                        Entreprise:{" "}
                        <span className="font-semibold text-gray-800">
                          {currentCompany?.name}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Utilisateur:{" "}
                        <span className="font-semibold text-gray-800">
                          {currentUser.userName}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Email:{" "}
                        <span className="font-semibold text-gray-800 truncate block">
                          {currentUser?.email}
                        </span>
                      </p>
                    </div>

                    {/* Menu Actions */}
                    <nav className="flex flex-col divide-y divide-gray-100">
                      <button
                        onClick={() => navigate("/my-reservations")}
                        className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Calendar size={16} className="text-primary" />
                        <span>Mes Réservations</span>
                      </button>
                      <Link
                        to={"/my-account"}
                        className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings size={16} className="text-primary" />
                        <span>Paramètres</span>
                      </Link>
                      <button
                        disabled
                        onClick={redirectToMyJoyit}
                        className="flex items-center gap-2 px-4 py-3 text-gray-400 cursor-not-allowed"
                      >
                        <User size={16} />
                        <span>Espace Client</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Déconnexion</span>
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg text-gray-800">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Mobile Navigation */}
              <nav className="flex flex-col divide-y divide-gray-100">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "px-6 py-4 text-gray-700 hover:bg-gray-50",
                      isActive(link.path) &&
                        "font-semibold text-primary bg-gray-50"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth/User Section */}
              {!accessToken || !currentUser ? (
                <div className="p-6 border-t border-gray-200 space-y-3">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => navigate("/login")}
                  >
                    Se connecter
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10"
                    onClick={() => navigate("/sign-up")}
                  >
                    S'inscrire
                  </Button>
                </div>
              ) : (
                <div className="border-t border-gray-200">
                  {/* User Profile */}
                  <div className="p-4 flex items-center gap-3 bg-gray-50">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img
                        src={
                          currentCompany?.logo?.fullUrl ||
                          "/placeholder.svg?height=48&width=48"
                        }
                        className="w-full h-full object-cover"
                        alt={currentCompany?.name || "Company logo"}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {currentUser.userName}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {currentCompany?.name}
                      </div>
                    </div>
                  </div>

                  {/* Available Services */}
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Vos soldes
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Snacking</span>
                        <span className="font-semibold bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                          {availableServices["NOURRITURE"] || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Bien être</span>
                        <span className="font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                          {availableServices["BIEN_ETRE"] || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Team building</span>
                        <span className="font-semibold bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                          {availableServices["TEAM_BUILDING"] || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* User Actions */}
                  <nav className="flex flex-col divide-y divide-gray-100 border-t border-gray-200">
                    <button
                      onClick={() => navigate("/my-reservations")}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
                    >
                      <Calendar size={18} className="text-primary" />
                      <span>Mes Réservations</span>
                    </button>
                    <Link
                      to={"/my-account"}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50"
                    >
                      <Settings size={18} className="text-primary" />
                      <span>Paramètres</span>
                    </Link>
                    <button
                      disabled
                      className="flex items-center gap-3 px-4 py-3 text-gray-400 cursor-not-allowed"
                    >
                      <User size={18} />
                      <span>Espace Client</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      <span>Déconnexion</span>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
