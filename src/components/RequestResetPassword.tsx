import React, { useState } from "react";
import { useRequestResetPassword } from "@/utils/api/user-api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const RequestResetPassword = () => {
  const { mutateAsync: requestResetPassword, isSuccess } =
    useRequestResetPassword();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestResetPassword({ login: email });
    } catch (error) {
      console.error("Error requesting password reset:", error);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Email envoyé</CardTitle>
          <CardDescription className="text-center">
            Si un compte existe avec cet email, vous recevrez un lien pour
            réinitialiser votre mot de passe.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link to="/login">
            <Button className="text-white">Retour à la connexion</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Mot de passe oublié
        </CardTitle>
        <CardDescription className="text-center">
          Entrez votre email pour recevoir un lien de réinitialisation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button type="submit" className="w-full text-white">
              Envoyer le lien
            </Button>
            <Link
              to="/login"
              className="text-sm text-center text-primary hover:underline"
            >
              Retour à la connexion
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestResetPassword;
