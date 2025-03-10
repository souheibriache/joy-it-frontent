import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import { RootState } from "./redux/store"; // Adjust the path to your store
import VerificationNotification from "./components/VerificationNotification";
import { useFetchCompany } from "./utils/api/company-api";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import Order from "./pages/Order";
import CreateCompany from "./pages/CreateCompany";
import PlanDetails from "./pages/PlanDetails";
import PaymentDetails from "./pages/PaymentDetails";
import LandingPage from "./pages/LandingPage";
import AccountVerification from "./components/AccountVerification";
import About from "./pages/About";
import Contact from "./pages/Contact";
import fetchWithAuth from "./utils/fetchWrapper";
import Activities from "./pages/Activities";
import ActivityDetails from "./pages/ActivityDetails";

function App() {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { currentCompany } = useSelector((state: RootState) => state.company);
  const navigate = useNavigate();

  useFetchCompany();

  useEffect(() => {
    if (accessToken) {
      const decoded: any = jwtDecode(accessToken);

      const expired = decoded.iat * 1000 < Date.now();
      if (expired) {
        fetchWithAuth("/accounts/profile");
        return;
      }

      if (!decoded.metadata.isVerified) {
        navigate("/account-verification");
        return;
      }

      if (!currentCompany) {
        navigate("/create-company");
      }
    }
  }, [accessToken, navigate, currentCompany]);

  return (
    <div>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />

        <Route path="/account-verification" element={<AccountVerification />} />

        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:orderId"
          element={
            <ProtectedRoute>
              <PlanDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<LandingPage />} />

        <Route
          path="/create-company"
          element={
            <ProtectedRoute>
              <CreateCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-notification"
          element={<VerificationNotification />}
        />

        <Route path="/activities" element={<Activities />} />

        <Route path="/activities/:activityId" element={<ActivityDetails />} />

        <Route path="about-us" element={<About />} />
        <Route path="contact-us" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
