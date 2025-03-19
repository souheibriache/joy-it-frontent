import Footer from "@/components/Footer";
import MapFrame from "@/components/MapFrame";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Clock,
  Instagram,
  Linkedin,
  Mail,
  Map,
  Phone,
} from "lucide-react";

type Props = {};

const Contact = ({}: Props) => {
  return (
    <>
      <div className="flex flex-col relative">
        <div className="w-full top-0  gap-10 relative">
          <div className="bg-[url(/src/assets/landingpage_background.png)] bg-cover bg-center w-full flex flex-col gap-10 p-20 h-[50vh]">
            <ul className="flex flex-row items-center gap-2 container mx-auto">
              <li className=" text-white font-bold py-0">Accueil</li>
              <li className=" text-white font-bold py-0 border-l-2 border-white pl-2">
                Nous contacter
              </li>
            </ul>

            <div className="flex flex-col items-center justify-center gap-10 text-white">
              <h1 className="text-4xl font-bold uppercase">Nous CONTACTER</h1>
              <p className=" text-xl">
                Une question, un projet ou une collaboration ?{" "}
                <span className="font-bold">Contactez-nous</span>, notre équipe
                est à votre écoute.
              </p>
            </div>
          </div>
          <form
            action=""
            className="bg-white flex flex-col p-10 w-1/2 mx-auto mt-20 rounded-[20px]  gap-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)] -translate-y-56"
          >
            <h1 className="px-2 border-l-2 border-primary text-2xl font-bold text-primary uppercase">
              Envoyer NOUS un message{" "}
            </h1>

            <div className="flex flex-row justify-between w-full gap-10">
              <div className="flex flex-col gap-1 items-start w-full">
                <label htmlFor="lastName" className="text-lg  font-semibold">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Fanny"
                  className="focus:outline-primary border-gray-600 border text-gray-800 px-3  w-full rounded h-14"
                />
              </div>

              <div className="flex flex-col gap-1 items-start w-full">
                <label htmlFor="firstName" className="text-lg font-semibold">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Leblond"
                  className="focus:outline-primary border-gray-600 border text-gray-800 px-3  w-full rounded h-14"
                />
              </div>
            </div>

            <div className="flex flex-row justify-between w-full gap-10">
              <div className="flex flex-col gap-1 items-start w-full">
                <label htmlFor="email" className="text-lg  font-semibold">
                  Email
                </label>
                <input
                  placeholder="Fanny@renoven.fr"
                  type="email"
                  name="email"
                  className="focus:outline-primary border-gray-600 border text-gray-800 px-3  w-full rounded h-14"
                />
              </div>

              <div className="flex flex-col gap-1 items-start w-full">
                <label htmlFor="company" className="text-lg  font-semibold">
                  Numero de téléphone
                </label>
                <input
                  type="tel"
                  name="company"
                  placeholder="+33 6 33 44 55 77"
                  className="focus:outline-primary border-gray-600 border text-gray-800 px-3  w-full rounded h-14"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 items-start w-full">
              <label htmlFor="company" className="text-lg  font-semibold">
                Objet
              </label>
              <input
                type="text"
                name="company"
                placeholder="Reservation"
                className="focus:outline-primary border-gray-600 border text-gray-800 px-3  w-full rounded h-14"
              />
            </div>

            <div className="flex flex-col items-start w-full">
              <label htmlFor="message" className="text-lg font-semibold">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Bonjour..."
                className="border-gray-600 border text-gray-800 px-3 py-3 resize-none w-full rounded h-52"
              />
            </div>

            <Button
              type="submit"
              className="bg-primary hover:bg-secondary text-white text-lg font-semibold px-6 py-2 w-fit group"
            >
              Envoyer{" "}
              <ArrowRight className="group-hover:translate-x-1 duration-150" />
            </Button>
          </form>

          <div className="container mx-auto flex flex-col gap-10 -translate-y-20">
            <h1 className="pl-2 border-l-4 border-secondary font-bold text-4xl text-primary uppercase">
              Notre position
            </h1>
            <div className="grid grid-cols-4 gap-10">
              <div className="h-full w-full flex flex-row items-center gap-7 border-2 border-primary rounded-[10px] justify-center py-4 px-4">
                <Phone size={40} className="text-secondary" />
                <div className="flex flex-col gap-1 text-xl">
                  <h3 className="font-semibold">Téléphone</h3>
                  <p>06.32.45.78.21</p>
                </div>
              </div>

              <div className="h-full w-full flex flex-row items-center gap-7 border-2 border-primary rounded-[10px] justify-center py-4 px-4">
                <Map size={40} className="text-secondary" />
                <div className="flex flex-col gap-1 text-xl">
                  <h3 className="font-semibold">Adresse</h3>
                  <p>1 rue de la fontaine 75010 Paris</p>
                </div>
              </div>

              <div className="h-full w-full flex flex-row items-center gap-7 border-2 border-primary rounded-[10px] justify-center py-4 px-4">
                <Mail size={40} className="text-secondary" />
                <div className="flex flex-col gap-1 text-xl">
                  <h3 className="font-semibold">Email</h3>
                  <p>contact@joyit.com</p>
                </div>
              </div>

              <div className="h-full w-full flex flex-row items-center gap-7 border-2 border-primary rounded-[10px] justify-center py-4 px-4">
                <Clock size={40} className="text-secondary" />
                <div className="flex flex-col gap-1 text-xl">
                  <h3 className="font-semibold">Horaires</h3>
                  <p>Lundi au vendredi, de 9h à 18h.</p>
                </div>
              </div>
            </div>
            <MapFrame />
            <div className="w-fit mt-10">
              <h1 className="pl-2 border-l-4 border-secondary font-bold text-4xl text-primary uppercase">
                NOs réseaux sociaux
              </h1>
              <div className="flex justify-between w-fit gap-3 mt-5">
                <a href="https://www.instagram.com/joyit.fr/" target="_blank">
                  <Instagram
                    size={30}
                    className="cursor-pointer hover:text-primary"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/joyit1/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_companies%3B5mXXNA8FT6ytlCbGdTbtRw%3D%3D"
                  target="_blank"
                >
                  <Linkedin
                    size={30}
                    className="cursor-pointer hover:text-primary"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
