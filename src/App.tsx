"use client";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import type { AppDispatch, RootState } from "./redux/store"; // Adjust the path to your store
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
import { companyInfo } from "./components/chatBot/info";
import ChatMessage from "./components/chatBot/ChatMessage";
import ChatForm from "./components/chatBot/ChatForm";
import ChatBotIcon from "./components/chatBot/ChatBotIcon";
import { X } from "lucide-react";
import Blog from "./pages/Blog";
import ArticleDetails from "./pages/ArticleDetails";
import AccountSettings from "./pages/AccountSettings";
import Reservations from "./pages/Reservations";
import Cookies from "js-cookie";
import LoadingLogo from "./assets/loading-logo.svg";
import CookieConsent, {
  type CookiePreferences,
} from "./components/CookiesConcent";

const VITE_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDaDRbo8BT55cYXdfpN_oH4mVP0lCQgC_k";
function App() {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { currentCompany } = useSelector((state: RootState) => state.company);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [cookiesVisible, setCookiesVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchCompany } = useFetchCompany();

  // First useEffect to fetch company data
  useEffect(() => {
    if (accessToken) {
      const loadCompanyData = async () => {
        try {
          await fetchCompany();
        } catch (error) {
          console.error("Error fetching company:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadCompanyData();
    } else {
      setIsLoading(false);
    }
  }, [accessToken]);

  // Second useEffect to handle redirections based on token and company
  useEffect(() => {
    if (!accessToken || isLoading) return;

    try {
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
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [accessToken, navigate, dispatch, currentCompany, isLoading]);

  // Show loading state while checking authentication and company

  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);
  const generateBotResponse = async (history: any) => {
    // Helper function to update chat history
    const updateHistory = (text: any, isError = false) => {
      setChatHistory((prev: any) => [
        ...prev.filter((msg: any) => msg.text != "Chargement..."),
        { role: "model", text, isError },
      ]);
    };
    // Format chat history for API request
    history = history.map(({ role, text }: any) => ({
      role,
      parts: [{ text }],
    }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };
    try {
      // Make the API call to get the bot's response
      const response = await fetch(VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok)
        throw new Error(data?.error.message || "Something went wrong!");
      // Clean and update chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error: any) {
      // Update chat history with the error message
      updateHistory(error.message, true);
    }
  };
  useEffect(() => {
    // Auto-scroll whenever chat history updates
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cookiePreferences = Cookies.get("cookie-preferences");
    if (!cookiePreferences) {
      // Show cookie banner after a short delay if no preferences are saved
      const timer = setTimeout(() => {
        setCookiesVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCookieAccept = (preferences: CookiePreferences) => {
    setCookiesVisible(false);

    // Apply cookie preferences (e.g., initialize analytics if consented)
    if (preferences.analytics) {
      // Initialize analytics here
      console.log("Analytics initialized");
    }

    if (preferences.marketing) {
      // Initialize marketing pixels here
      console.log("Marketing pixels initialized");
    }
  };

  // Show loading state while checking authentication and company
  if (isLoading && accessToken) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-bounce rounded-full h-32 w-32">
          <img src={LoadingLogo} />
        </div>
      </div>
    );
  }

  return (
    <div className="font-new-order relative h-[100vh] flex flex-col">
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

        <Route
          path="/my-account"
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-reservations"
          element={
            <ProtectedRoute>
              <Reservations />
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
        <Route path="/blog" element={<Blog />} />

        <Route path="/blog/:articleId" element={<ArticleDetails />} />

        <Route path="/activities/:activityId" element={<ActivityDetails />} />

        <Route path="about-us" element={<About />} />
        <Route path="contact-us" element={<Contact />} />
      </Routes>

      <div className={` container ${showChatbot ? "show-chatbot" : ""}`}>
        <button
          onClick={() => setShowChatbot((prev) => !prev)}
          id="chatbot-toggler"
        >
          <span className="material-symbols-rounded">
            <ChatBotIcon />
          </span>
          <span className="material-symbols-rounded">
            <X size={30} />
          </span>
        </button>
        <div className="chatbot-popup z-[100]">
          {/* Chatbot Header */}
          <div className="chat-header">
            <div className="header-info">
              <ChatBotIcon />
              <h2 className="logo-text">Joy-bot</h2>
            </div>
            <button
              onClick={() => setShowChatbot((prev) => !prev)}
              className="material-symbols-rounded"
            >
              <X />
            </button>
          </div>
          {/* Chatbot Body */}
          <div ref={chatBodyRef} className="chat-body">
            <div className="message bot-message">
              <div className="flex items-center justify-center rounded-full bg-[#13534B] h-10 w w-10">
                <ChatBotIcon />
              </div>
              <p className="message-text">
                Bonjour,
                <br />
                Comment puis-je vous aider aujourd'hui ?
              </p>
            </div>
            {/* Render the chat history dynamically */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>
          {/* Chatbot Footer */}
          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      {cookiesVisible && <CookieConsent onAccept={handleCookieAccept} />}
    </div>
  );
}

export default App;
