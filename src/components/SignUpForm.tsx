import { Lock, Mail, RefreshCcw, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSignupUser } from "@/utils/api/user-api";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { userName, firstName, lastName, email, password, confirmPassword } =
      formData;

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await signupUserRequest({
        userName,
        firstName,
        lastName,
        email,
        password,
      });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col items-center gap-10 h-full"
    >
      <h1 className="text-2xl font-bold ">Connectez-vous </h1>

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
            placeholder="nom d'utilisateur"
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
            placeholder="Mail"
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
        {isLoading ? "S'inscrire..." : "S'inscrir"}
      </Button>
    </form>
  );
};

export default SignUpForm;
