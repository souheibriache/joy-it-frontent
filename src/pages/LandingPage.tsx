import { Button } from "@/components/ui/button";
import sophie from "../assets/people/Group 1063.png";
import thomas from "../assets/people/Rectangle 3097.png";
import Landing from "../assets/landing.png";
import Footer from "@/components/Footer";
import { Sandwich, Trophy } from "lucide-react";
import yogaIcon from "../assets/yoga-icon.svg";
import NewBadge from "../assets/new.svg";
import Testimonials from "../assets/woman-testimonials.png";
import ContactImage from "../assets/contact-image.png";

type Props = {};

const LandingPage = ({}: Props) => {
  return (
    <div className="flex-col gap-20">
      <div className="flex flex-col w-full items-center overflow-hidden relative gap-32">
        <div className="flex flex-row gap-20 px-20 pt-52 container mx-auto">
          <div className="flex-1 flex flex-col items-start gap-5 p-y-32 pr-40 h-full">
            <h1 className="text-4xl font-bold text-purple  ">
              Boostez le bien-être et la cohésion de vos équipes avec Joy-It !
            </h1>
            <p className="text-lg  text-gray-900 text-justify">
              Simplifiez l'organisation d'activités qui boostent le bien-être et
              la cohésion de vos équipes. Avec Joy-It, découvrez des solutions
              adaptées à vos besoins, gérées en toute simplicité grâce à une
              plateforme intuitive et un système de crédits flexible.
            </p>
            <Button className="bg-purple hover:bg-secondarypurple">
              Découvrir nos offres
            </Button>
          </div>

          <div className="flex-1 flex flex-col items-center gap-32 p-y-32 ">
            <div className="flex flex-col  p-8 pl-20 gap-2 rounded-[40px] bg-lightred bg-opacity-20 relative translate-x-20">
              <h1 className="text-xl font-bold">Thomas, Manager</h1>
              <p>" Des activités variées et un vrai gain de temps ! "</p>
              <div className="absolute top-0 left-0 -translate-y-20 -translate-x-24">
                <div className="relative z-10">
                  <img
                    src={thomas}
                    alt="Thomas"
                    className="w-36 rounded-full z-10 relative" /* Make image inside the border */
                  />
                  <div className="absolute inset-0 border border-black translate-x-5 translate-y-3 rounded-full z-0"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-8  pr-20 gap-2 rounded-[40px] bg-lightred bg-opacity-20 relative -translate-x-20 ">
              <h1 className="text-xl font-bold">Sophie, RH</h1>
              <p>“Simple, rapide et efficace. Les équipes adorent ! “</p>
              <div className="absolute top-0 right-0 -translate-y-20 translate-x-24">
                <div className="relative z-10">
                  <img
                    src={sophie}
                    alt="Thomas"
                    className="w-36 rounded-full z-10 relative" /* Make image inside the border */
                  />
                  <div className="absolute inset-0 border border-black translate-x-5 translate-y-3 rounded-full z-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row p-20 bg-lightred bg-opacity-20 gap-16  justify-center rounded-[20px]  container px-20">
          <img className="flex-1 h-[60vh] w-auto" src={Landing} alt="" />
          <div className="flex flex-1 flex-col self-center gap-5">
            <h1 className="text-purple font-bold text-2xl">
              Pourquoi choisir Joy-It ?
            </h1>
            <div className="flex flex-col gap-3 w-5/6 text-xl ">
              <li>
                <span className="font-semibold">Simplifiez</span> l'organisation
                de vos activités de bien-être grâce à une plateforme intuitive.
              </li>
              <li>
                <span className="font-semibold">Accédez</span> à un catalogue
                varié d’activités engageantes et adaptées à vos équipes.
              </li>
              <li>
                <span className="font-semibold">Profitez</span> d’un système de
                crédits flexible et ludique pour mieux gérer votre budget.
              </li>

              <li>
                <span className="font-semibold">Renforcez</span> la cohésion et
                la motivation de vos collaborateurs.
              </li>
              <li>
                <span className="font-semibold">Gagnez</span> du temps tout en
                proposant des expériences uniques et impactantes.
              </li>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-20 container mx-auto px-20">
          <h1 className="text-3xl font-bold text-purple">
            Nos services pour votre entreprise !
          </h1>

          <div className="flex flex-row flex-wrap justify-center gap-x-32 gap-y-20">
            <div className="flex flex-col items-center gap-1">
              <div className="h-52 w-52 rounded-full flex items-center justify-center border-2 border-black">
                <Trophy className="" size={75} />
              </div>
              <h3 className="text-xl font-semibold">Team Building</h3>
              <p className="w-64 text-center">
                Organisez des activités ludiques et créatives pour renforcer la
                cohésion et l'esprit d'équipe.
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="h-52 w-52 rounded-full flex items-center justify-center border-2 border-black">
                <img src={yogaIcon} className=" " />
              </div>{" "}
              <h3 className="text-xl font-semibold">Bien-être et Santé</h3>
              <p className="w-64 text-center">
                Proposez à vos collaborateurs des ateliers de gestion du stress,
                de relaxation, ou encore des séances de sport.
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="h-52 w-52 rounded-full flex items-center justify-center border-2 border-black">
                <Sandwich className="" size={75} />
              </div>{" "}
              <h3 className="text-xl font-semibold">Snacks Healthy</h3>
              <p className="w-64 text-center">
                Adoptez une alimentation équilibrée au travail avec nos paniers
                de snacks bio et énergétiques.
              </p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="h-52 w-52 rounded-full flex items-center justify-center border-2 border-black">
                <img src={NewBadge} className=" " />
              </div>{" "}
              <h3 className="text-xl font-semibold">
                Bonus : Une activité inédite chaque mois !
              </h3>
              <p className="w-64 text-center">
                Pour bien commencer, Joy-It propose une activité exclusive
                chaque mois, spécialement conçue pour vos équipes.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row bg-lightred bg-opacity-20 h-52 w-full">
          <div className="container mx-auto flex flex-row gap-32 items-center px-20">
            <img src={Testimonials} className="h-full scale-125" alt="" />
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl font-bold text-purple uppercase">
                Ils ont choisi Joy-It et en parlent mieux que nous !
              </h1>
              <p className="text-2xl">
                “Grâce à Joy-It, nos équipes sont plus soudées et motivées.”{" "}
              </p>
              <h2 className="text-3xl font-semibold">Clara, DRH</h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col container mx-auto px-20 items-center gap-10">
          <h1 className="text-4xl text-purple font-bold">
            Une démarche responsable et durable !
          </h1>
          <p className="text-xl text-center px-40 text-gray-700">
            Nos services sont pensés pour soutenir votre politique de
            Responsabilité Sociétale des Entreprises (RSE). En collaborant avec
            Joy-It, vous favorisez un cadre de travail équilibré et respectueux
            de l'environnement, tout en consolidant vos valeurs éthiques et
            sociétales.
          </p>
        </div>

        <div className="flex flex-row w-full bg-beige bg-opacity-40">
          <div className="flex bg-purple bg-opacity-80 relative w-2/5 ">
            <img src={ContactImage} className=" absolute h-auto w-auto" />
            <h1 className="text-4xl text-white font-bold w-full text-center p-20 z-10">
              Prêt à offrir le meilleur à vos collaborateurs ?
            </h1>
          </div>
          <div className="flex flex-col justify-center p-20 gap-10 w-3/5">
            <h1 className="text-4xl font-bold text-purple">
              Envie de dynamiser vos équipes ?<br /> Contactez-nous !
            </h1>
            <form
              action=""
              className="flex flex-col items-center gap-10 w-full"
            >
              <div className="flex flex-row justify-between w-full gap-10">
                <div className="flex flex-col gap-1 items-start w-full">
                  <label
                    htmlFor="lastName"
                    className="text-lg text-purple font-semibold"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="focus:outline-purple border-gray-600 border text-gray-800 px-3  w-full rounded h-14"
                  />
                </div>

                <div className="flex flex-col gap-1 items-start w-full">
                  <label
                    htmlFor="firstName"
                    className="text-lg text-purple font-semibold"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="focus:outline-purple border-gray-600 border text-gray-800 px-3  w-full rounded h-14"
                  />
                </div>
              </div>

              <div className="flex flex-row justify-between w-full gap-10">
                <div className="flex flex-col gap-1 items-start w-full">
                  <label
                    htmlFor="email"
                    className="text-lg text-purple font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="focus:outline-purple border-gray-600 border text-gray-800 px-3  w-full rounded h-14"
                  />
                </div>

                <div className="flex flex-col gap-1 items-start w-full">
                  <label
                    htmlFor="company"
                    className="text-lg text-purple font-semibold"
                  >
                    Société
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="focus:outline-purple border-gray-600 border text-gray-800 px-3  w-full rounded h-14"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <label
                  htmlFor="message"
                  className="text-lg text-purple font-semibold"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  className="border-gray-600 border text-gray-800 px-3 py-3 resize-none w-full rounded h-52"
                />
              </div>

              <Button
                type="submit"
                className="bg-purple hover:bg-secondarypurple text-white text-lg font-semibold px-6 py-2"
              >
                Envoyer ma demande
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
