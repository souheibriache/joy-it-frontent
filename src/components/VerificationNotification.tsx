import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const VerificationNotification = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-5">
      <h1 className="text-2xl font-bold">Vérification requise</h1>
      <p className="text-lg text-gray-700 text-center">
        Un e-mail de vérification a été envoyé à votre adresse e-mail. Veuillez
        vérifier votre boîte mail pour confirmer votre compte.
      </p>
      <Button
        onClick={() => navigate("/login")}
        className="bg-primary hover:bg-secondary text-white font-semibold px-6 py-2"
      >
        Retour à la connexion
      </Button>
    </div>
  );
};

export default VerificationNotification;
