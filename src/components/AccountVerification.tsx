import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  useResendVerificationEmail,
  useVerifyAccount,
} from "@/utils/api/user-api";
import { jwtDecode } from "jwt-decode";

const AccountVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyAccount = useVerifyAccount();
  const resendVerificationEmail = useResendVerificationEmail();
  const token = searchParams.get("token");
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const decodedToken: any = accessToken ? jwtDecode(accessToken) : null;
  const email = decodedToken?.metadata?.email;
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (token) {
      verifyAccount.mutate(
        { verificationToken: token },
        {
          onSuccess: () => {
            setVerificationStatus("success");
          },
          onError: () => {
            setVerificationStatus("error");
          },
        }
      );
    }
  }, [token]);

  const handleResendVerification = () => {
    const emailToSend = email || userEmail;
    if (!emailToSend) return;
    resendVerificationEmail.mutate(
      { email: emailToSend },
      {
        // onSuccess: () => alert("Verification email resent successfully."),
        // onError: (error) => alert(error.message || "Error resending email."),
      }
    );
  };

  if (verificationStatus === "success") {
    if (accessToken) {
      navigate("/create-company");
      return null;
    }
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Compte vérifié avec succès !
        </h1>
        <Button
          onClick={() => navigate("/login")}
          className="text-white bg-purple hover:bg-purple-800"
        >
          Retour à la connexion
        </Button>
      </div>
    );
  }

  return email ? (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Votre compte n'est pas encore vérifié
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Veuillez vérifier votre boîte mail et cliquer sur le lien de
        vérification. Si vous n'avez pas reçu l'e-mail, vous pouvez en envoyer
        un nouveau.
      </p>
      <Button
        onClick={handleResendVerification}
        className="mb-4 text-white bg-purple hover:bg-purple-800"
      >
        Renvoyer l'e-mail de vérification
      </Button>
      <Button
        onClick={() => navigate("/login")}
        variant="outline"
        className="border-purple-600 border-2 border-purple text-purple hover:border-purple-800 hover:text-purple-800"
      >
        Retour à la connexion
      </Button>
    </div>
  ) : (
    <form className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Votre compte n'est pas encore vérifié
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Veuillez entrer votre adresse e-mail pour recevoir un nouveau lien de
        vérification.
      </p>
      <input
        type="email"
        placeholder="Entrez votre email"
        className="mb-4 p-2 border rounded"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <Button
        onClick={handleResendVerification}
        className="mb-4 text-white bg-purple hover:bg-purple-800"
      >
        Renvoyer l'e-mail de vérification
      </Button>
      <Button
        onClick={() => navigate("/login")}
        variant="outline"
        className="border-purple-600 border-2 border-purple text-purple hover:border-purple-800 hover:text-purple-800"
      >
        Retour à la connexion
      </Button>
    </form>
  );
};

export default AccountVerification;
