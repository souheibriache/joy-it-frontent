import { Lock, Mail, RefreshCcw, User } from "lucide-react";
import { Button } from "./ui/button";

type Props = {};

const SignUpForm = ({}: Props) => {
  return (
    <div className="flex-1 flex flex-col items-center gap-10 h-full">
      <h1 className="text-2xl font-bold ">Connectez-vous </h1>

      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <User />
          <input
            type="email"
            placeholder="Nom complet"
            className="border-none outline-none w-full"
          />
        </div>

        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <User />
          <input
            type="email"
            placeholder="nom d'utilisateur"
            className="border-none outline-none w-full"
          />
          <RefreshCcw />
        </div>

        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <Mail />
          <input
            type="email"
            placeholder="Mail"
            className="border-none outline-none w-full"
          />
        </div>

        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <Lock />
          <input
            type="password"
            placeholder="Mot de passe"
            className="border-none outline-none w-full"
          />
        </div>

        <div className="flex flex-row items-center border border-gray-600 text-gray-500 gap-2 p-4 rounded-lg w-96">
          <Lock />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="border-none outline-none w-full"
          />
        </div>

        <div className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            className="accent-purple h-5 w-5 outline-none "
          />
          <p>Se souvenir de moi</p>
        </div>
      </div>

      <Button className="font-semibold z-50 bg-purple hover:bg-secondarypurple text-lg p-5 px-10">
        S'inscrir
      </Button>
    </div>
  );
};

export default SignUpForm;
