"use client";

import type React from "react";

import { useNavigate } from "react-router-dom";
import { Loader, Mail } from "lucide-react";
import { useState } from "react";
import { useSubmitNewsletter } from "@/utils/api/contact-api";
import logo from "../assets/logo.svg";
import Instagram from "../assets/icons/instagram.png";
import Linkedin from "../assets/icons/linkedin.png";

type Props = {};

const Footer = ({}: Props) => {
  const navigate = useNavigate();
  const [newsLetterEmail, setNewsLetterEmail] = useState("");

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

  // Hook from your API utils
  const { submitNewsletterRequest, isLoading } = useSubmitNewsletter();

  // On form submit, send the newsletter request
  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsLetterEmail) return; // no empty submits

    try {
      await submitNewsletterRequest({ email: newsLetterEmail });
      setNewsLetterEmail(""); // clear on success
    } catch {
      // errors are already toasted in the hook's onError
    }
  };

  return (
    <div className="bg-gray-50 h-fit bottom-0 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between h-full py-10 md:py-16 lg:py-20 gap-8 md:gap-10 px-4">
        {/* Logo */}
        <div className="flex items-center w-full justify-center md:justify-start">
          <img
            src={logo || "/placeholder.svg"}
            className="h-12 md:h-16 lg:h-20"
            alt="Joy-It logo"
          />
        </div>

        {/* Main links & newsletter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 w-full">
          {/* Social */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <h1 className="text-xl md:text-2xl font-bolota text-primary">
                Suivez-nous :
              </h1>
              <div className="h-1 w-20 bg-secondary rounded-full" />
            </div>
            <div className="flex gap-3 mt-3 md:mt-5">
              <a
                href="https://www.instagram.com/joyit.fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={Instagram || "/placeholder.svg"}
                  className="h-6 w-6 md:h-8 md:w-8"
                  alt="Instagram Joy-It"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/joyit1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={Linkedin || "/placeholder.svg"}
                  className="h-6 w-6 md:h-8 md:w-8"
                  alt="LinkedIn Joy-It"
                />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <h1 className="text-xl md:text-2xl font-bolota text-primary">
                Navigations
              </h1>
              <div className="h-1 w-20 bg-secondary rounded-full" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1 md:gap-2">
              {links.map((link, idx) => (
                <div
                  key={idx}
                  className="text-gray-800 hover:underline cursor-pointer text-sm md:text-base"
                  onClick={() => handleNavigate(link.to)}
                >
                  {link.label}
                </div>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <h1 className="text-xl md:text-2xl font-bolota text-primary">
                Contactez-nous
              </h1>
              <div className="h-1 w-20 bg-secondary rounded-full" />
            </div>
            <div className="flex flex-col items-center sm:items-start gap-1 md:gap-2 text-sm md:text-base">
              <p className="text-gray-800">1 rue de la fontaine, 75010 Paris</p>
              <p className="text-gray-800">contact@joyit.com</p>
              <p className="text-gray-800">06 32 45 78 21</p>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="flex flex-col items-center sm:items-start gap-2 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <h1 className="text-xl md:text-2xl font-bolota text-primary text-center sm:text-left">
                Abonnez-vous à notre newsletter
              </h1>
              <div className="h-1 w-20 bg-secondary rounded-full" />
            </div>
            <p className="text-gray-800 text-sm md:text-base text-center sm:text-left">
              Abonnez-vous pour recevoir toutes les exclusivités de JoyIt.
            </p>

            <form
              className="flex items-center gap-2 p-2 px-3 bg-[#D9D9D9] rounded-[5px] w-full max-w-[300px]"
              onSubmit={handleNewsletter}
            >
              <input
                type="email"
                placeholder="Email"
                value={newsLetterEmail}
                onChange={(e) => setNewsLetterEmail(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none pl-1 text-sm"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-1"
                aria-label="S'abonner"
              >
                {isLoading ? (
                  <Loader className="animate-spin h-4 w-4" />
                ) : (
                  <Mail className="h-4 w-4 md:h-5 md:w-5" />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between w-full text-primary font-bolota text-sm md:text-base lg:text-lg gap-6 md:gap-0 items-center md:items-start">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center md:items-start">
            <span className="underline cursor-pointer">Mentions légales</span>
            <span className="underline cursor-pointer">
              Politique de confidentialité
            </span>
            <span className="underline cursor-pointer">
              Conditions générales d'utilisation
            </span>
          </div>
          <div className="flex flex-col items-center md:items-end text-center md:text-end">
            <p>"JoyIt, le bien-être de vos équipes à portée de clic."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
