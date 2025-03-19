import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderLogo from "../assets/header-logo.svg";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { resetAuth } from "@/redux/auth/auth-slice";
import { resetUser } from "@/redux/auth/user-slice";
import { resetCompany } from "@/redux/auth/company-slice";

type Props = {};

const Header = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: any) => state.auth);
  const { currentUser } = useSelector((state: any) => state.user);
  const { currentCompany } = useSelector((state: any) => state.company);
  const [soldMenuOpen, setSoldMenuOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

  const location = useLocation();

  const currentPlan = currentCompany?.serviceOrders?.find(
    (order: any) => order.status === "ACTIVE"
  );

  let availableServices: Record<string, number> = {};
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
    window.location.pathname = "/login";
  };

  useEffect(() => {
    console.log({
      availableServices,
      totalAvailableBookings,
      currentPlan,
    });
  }, [availableServices, totalAvailableBookings, currentPlan]);

  return (
    <header className="relative bg-white shadow-lg h-[100px]">
      <div className="flex flex-row h-full items-center justify-between container mx-auto">
        <Link to={"/"} className="h-full flex items-center">
          <img src={HeaderLogo} className="h-1/2 w-auto" alt="Header Logo" />
        </Link>

        <nav className="flex space-x-6">
          <Link
            to="/activities"
            className={`text-gray-600 hover:text-primary ${
              location.pathname.startsWith("/activities") &&
              "font-bold text-primary"
            }`}
          >
            Nos services
          </Link>
          <a
            href="#news"
            className={`text-gray-600 hover:text-primary ${
              location.pathname.startsWith("/activities") &&
              "font-bold text-primary"
            }`}
          >
            Actualités
          </a>
          <Link
            to="/order"
            className={`text-gray-600 hover:text-primary ${
              location.pathname.startsWith("/order") && "font-bold text-primary"
            }`}
          >
            Abonnements
          </Link>
          <Link
            to="/about-us"
            className={`text-gray-600 hover:text-primary ${
              location.pathname.startsWith("/about-us") &&
              "font-bold text-primary"
            }`}
          >
            À Propos
          </Link>
          <Link
            to="/contact-us"
            className={`text-gray-600 hover:text-primary ${
              location.pathname.startsWith("/contact-us") &&
              "font-bold text-primary"
            }`}
          >
            Nous contacter
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {!accessToken || !currentUser ? (
            <div className="flex flex-row items-center gap-2">
              <Button className="text-white" onClick={() => navigate("/login")}>
                Se connecter
              </Button>
              <div className="h-8 w-0.5 bg-black rounded-full"></div>
              <Button
                variant="outline"
                className=""
                onClick={() => navigate("/sign-up")}
              >
                S'inscrire
              </Button>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-4">
              <div
                className="flex flex-row gap-1 font-bold cursor-pointer relative"
                onClick={() => {
                  setUserMenuOpen(false);
                  setSoldMenuOpen(!soldMenuOpen);
                }}
              >
                <div className="p-5 rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <Bell />
                </div>
                {totalAvailableBookings > 0 && (
                  <div className="rounded-full p-1 bg-red-500 text-white font-bold h-6 w-6 flex justify-center items-center absolute bottom-0 right-0">
                    {totalAvailableBookings}
                  </div>
                )}
                {soldMenuOpen && (
                  <div className="absolute flex flex-col gap-2 p-3 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded font-normal w-48 left-0 top-full z-10">
                    <p className="font-bold">Vous soldes :</p>
                    <p className="font-semibold">
                      Snacking:{" "}
                      <span>{availableServices["NOURRITURE"] || 0}</span>
                    </p>
                    <p className="font-semibold">
                      Bien étre:{" "}
                      <span>{availableServices["BIEN_ETRE"] || 0}</span>
                    </p>
                    <p className="font-semibold">
                      Team building:{" "}
                      <span>{availableServices["TEAM_BUILDING"] || 0}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="h-8 w-0.5 bg-black rounded-full "></div>
              <div
                className="flex flex-row gap-3 items-center cursor-pointer relative"
                onClick={() => {
                  setSoldMenuOpen(false);
                  setUserMenuOpen(!userMenuOpen);
                }}
              >
                <img
                  src={currentCompany?.logo?.fullUrl}
                  className="h-16 w-h-16 max-w-16 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-full object-cover"
                  alt=""
                />
                <div className="flex flex-col gap-0 font-bold">
                  <h2>{currentUser.userName}</h2>
                  <h1 className="font-normal">{currentCompany?.name}</h1>
                </div>
                <ChevronDown
                  className={`duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                />

                {userMenuOpen && (
                  <ul className="absolute flex flex-col gap-2 pt-3 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded font-normal w-48 left-0 top-full z-10">
                    <p className="px-3">Entreprise: {currentCompany?.name}</p>
                    <p className="px-3">Utilisateur: {currentUser?.userName}</p>
                    <p className="px-3">Email: {currentUser?.email}</p>
                    <hr />
                    <button
                      className="flex flex-row items-center gap-2 font-bold  cursor-pointer px-3 py-2 hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      <LogOut /> Deconnexion
                    </button>
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
