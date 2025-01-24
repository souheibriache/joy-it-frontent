import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Home from "./pages/Home";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import { RootState } from "./redux/store"; // Adjust the path to your store
import { useResendVerificationEmail } from "./utils/api/user-api"; // Hook for resending verification email
import { toast } from "sonner";
import VerificationNotification from "./components/VerificationNotification";
import { useFetchCompany } from "./utils/api/company-api";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

function App() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const { mutateAsync: resendVerificationEmail } = useResendVerificationEmail();

  useFetchCompany();

  useEffect(() => {
    const handleVerificationCheck = async () => {
      if (accessToken) {
        try {
          const decoded: any = jwtDecode(accessToken);
          setDecodedToken(decoded);

          if (!decoded.metadata.isVerified) {
            await resendVerificationEmail({ email: decoded.metadata.email });

            toast.success(
              "Un e-mail de vérification a été envoyé. Veuillez vérifier votre boîte mail."
            );
          }
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    };

    handleVerificationCheck();
  }, [accessToken, resendVerificationEmail]);

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
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />

        <Route path="/" element={<Home />} />

        <Route
          path="/create-company"
          element={
            <ProtectedRoute>
              <div>Create Company</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-notification"
          element={<VerificationNotification />}
        />
      </Routes>
    </div>
  );
}

export default App;
