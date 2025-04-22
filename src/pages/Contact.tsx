"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  Clock,
  Instagram,
  Linkedin,
  Mail,
  Map,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import MapFrame from "@/components/MapFrame";
import {
  useSubmitSupportUser,
  useSubmitSupportVisitor,
} from "@/utils/api/contact-api";
import { RootState } from "@/redux/store";

type Props = {};

const Contact = ({}: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const isLoggedIn = Boolean(currentUser);

  // React Query hooks
  const visitorMutation = useSubmitSupportVisitor();
  const userMutation = useSubmitSupportUser();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoggedIn) {
      await userMutation.mutateAsync({
        question: message,
        subject,
      });
    } else {
      await visitorMutation.mutateAsync({
        firstName,
        lastName,
        email,
        phoneNumber: phone,
        question: message,
        subject,
      });
    }

    if (!isLoggedIn) {
      setFirstName("");
      setLastName("");
      setEmail("");
    }
    setPhone("");
    setSubject("");
    setMessage("");
  };

  return (
    <>
      <div className="flex flex-col relative">
        {/* Hero Section */}
        <div className="w-full relative">
          <div className="bg-[url(/src/assets/landingpage_background.png)] bg-cover bg-center w-full flex flex-col gap-4 md:gap-10 p-6 md:p-12 lg:p-20 min-h-[40vh] md:min-h-[50vh]">
            <ul className="flex flex-wrap items-center gap-2 container mx-auto uppercase text-sm md:text-base">
              <li className="text-white font-bold py-0">Accueil</li>
              <li className="text-white font-bold py-0 border-l-2 border-white pl-2">
                Nous contacter
              </li>
            </ul>

            <div className="flex flex-col items-center justify-center gap-4 md:gap-10 text-white text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase font-bolota">
                Nous CONTACTER
              </h1>
              <p className="text-base md:text-lg lg:text-xl max-w-2xl">
                Une question, un projet ou une collaboration ?{" "}
                <span className="font-bold">Contactez-nous</span>, notre équipe
                est à votre écoute.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white flex flex-col p-6 md:p-10 w-[90%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-1/2 mx-auto mt-8 md:mt-16 rounded-[20px] gap-6 md:gap-10 shadow-md md:-translate-y-20 lg:-translate-y-32 xl:-translate-y-56"
          >
            <h1 className="px-2 border-l-2 border-primary text-xl md:text-2xl font-bold text-primary uppercase">
              Envoyer un message
            </h1>

            {!isLoggedIn && (
              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <div className="flex-1 flex flex-col gap-1">
                  <label
                    htmlFor="lastName"
                    className="text-base md:text-lg font-semibold"
                  >
                    Nom
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Leblond"
                    className="focus:outline-primary border border-gray-600 px-3 rounded h-12 md:h-14"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label
                    htmlFor="firstName"
                    className="text-base md:text-lg font-semibold"
                  >
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Fanny"
                    className="focus:outline-primary border border-gray-600 px-3 rounded h-12 md:h-14"
                    required
                  />
                </div>
              </div>
            )}

            {!isLoggedIn && (
              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <div className="flex-1 flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="text-base md:text-lg font-semibold"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="fanny@renoven.fr"
                    className="focus:outline-primary border border-gray-600 px-3 rounded h-12 md:h-14"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label
                    htmlFor="phone"
                    className="text-base md:text-lg font-semibold"
                  >
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 33 44 55 77"
                    className="focus:outline-primary border border-gray-600 px-3 rounded h-12 md:h-14"
                    required={!isLoggedIn}
                  />
                </div>
              </div>
            )}

            {isLoggedIn && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-base md:text-lg font-semibold"
                >
                  Téléphone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33 6 33 44 55 77"
                  className="focus:outline-primary border border-gray-600 px-3 rounded h-12 md:h-14"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label
                htmlFor="subject"
                className="text-base md:text-lg font-semibold"
              >
                Objet
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Réservation"
                className="focus:outline-primary border border-gray-600 px-3 rounded h-12 md:h-14"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="message"
                className="text-base md:text-lg font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bonjour..."
                className="border border-gray-600 px-3 py-3 rounded resize-none h-36 md:h-52"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={visitorMutation.isLoading || userMutation.isLoading}
              className="bg-primary hover:bg-secondary text-white text-base md:text-lg font-semibold px-4 md:px-6 py-2 w-fit flex items-center gap-2"
            >
              Envoyer
              <ArrowRight className="group-hover:translate-x-1 duration-150" />
            </Button>
          </form>

          {/* Contact Info and Map */}
          <div className="container mx-auto flex flex-col gap-8 md:gap-10 px-4 mt-8 md:mt-0 md:-translate-y-0 lg:-translate-y-10">
            <h1 className="pl-2 border-l-4 border-secondary font-bold text-2xl md:text-3xl lg:text-4xl text-primary uppercase">
              Notre position
            </h1>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10">
              <div className="h-full w-full flex flex-row items-center gap-4 md:gap-7 border-2 border-primary rounded-[10px] justify-center py-4 px-4">
                <Phone size={30} className="text-secondary flex-shrink-0" />
                <div className="flex flex-col gap-1 text-base md:text-lg lg:text-xl">
                  <h3 className="font-semibold">Téléphone</h3>
                  <p>06.32.45.78.21</p>
                </div>
              </div>

              <div className="h-full w-full flex flex-row items-center gap-4 md:gap-7 border-2 border-primary rounded-[10px] justify-center py-4 px-4">
                <Map size={30} className="text-secondary flex-shrink-0" />
                <div className="flex flex-col gap-1 text-base md:text-lg lg:text-xl">
                  <h3 className="font-semibold">Adresse</h3>
                  <p>1 rue de la fontaine 75010 Paris</p>
                </div>
              </div>

              <div className="h-full w-full flex flex-row items-center gap-4 md:gap-7 border-2 border-primary rounded-[10px] justify-center py-4 px-4">
                <Mail size={30} className="text-secondary flex-shrink-0" />
                <div className="flex flex-col gap-1 text-base md:text-lg lg:text-xl">
                  <h3 className="font-semibold">Email</h3>
                  <p>contact@joyit.com</p>
                </div>
              </div>

              <div className="h-full w-full flex flex-row items-center gap-4 md:gap-7 border-2 border-primary rounded-[10px] justify-center py-4 px-4">
                <Clock size={30} className="text-secondary flex-shrink-0" />
                <div className="flex flex-col gap-1 text-base md:text-lg lg:text-xl">
                  <h3 className="font-semibold">Horaires</h3>
                  <p>Lundi au vendredi, de 9h à 18h.</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full">
              <MapFrame />
            </div>

            {/* Social Media */}
            <div className="w-fit mt-6 md:mt-10">
              <h1 className="pl-2 border-l-4 border-secondary font-bold text-2xl md:text-3xl lg:text-4xl text-primary uppercase">
                NOs réseaux sociaux
              </h1>
              <div className="flex justify-between w-fit gap-3 mt-4 md:mt-5">
                <a
                  href="https://www.instagram.com/joyit.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram
                    size={30}
                    className="cursor-pointer hover:text-primary"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/joyit1/"
                  target="_blank"
                  rel="noopener noreferrer"
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
