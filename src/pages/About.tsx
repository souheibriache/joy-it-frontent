"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, Plus } from "lucide-react";
import Footer from "@/components/Footer";
import AboutImage from "../assets/about-us.png";
import { type Faq, useGetFaq } from "@/utils/api/faq-api";

type Props = {};

const About = ({}: Props) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { faq, isLoading } = useGetFaq();

  const handleNavigate = (to: string) => {
    navigate(to);
    window.scrollTo({ top: 0 });
  };

  const toggleFAQ = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className="flex flex-col relative mb-10 md:mb-20">
        <div className="w-full top-0 flex flex-col gap-8 md:gap-16 relative">
          {/* Hero Section */}
          <div className="bg-[url(/src/assets/landingpage_background.png)] bg-cover bg-center w-full flex flex-col gap-4 md:gap-10 p-6 md:p-12 lg:p-20 min-h-[20vh] md:min-h-[30vh]">
            <ul className="flex flex-wrap items-center gap-2 container mx-auto uppercase text-sm md:text-base">
              <li className="text-white font-bold py-0">Accueil</li>
              <li className="text-white font-bold py-0 border-l-2 border-white pl-2">
                A Propos
              </li>
            </ul>

            <div className="flex flex-col items-center justify-center gap-4 md:gap-10 text-white">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase font-bolota text-center">
                À propos de JoyIt
              </h1>
            </div>
          </div>

          {/* Mission Section */}
          <div className="flex flex-col md:flex-row w-full items-center gap-6 md:gap-10 container mx-auto px-4">
            <img
              src={AboutImage || "/placeholder.svg"}
              alt="About JoyIt"
              className="rounded-[30px] w-full md:w-2/5 lg:w-1/3 h-auto"
            />

            <div className="flex flex-col gap-4 md:gap-5 w-full md:w-3/5 lg:w-2/3">
              <h1 className="pl-2 border-l-4 border-primary font-semibold text-2xl md:text-3xl lg:text-4xl text-primary uppercase">
                Notre mission
              </h1>
              <p className="text-base md:text-lg">
                Chez <span className="font-semibold">JoyIt</span>, notre mission
                est de promouvoir le bien-être et la cohésion au travail à
                travers des solutions simples, flexibles et accessibles à toutes
                les entreprises. Nous croyons qu'un environnement de travail
                harmonieux est la clé de la productivité et de la satisfaction
                des équipes.
              </p>
            </div>
          </div>

          {/* Values and Vision Section */}
          <div className="bg-primary w-full flex">
            <div className="container mx-auto flex flex-col md:flex-row py-8 md:py-16 gap-8 md:gap-10 text-white px-4">
              <div className="flex-1 flex flex-col gap-4 md:gap-5">
                <h1 className="text-xl md:text-2xl font-semibold uppercase">
                  Nos valeurs
                </h1>
                <ul className="flex flex-col gap-2 text-base md:text-lg lg:text-xl">
                  <li>
                    <span className="font-bold">Innovation :</span> Nous
                    innovons en permanence pour offrir les meilleures solutions
                    adaptées aux besoins des entreprises.
                  </li>
                  <li>
                    <span className="font-bold"> Bien-être :</span> Le bien-être
                    des salariés est au cœur de notre démarche.
                  </li>
                  <li>
                    <span className="font-bold">Engagement :</span> Nous
                    accompagnons chaque entreprise avec une attention
                    particulière et un suivi personnalisé.
                  </li>
                </ul>
              </div>

              <div className="hidden md:block h-auto w-[2px] bg-white rounded-full"></div>
              <div className="md:hidden h-[2px] w-full bg-white rounded-full my-4"></div>

              <div className="flex-1 flex flex-col gap-4 md:gap-5">
                <h1 className="text-xl md:text-2xl font-semibold uppercase">
                  Notre vision
                </h1>

                <p className="text-base md:text-lg lg:text-xl">
                  Nous imaginons un monde où chaque entreprise, quelle que soit
                  sa taille, peut offrir à ses collaborateurs un cadre de
                  travail propice à l'épanouissement personnel et professionnel.
                  JoyIt s'engage à être un acteur clé de cette transformation.
                </p>
              </div>
            </div>
          </div>

          {/* Platform and Why Choose Us Sections */}
          <div className="container mx-auto flex flex-col gap-8 md:gap-12 px-4">
            <div className="flex-1 flex flex-col gap-3">
              <h1 className="text-xl md:text-2xl font-semibold uppercase text-primary">
                Fonctionnement de la Plateforme
              </h1>
              <ul className="flex flex-col gap-2 text-base md:text-lg lg:text-xl list-disc ml-5 md:ml-10">
                <li>
                  <span className="font-bold text-primary">
                    Abonnements mensuels :
                  </span>{" "}
                  Choisissez le plan qui correspond à votre entreprise et
                  recevez des crédits chaque mois.
                </li>
                <li>
                  <span className="font-bold text-primary">
                    Crédits flexibles :
                  </span>{" "}
                  Utilisez vos crédits pour réserver des activités, des snacks
                  ou des services bien-être selon vos besoins.
                </li>
                <li>
                  <span className="font-bold text-primary">
                    Simplicité d'organisation :
                  </span>{" "}
                  Planifiez et gérez tout en quelques clics via une plateforme
                  intuitive.
                </li>
              </ul>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <h1 className="text-xl md:text-2xl font-semibold uppercase text-primary">
                Pourquoi nous choisir ?
              </h1>
              <ul className="flex flex-col gap-2 text-base md:text-lg lg:text-xl list-disc ml-5 md:ml-10">
                <li>
                  Une{" "}
                  <span className="font-bold text-primary">
                    solution clé en main
                  </span>{" "}
                  pour améliorer le bien-être et la cohésion de vos équipes.
                </li>
                <li>
                  Un{" "}
                  <span className="font-bold text-primary">
                    large choix d'activités
                  </span>{" "}
                  variées adaptées à toutes les entreprises et budgets.
                </li>
                <li>
                  Une{" "}
                  <span className="font-bold text-primary">
                    {" "}
                    gestion simple
                  </span>{" "}
                  grâce à un tableau de bord intuitif et des crédits flexibles.
                </li>
                <li>
                  Un{" "}
                  <span className="font-bold text-primary">
                    accompagnement personnalisé
                  </span>{" "}
                  pour répondre à vos besoins spécifiques.
                </li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="flex flex-col gap-6 md:gap-10">
              <h1 className="pl-2 border-l-4 border-secondary font-bold text-2xl md:text-3xl lg:text-4xl text-primary uppercase">
                Questions Fréquemment Posées
              </h1>

              <div className="grid grid-cols-1 gap-4 md:gap-10">
                {isLoading ? (
                  <div className="flex justify-center">
                    <Loader className="text-primary animate-spin" />
                  </div>
                ) : (
                  faq?.length > 0 &&
                  faq.map((faqQuestion: Faq) => (
                    <div
                      key={faqQuestion.id}
                      className="bg-primary bg-opacity-20 w-full sm:w-[90%] md:w-[80%] mx-auto flex flex-col gap-2 p-4 md:p-5 rounded-[10px] cursor-pointer"
                      onClick={() => toggleFAQ(faqQuestion.id)}
                    >
                      <div className="flex flex-row justify-between items-center w-full">
                        <p className="font-medium text-base md:text-lg">
                          {faqQuestion.question}
                        </p>
                        <Plus
                          className={`transition-transform duration-300 flex-shrink-0 ml-2 ${
                            openId === faqQuestion.id ? "rotate-45" : "rotate-0"
                          }`}
                        />
                      </div>

                      {/* Smooth expanding answer */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openId === faqQuestion.id
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="pt-2 text-gray-700 text-sm md:text-base">
                          {faqQuestion.answer}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <p className="text-base md:text-lg lg:text-xl">
                Si vous avez d'autres questions, n'hésitez pas à nous la poser
                sur notre page{" "}
                <span
                  onClick={() => handleNavigate("/contact-us")}
                  className="text-primary font-semibold underline cursor-pointer"
                >
                  Nous Contacter
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
