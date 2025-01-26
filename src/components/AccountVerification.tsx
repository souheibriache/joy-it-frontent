import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useVerifyAccount } from "@/utils/api/user-api";

const AccountVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    mutateAsync: verifyAccount,
    isLoading,
    isError,
    isSuccess,
  } = useVerifyAccount();

  const verificationToken = searchParams.get("token");

  useEffect(() => {
    if (verificationToken) {
      verifyAccount({ verificationToken });
    }
  }, [verificationToken, verifyAccount]);

  if (!verificationToken) {
    return <p>Jeton de vérification invalide ou manquant.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-5">
      {isLoading && (
        <p>
          Chargement... Veuillez patienter pendant que nous vérifions votre
          compte.
        </p>
      )}
      {isSuccess && (
        <p className="text-green-600 font-bold">
          Félicitations ! Vous avez confirmé votre compte avec succès.
        </p>
      )}
      {isError && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-600 font-bold">
            Échec de la vérification. Veuillez réessayer plus tard.
          </p>
          <Button
            onClick={() => navigate("/resend-verification-email")}
            className="bg-secondarypurple hover:bg-purple text-white font-semibold px-6 py-2"
          >
            Renvoyer l'e-mail de vérification
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountVerification;
