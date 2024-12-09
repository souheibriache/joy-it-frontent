import Hero1 from "../assets/hero1.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
type Props = {};

const Hero = ({}: Props) => {
  return (
    <div className="h-[calc(100vh-100px)] w-full self-center flex flex-col items-center justify-center p-40 container mx-auto">
      <div className="relative flex flex-col items-center justify-center w-full  rounded-3xl overflow-hidden ">
        <img src={Hero1} alt="" className="h-full w-auto rounded-3xl" />
        <div className="absolute h-full w-full bg-black bg-opacity-50 flex items-center justify-between p-20">
          <button className="bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center hover:scale-105 duration-200">
            <ChevronLeft />
          </button>
          <div className="flex flex-col gap-20 w-1/2 items-center">
            <h1 className="text-center text-white text-2xl font-bold  ">
              Transformez le bien-être de vos collaborateurs avec une solution
              sur mesure !
            </h1>

            <Button className="bg-purple hover:bg-secondarypurple w-1/2 font-semibold">
              Découvrir nos offres
            </Button>
          </div>
          <button className="bg-gray-50 rounded-full h-10 w-10 flex items-center justify-center hover:scale-105 duration-200">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
