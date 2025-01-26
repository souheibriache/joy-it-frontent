import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useResetPassword } from "@/utils/api/user-api";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { toast } from "sonner";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutateAsync: resetPassword, isLoading } = useResetPassword();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!token) {
      toast.error("Jeton invalide ou manquant.");
      return;
    }

    try {
      await resetPassword({ token, password: formData.password });
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-5">
      <h1 className="text-2xl font-bold">Réinitialiser le mot de passe</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <Lock />
          <input
            type="password"
            name="password"
            placeholder="Nouveau mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="border-none outline-none w-full"
            required
          />
        </div>

        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <Lock />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border-none outline-none w-full"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-purple hover:bg-secondarypurple text-white font-semibold px-6 py-2"
        >
          {isLoading ? "Réinitialisation en cours..." : "Réinitialiser"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
