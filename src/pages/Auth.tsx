import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
import { useLocation, useNavigate } from "react-router-dom";
import RequestResetPassword from "@/components/RequestResetPassword";
import ResetPassword from "@/components/ResetPassword";
type Props = {};
const Auth = ({}: Props) => {
  const [authValue, setAuthValue] = useState<string>("login");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setAuthValue(location.pathname.split("/")[1]);
  }, [location]);

  const authRenderer = () => {
    switch (authValue) {
      case "login":
        return <LoginForm />;
      case "sign-up":
        return <SignUpForm />;
      case "forgot-password":
        return <RequestResetPassword />;
      case "reset-password":
        return <ResetPassword />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <div className="overflow-hidden relative h-[calc(100vh-100px)] w-full">
      <div className="container mx-auto flex flex-row h-full">
        <div className="flex flex-col justify-evenly flex-1 items-center p-40 py-32 relative -translate-x-24 ">
          <img src={logo} className="h-32" />
          <h1 className="text-3xl font-bold text-primary text-nowrap">
            Rejoignez-nous en quelques clics !
          </h1>
          <p className="text-xl text-center text-gray-900 w-3/4">
            Inscrivez-vous ou connectez-vous pour organiser facilement des
            activités et renforcer la cohésion de votre équipe.
          </p>
          <Button
            onClick={() =>
              navigate(authValue === "login" ? "/sign-up" : "/login")
            }
            variant="outline"
            className="border-2 z-10 border-primary text-primary font-semibold text-lg hover:bg-white hover:text-secondary hover:border-secondary"
          >
            {authValue === "login" ? "S'inscrire" : "Se connecter"}
          </Button>

          <div className="absolute shadow-xl z-0 shadow-black/20 h-[140%] w-[140%] right-5 rounded-full"></div>
        </div>
        <div className="flex-1 flex flex-col items-center py-24 gap-10 h-full">
          {authRenderer()}
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-2xl font-bold">Contactez-nous</h1>
            <div className="flex flex-row gap-5">
              <a href="https://instagram.com" target="_blank">
                <Instagram
                  size={30}
                  className="cursor-pointer hover:text-primary"
                />
              </a>
              <a href="https://linkedin.com" target="_blank">
                <Linkedin
                  size={30}
                  className="cursor-pointer hover:text-primary"
                />
              </a>
              <a href="https://facebook.com" target="_blank">
                <Facebook
                  size={30}
                  className="cursor-pointer hover:text-primary"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-16 -translate-x-16">
        <div className="relative">
          <div className="absolute h-10 w-10 rounded-full bg-lightred -translate-y-36 translate-x-24"></div>
          <div className="absolute h-20 w-20 rounded-full bg-lightred -translate-y-24 translate-x-36"></div>
          <div className="absolute h-36 w-36 rounded-full bg-lightred -translate-y-4 translate-x-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
