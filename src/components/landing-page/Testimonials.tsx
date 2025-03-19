import { useRef } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StarIcon from "../../assets/icons/StarIcon.svg";

type Props = {};

const Testimonials = ({}: Props) => {
  const testimonialsContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (testimonialsContainerRef.current) {
      testimonialsContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (testimonialsContainerRef.current) {
      testimonialsContainerRef.current.scrollBy({
        left: 840,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full mb-20">
      <div className="container mx-auto w-full flex flex-col gap-20 items-center">
        <h1 className="text-4xl text-primary font-bolota font-bold uppercase">
          Ils nous ont fait confiance !
        </h1>

        <div className="flex flex-row gap-20 items-center">
          <Button
            variant="ghost"
            className="rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-10 w-10"
            onClick={scrollLeft}
          >
            <ChevronLeft />
          </Button>

          <div
            ref={testimonialsContainerRef}
            className="flex flex-row gap-[20px] overflow-hidden p-[10px] w-[840px] items-center"
          >
            <div className="flex flex-col gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-[10px] min-w-[400px]">
              <div className="flex flex-row items-center gap-3">
                <div className="flex items-center justify-center h-20 w-20 bg-primary text-white text-4xl font-bold text-center rounded-full">
                  <h1>CD</h1>
                </div>
                <div className="flex flex-col gap-2 text-primary">
                  <h1 className="text-2xl font-semibold">Claire Dubonnet</h1>
                  <h5 className="text-lg font-light">24 octobre 2024</h5>
                </div>
              </div>
              <div className="flex flex-row items-center gap-1">
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
              </div>
              <div className="flex flex-col gap-4">
                <p>
                  "JOY IT a transformé nos initiatives de bien-être. Mes équipes
                  sont plus soudées et motivées.“
                </p>
                <p>Responsable RH</p>
              </div>
            </div>

            <div className="flex flex-col gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-[10px] min-w-[400px]">
              <div className="flex flex-row items-center gap-3">
                <div className="flex items-center justify-center h-20 w-20 bg-primary text-white text-4xl font-bold text-center rounded-full">
                  <h1>TR</h1>
                </div>
                <div className="flex flex-col gap-2 text-primary">
                  <h1 className="text-2xl font-semibold">Thomas Ricotta</h1>
                  <h5 className="text-lg font-light">24 aout 2024</h5>
                </div>
              </div>
              <div className="flex flex-row items-center gap-1">
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
              </div>
              <div className="flex flex-col gap-4">
                <p>
                  "Service professionnel et attentif. Expérience de bien-être en
                  entreprise très appréciée. Je recommande.”
                </p>
                <p>Manager d’équipe</p>
              </div>
            </div>

            {/* Add more testimonials here */}
            <div className="flex flex-col gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 rounded-[10px] min-w-[400px]">
              <div className="flex flex-row items-center gap-3">
                <div className="flex items-center justify-center h-20 w-20 bg-primary text-white text-4xl font-bold text-center rounded-full">
                  <h1>SD</h1>
                </div>
                <div className="flex flex-col gap-2 text-primary">
                  <h1 className="text-2xl font-semibold">Sophie Dubois</h1>
                  <h5 className="text-lg font-light"> 27 Octobre 2024</h5>
                </div>
              </div>
              <div className="flex flex-row items-center gap-1">
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
                <img className="h-4 w-auto" src={StarIcon} alt="" />
              </div>
              <div className="flex flex-col gap-4">
                <p>
                  "Joy It a révolutionné notre bien-être au travail ! Ambiance
                  plus positive, équipe plus soudée. Je recommande vivement !"
                </p>
                <p>Project Manager</p>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            className="rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-10 w-10"
            onClick={scrollRight}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
