import logo from "../assets/logo.png";
import { Facebook, Instagram, Linkedin } from "lucide-react";
type Props = {};

const Footer = ({}: Props) => {
  return (
    <div className="bg-gray-50 h-full">
      <div className="container mx-auto flex flex-col items-center justify-between h-full py-20 gap-10">
        <div className="flex flex-row items-center justify-start w-full">
          <img src={logo} className="h-20" />
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl font-semibold text-purple">
                Nos services
              </h1>
              <div className="h-1 w-1/2 bg-purple rounded-full"></div>
            </div>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Nos teams bulding{" "}
            </p>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Nos activités bien-être
            </p>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Nos services snack
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl font-semibold text-purple">Nos blogs</h1>
              <div className="h-1 w-1/2 bg-purple rounded-full"></div>
            </div>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Article 1 : 10 idées d’activités{" "}
            </p>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Article 2 : Le bien-être au travail
            </p>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Article 3 : Les pauses gourmandes
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl font-semibold text-purple">A propos</h1>
              <div className="h-1 w-1/2 bg-purple rounded-full"></div>
            </div>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Qui sommes-nous ?{" "}
            </p>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Notre mission
            </p>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Rejoignez-nous
            </p>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Contactez-nous
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl font-semibold text-purple">
                Nous contacter
              </h1>
              <div className="h-1 w-1/2 bg-purple rounded-full"></div>
            </div>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Email : contact@joyit.com{" "}
            </p>
            <p className="text-gray-800 hover:underline cursor-pointer">
              Téléphone : +33 1 23 45 67 89
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl font-semibold text-purple">
                Suivez-nous :
              </h1>
              <div className="h-1 w-1/2 bg-purple rounded-full"></div>
            </div>
            <div className="flex justify-between w-full mt-5">
              <a href="https://instagram.com" target="_blank">
                <Instagram
                  size={30}
                  className="cursor-pointer hover:text-purple"
                />
              </a>
              <a href="https://linkedin.com" target="_blank">
                <Linkedin
                  size={30}
                  className="cursor-pointer hover:text-purple"
                />
              </a>
              <a href="https://facebook.com" target="_blank">
                <Facebook
                  size={30}
                  className="cursor-pointer hover:text-purple"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="underline cursor-pointer text-3xl font-bold  text-purple">
            Mentions légales
          </h1>
          <h1 className="underline cursor-pointer text-3xl font-bold  text-purple">
            Politique de confidentialité
          </h1>
          <h1 className="underline cursor-pointer text-3xl font-bold  text-purple">
            Conditions générales d’utilisation
          </h1>
        </div>

        <div className=" text-purple font-semibold text-lg gap-1 flex flex-col items-end w-full">
          <p>"JoyIt, le bien-être de vos équipes à portée de clic."</p>
          <p> © 2024 JoyIt. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
