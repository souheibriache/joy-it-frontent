import { Lock, Mail, RefreshCcw, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSignupUser } from "@/utils/api/user-api";
import { useNavigate } from "react-router-dom";

type Props = {};

const SignUpForm = ({}: Props) => {
  const { signupUserRequest, isLoading } = useSignupUser();
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSuccess, setIsSuccess] = useState(false); // State to track success
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { userName, firstName, lastName, email, password, confirmPassword } =
      formData;

    if (password !== confirmPassword) {
      return alert("Les mots de passe ne correspondent pas");
    }

    try {
      await signupUserRequest({
        userName,
        firstName,
        lastName,
        email,
        password,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-5 my-auto">
        <h1 className="text-2xl font-bold text-center">
          Un email de vérification a été envoyé à votre boîte mail.
        </h1>
        <p className="text-gray-700 text-center">
          Veuillez vérifier votre boîte mail pour confirmer votre compte.
        </p>
        <Button
          onClick={() => navigate("/login")}
          className="font-semibold bg-purple hover:bg-secondarypurple text-lg p-5 px-10"
        >
          Retour à la connexion
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col items-center gap-10 h-full"
    >
      <h1 className="text-2xl font-bold">Connectez-vous</h1>

      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-row gap-2 items-center w-96">
          <div className="flex flex-row items-center border border-gray-600 text-gray-500  p-4 rounded-lg">
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              className="border-none outline-none w-full"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row items-center border border-gray-600 text-gray-500 p-4 rounded-lg">
            <input
              type="text"
              name="lastName"
              placeholder="Nom"
              className="border-none outline-none w-full"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <User />
          <input
            type="text"
            name="userName"
            placeholder="Nom d'utilisateur"
            className="border-none outline-none w-full"
            value={formData.userName}
            onChange={handleChange}
          />
          <RefreshCcw />
        </div>

        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <Mail />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-none outline-none w-full"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <Lock />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="border-none outline-none w-full"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <Lock />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            className="border-none outline-none w-full"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="font-semibold z-50 bg-purple hover:bg-secondarypurple text-lg p-5 px-10"
      >
        {isLoading ? "S'inscrire..." : "S'inscrire"}
      </Button>
    </form>
  );
};

export default SignUpForm;
