import logo from "../assets/logo.svg";
type Props = {};
import Instagram from "../assets/icons/instagram.png";
import Linkedin from "../assets/icons/linkedin.png";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = ({}: Props) => {
  const navigate = useNavigate();

  const links = [
    { to: "/activities", label: "Nos services" },
    { to: "#news", label: "Actualités" },
    { to: "/about-us", label: "A propos" },
    { to: "/contact-us", label: "Nous contacter" },
  ];

  const handleNavigate = (to: string) => {
    navigate(to);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="bg-gray-50 h-full mt-auto bottom-0">
      <div className="container mx-auto flex flex-col items-center justify-between h-full py-20 gap-10">
        <div className="flex flex-row items-center justify-start w-full">
          <img src={logo} className="h-20" />
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl font-bolota text-primary">
                Suivez-nous :
              </h1>
              <div className="h-1 w-1/2 bg-secondary rounded-full"></div>
            </div>
            <div className="flex gap-3 w-full mt-5">
              <a href="https://www.instagram.com/joyit.fr/" target="_blank">
                <img src={Instagram} className="h-[30px] w-[30px]" />
              </a>
              <a
                href="https://www.linkedin.com/company/joyit1/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_companies%3B5mXXNA8FT6ytlCbGdTbtRw%3D%3D"
                target="_blank"
              >
                <img src={Linkedin} className="h-[30px] w-[30px]" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl font-bolota text-primary">Navigations</h1>
              <div className="h-1 w-1/2 bg-secondary rounded-full"></div>
            </div>
            {links.map((link, index) => (
              <div
                key={index}
                className="text-gray-800 hover:underline cursor-pointer"
                onClick={() => handleNavigate(link.to)}
              >
                {link.label}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl font-bolota text-primary">
                Contacter nous
              </h1>
              <div className="h-1 w-1/2 bg-secondary rounded-full"></div>
            </div>
            <p className="text-gray-800 ">1 rue de la fontaine 75010 Paris</p>
            <p className="text-gray-800 ">contact@joyit.com</p>
            <p className="text-gray-800 ">06.32.45.78.21</p>
          </div>

          <div className="flex flex-col items-start gap-2 justify-self-end">
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl font-bolota text-primary w-3/4">
                Abonnez-vous à notre newsletter
              </h1>
              <div className="h-1 w-1/2 bg-secondary rounded-full"></div>
            </div>
            <p className="text-gray-800 hover:underline cursor-pointer">
              ​Abonnez-vous pour recevoir toutes les exclusivités de JoyIt.
            </p>
            <form className="flex flex-row p-2 px-3 bg-[#D9D9D9] items-center gap-2 w-[300px] rounded-[5px]">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border-none outline-none pl-1 w-full"
              />
              <Mail />
            </form>
          </div>
        </div>

        <div className=" text-primary  font-bolota text-lg gap-1 flex flex-row w-full">
          <div className="flex flex-col items-start  w-full">
            <h1 className="underline cursor-pointer">Mentions légales</h1>
            <h1 className="underline cursor-pointer">
              Politique de confidentialité
            </h1>
            <h1 className="underline cursor-pointer">
              Conditions générales d’utilisation
            </h1>
          </div>
          <div className="flex flex-col gap-2 items-end text-end">
            <p className="w-full text-nowrap">
              "JoyIt, le bien-être de vos équipes à portée de clic."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
