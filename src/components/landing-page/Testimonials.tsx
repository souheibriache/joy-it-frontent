"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StarIcon from "../../assets/icons/StarIcon.svg";

type Props = {};

type TestimonialProps = {
  initials: string;
  name: string;
  date: string;
  text: string;
  role: string;
};

const TestimonialCard = ({
  initials,
  name,
  date,
  text,
  role,
}: TestimonialProps) => (
  <div className="flex flex-col gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6 md:p-10 rounded-[10px] min-w-[280px] sm:min-w-[320px] md:min-w-[400px] h-full">
    <div className="flex flex-row items-center gap-3">
      <div className="flex items-center justify-center h-14 w-14 md:h-20 md:w-20 bg-primary text-white text-2xl md:text-4xl font-bold text-center rounded-full">
        <h1>{initials}</h1>
      </div>
      <div className="flex flex-col gap-1 md:gap-2 text-primary">
        <h1 className="text-lg md:text-2xl font-semibold">{name}</h1>
        <h5 className="text-sm md:text-lg font-light">{date}</h5>
      </div>
    </div>
    <div className="flex flex-row items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <img
          key={i}
          className="h-3 md:h-4 w-auto"
          src={StarIcon || "/placeholder.svg"}
          alt="Star"
        />
      ))}
    </div>
    <div className="flex flex-col gap-3 md:gap-4">
      <p className="text-sm md:text-base">{text}</p>
      <p className="text-sm md:text-base">{role}</p>
    </div>
  </div>
);

const Testimonials = ({}: Props) => {
  const testimonialsContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [scrollAmount, setScrollAmount] = useState(320);

  // Update scroll amount based on screen size
  useEffect(() => {
    const updateScrollAmount = () => {
      if (window.innerWidth < 640) {
        setScrollAmount(280);
      } else if (window.innerWidth < 768) {
        setScrollAmount(320);
      } else {
        setScrollAmount(420);
      }
    };

    updateScrollAmount();
    window.addEventListener("resize", updateScrollAmount);
    return () => window.removeEventListener("resize", updateScrollAmount);
  }, []);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (!testimonialsContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } =
      testimonialsContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = testimonialsContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      // Initial check
      checkScrollPosition();
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const scrollLeft = () => {
    if (testimonialsContainerRef.current) {
      testimonialsContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (testimonialsContainerRef.current) {
      testimonialsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const testimonials = [
    {
      initials: "CD",
      name: "Claire Dubonnet",
      date: "24 octobre 2024",
      text: '"JOY IT a transformé nos initiatives de bien-être. Mes équipes sont plus soudées et motivées."',
      role: "Responsable RH",
    },
    {
      initials: "TR",
      name: "Thomas Ricotta",
      date: "24 aout 2024",
      text: '"Service professionnel et attentif. Expérience de bien-être en entreprise très appréciée. Je recommande."',
      role: "Manager d'équipe",
    },
    {
      initials: "SD",
      name: "Sophie Dubois",
      date: "27 Octobre 2024",
      text: '"Joy It a révolutionné notre bien-être au travail ! Ambiance plus positive, équipe plus soudée. Je recommande vivement !"',
      role: "Project Manager",
    },
  ];

  return (
    <div className="w-full mb-10 md:mb-20 px-4">
      <div className="container mx-auto w-full flex flex-col gap-10 md:gap-16 lg:gap-20 items-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-primary font-bolota font-bold uppercase text-center">
          Ils nous ont fait confiance !
        </h1>

        <div className="flex flex-row gap-4 md:gap-6 lg:gap-8 items-center w-full">
          {showLeftArrow && (
            <Button
              variant="ghost"
              className="rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-8 w-8 md:h-10 md:w-10 flex-shrink-0"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          )}

          <div
            ref={testimonialsContainerRef}
            className="flex flex-row gap-4 md:gap-[20px] overflow-x-auto p-2 md:p-[10px] w-full scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          {showRightArrow && (
            <Button
              variant="ghost"
              className="rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-8 w-8 md:h-10 md:w-10 flex-shrink-0"
              onClick={scrollRight}
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
