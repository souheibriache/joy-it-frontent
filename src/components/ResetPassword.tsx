import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useResetPassword } from "@/utils/api/user-api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutateAsync: resetPassword, error } = useResetPassword();
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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

  if (error) {
    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-destructive">
            Erreur
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">{error.message}</p>
          <Button
            className="text-white"
            onClick={() => navigate("/forgot-password")}
          >
            Demander un nouveau lien
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Réinitialiser le mot de passe
        </CardTitle>
        <CardDescription className="text-center">
          Créez un nouveau mot de passe pour votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nouveau mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full text-white">
            Réinitialiser le mot de passe
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
