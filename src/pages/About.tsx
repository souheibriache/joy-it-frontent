import { Link } from "react-router-dom";
import AboutUsImage from "../assets/about.png";
import Footer from "@/components/Footer";
type Props = {};

const About = ({}: Props) => {
  return (
    <>
      <div className="container mx-auto flex flex-col py-24 gap-20">
        <section className="flex flex-row gap-20 ">
          <div className="flex flex-col flex-1 gap-3">
            <h1 className=" flex flex-row items-center text-3xl font-bold text-purple mb-10 gap-3 uppercase">
              <div className="w-0 h-0 border-[15px] border-transparent border-l-purple border-r-0"></div>{" "}
              À propos de JoyIt
            </h1>
            <h2 className="text-2xl pl-3 border-l-4 border-purple text-purple font-bold uppercase">
              Notre mission
            </h2>
            <p className="text-2xl  text-justify leading-snug">
              Chez JoyIt, notre mission est de promouvoir le bien-être et la
              cohésion au travail à travers des solutions simples, flexibles et
              accessibles à toutes les entreprises, quelles que soient leur
              taille et leur structure. Nous croyons fermement qu’un
              environnement de travail harmonieux est la clé de la productivité,
              de l’épanouissement personnel et de la satisfaction des équipes.
              En favorisant des interactions positives et un cadre professionnel
              motivant, nous aidons les entreprises à créer une culture où
              chaque collaborateur se sent valorisé, engagé et en phase avec les
              objectifs de l’organisation.
            </p>
          </div>
          <div className="flex-1 h-fit relative">
            <div className="relative aspect-square h-3/4 w-3/4">
              <img src={AboutUsImage} alt="" className="z-10 relative " />
              <div className="absolute border-2 h-full w-full border-gray-600 translate-x-16 translate-y-5  top-0 le rounded-full z-0 inset-0"></div>
            </div>
          </div>
        </section>
        <section className="flex flex-row text-2xl  gap-20 text-justify">
          <div className="flex flex-col gap-5 flex-1">
            <h2 className="text-2xl pl-3 border-l-4 border-purple text-purple font-bold uppercase">
              Nos valeurs
            </h2>

            <ul className="list-outside list-disc marker:text-purple ml-10 flex flex-col gap-3">
              <li>
                <span className="font-bold text-purple">Innovation :</span> Nous
                innovons en permanence pour offrir les meilleures solutions
                adaptées aux besoins des entreprises.
              </li>
              <li>
                <span className="font-bold text-purple">Bien-être :</span> Le
                bien-être des salariés est au cœur de notre démarche.
              </li>
              <li>
                <span className="font-bold text-purple">Engagement :</span> Nous
                accompagnons chaque entreprise avec une attention particulière
                et un suivi personnalisé.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5 flex-1">
            <h2 className="text-2xl pl-3 border-l-4 border-purple text-purple font-bold uppercase">
              Notre vision
            </h2>

            <p>
              Nous imaginons un monde où chaque entreprise, quelle que soit sa
              taille, peut offrir à ses collaborateurs un cadre de travail
              propice à l’épanouissement personnel et professionnel. JoyIt
              s’engage à être un acteur clé de cette transformation.
            </p>
          </div>
        </section>
        <section className="flex flex-row text-2xl  gap-20 text-justify">
          <div className="flex flex-col gap-5 flex-1">
            <h2 className="text-2xl pl-3 border-l-4 border-purple text-purple font-bold uppercase">
              Fonctionnement de la Plateforme
            </h2>

            <ul className="list-outside list-disc marker:text-purple ml-10 flex flex-col gap-3">
              <li>
                <span className="font-bold text-purple">
                  Abonnements mensuels :
                </span>{" "}
                Choisissez le plan qui correspond à votre entreprise et recevez
                des crédits chaque mois.
              </li>
              <li>
                <span className="font-bold text-purple">
                  Crédits flexibles :
                </span>{" "}
                Utilisez vos crédits pour réserver des activités, des snacks ou
                des services bien-être selon vos besoins.
              </li>
              <li>
                <span className="font-bold text-purple">
                  Simplicité d’organisation :
                </span>{" "}
                Planifiez et gérez tout en quelques clics via une plateforme
                intuitive.
              </li>
            </ul>
          </div>
        </section>

        <section className="flex flex-row text-2xl  gap-20 text-justify">
          <div className="flex flex-col gap-5 flex-1">
            <h2 className="text-2xl pl-3 border-l-4 border-purple text-purple font-bold uppercase">
              Pourquoi nous choisir ?
            </h2>

            <ul className="list-outside list-disc marker:text-purple ml-10 flex flex-col gap-3">
              <li>
                <span className="font-bold text-purple">
                  Une solution clé en main
                </span>{" "}
                pour améliorer le bien-être et la cohésion de vos équipes.
              </li>
              <li>
                <span className="font-bold text-purple">
                  Un large choix d’activités
                </span>{" "}
                variées adaptées à toutes les entreprises et budgets.
              </li>
              <li>
                <span className="font-bold text-purple">
                  Une gestion simple
                </span>{" "}
                grâce à un tableau de bord intuitif et des crédits flexibles.
              </li>
              <li>
                <span className="font-bold text-purple">
                  Un accompagnement personnalisé
                </span>{" "}
                pour répondre à vos besoins spécifiques.
              </li>
            </ul>
          </div>
        </section>

        <p className="text-2xl">
          Si vous avez une question, n’hésitez pas à nous la poser sur notre
          page{" "}
          <Link
            to="/contact-us"
            className="hover:underline font-semibold text-purple"
          >
            Nous Contacter.
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
