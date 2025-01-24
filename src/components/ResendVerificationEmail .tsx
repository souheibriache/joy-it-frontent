import React, { useState } from "react";
import { useResendVerificationEmail } from "@/utils/api/user-api";
import { Button } from "@/components/ui/button";

const ResendVerificationEmail = () => {
  const { mutateAsync: resendVerificationEmail, isLoading } =
    useResendVerificationEmail();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resendVerificationEmail({ email });
    } catch (error) {
      console.error("Error resending verification email:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-5">
      <h1 className="text-2xl font-bold">Renvoyer l'e-mail de vérification</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Entrez votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-600 p-3 rounded-lg w-96 text-gray-700 focus:outline-none"
          required
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-purple hover:bg-secondarypurple text-white font-semibold px-6 py-2"
        >
          {isLoading ? "Envoi en cours..." : "Envoyer"}
        </Button>
      </form>
    </div>
  );
};

export default ResendVerificationEmail;
