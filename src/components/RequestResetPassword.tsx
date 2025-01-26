import React, { useState } from "react";
import { useRequestResetPassword } from "@/utils/api/user-api";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RequestResetPassword = () => {
  const {
    mutateAsync: requestResetPassword,
    isLoading,
    isSuccess,
  } = useRequestResetPassword();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestResetPassword({ login: email });
    } catch (error) {
      console.error("Error requesting password reset:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-5">
      {isSuccess ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold text-green-600">Succès !</h1>
          <p className="text-lg text-gray-700">
            Un e-mail a été envoyé à <span className="font-bold">{email}</span>.
            Veuillez vérifier votre boîte mail pour réinitialiser votre mot de
            passe. Si vous ne trouvez pas l'e-mail, veuillez vérifier votre
            dossier de courrier indésirable.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="bg-purple hover:bg-secondarypurple text-white font-semibold px-6 py-2"
          >
            Retour à la connexion
          </Button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">
            Demande de réinitialisation de mot de passe
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
              <Mail />
              <input
                type="email"
                name="email"
                placeholder="Entrez votre e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-none outline-none w-full"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-purple hover:bg-secondarypurple text-white font-semibold px-6 py-2"
            >
              {isLoading ? "Envoi en cours..." : "Envoyer"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default RequestResetPassword;
