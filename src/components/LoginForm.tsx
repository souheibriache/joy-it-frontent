import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Lock, Mail } from "lucide-react";
import { useLoginUser } from "@/utils/api/user-api";

type Props = {};

const LoginForm = ({}: Props) => {
  const { loginUserRequest, isLoading } = useLoginUser();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUserRequest(formData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col items-center gap-10 h-full"
    >
      <h1 className="text-2xl font-bold">Connectez-vous</h1>

      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <Mail />
          <input
            type="email"
            name="login"
            placeholder="Mail"
            value={formData.login}
            onChange={handleChange}
            className="border-none outline-none w-full"
            required
          />
        </div>

        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <Lock />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="border-none outline-none w-full"
            required
          />
        </div>

        <div className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            className="accent-primary h-5 w-5 outline-none"
          />
          <p>Se souvenir de moi</p>
        </div>
        <div className="flex flex-row gap-2 items-center hover:text-primary hover:underline">
          <Link to="/forgot-password">mot de passe oublié</Link>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="font-semibold z-20 bg-primary hover:bg-secondary text-lg text-white p-5 px-10"
      >
        {isLoading ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </form>
  );
};

export default LoginForm;
