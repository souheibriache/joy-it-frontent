import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useResendVerificationEmail } from "@/utils/api/user-api";

const AccountNotVerified = ({ email }: { email: string }) => {
  const { mutateAsync: resendVerificationEmail } = useResendVerificationEmail();
  const navigate = useNavigate();

  const handleResendEmail = async () => {
    console.log({ email });
    try {
      await resendVerificationEmail({ email });
      toast.success(
        "Un e-mail de vérification a été envoyé. Veuillez vérifier votre boîte mail."
      );
    } catch (error: any) {
      toast.error(
        error.message || "Échec de l'envoi de l'e-mail de vérification."
      );
    }
  };

  return (
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
        onClick={handleResendEmail}
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
  );
};

export default AccountNotVerified;
