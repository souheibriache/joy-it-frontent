import { Sandwich, Trophy } from "lucide-react";
import yogaIcon from "../../assets/yoga-icon.svg";
import { Button } from "../ui/button";

type Props = {};

const Services = ({}: Props) => {
  return (
    <div className="flex flex-col items-center gap-20 container mx-auto px-20">
      <h1 className="text-3xl font-bold text-primary">
        Nos services pour votre entreprise !
      </h1>

      <div className="flex flex-row justify-center gap-x-10 h-full">
        <div className="flex flex-col w-full gap-8 items-center  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded rounded-tl-[30px] rounded-br-[30px] py-12 px-8 duration-200 hover:scale-105 hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <div className="bg-primary bg-opacity-15 rounded rounded-br-[20px] p-2 text-primary w-fit">
            <Trophy
              size={50}
              strokeWidth={1.3}
              className="scale-105 -translate-y-2 -translate-x-6"
            />
          </div>

          <h1 className="uppercase text-primary font-semibold text-2xl">
            Partez à l’aventure !
          </h1>
          <div className="flex flex-col gap-2 items-center text-center text-xl">
            <h3>Découvrez les activités de team-building.</h3>
            <h4 className="font-bold">
              Les teams building sont disponible uniquement sur devis.
            </h4>
          </div>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary border-2 border-primary justify-self-end"
          >
            Découvrir
          </Button>
        </div>

        <div className="flex flex-col w-full gap-8 items-center  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded rounded-tl-[30px] rounded-br-[30px] py-12 px-8 hover:scale-105 duration-200  hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <div className="bg-primary bg-opacity-15 rounded rounded-br-[20px] p-2 text-primary w-fit">
            <img
              src={yogaIcon}
              className="scale-105 -translate-y-2 -translate-x-6 h-[50px] w-[50px]"
            />
          </div>

          <h1 className="uppercase text-primary font-semibold text-2xl">
            Détendez vous !
          </h1>
          <div className="flex flex-col gap-2 items-center text-center text-xl">
            <h3>
              Offrez-vous un moment de détente avec nos activités bien-être.
            </h3>
          </div>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary border-2 border-primary justify-self-end mt-auto"
          >
            Découvrir
          </Button>
        </div>

        <div className="flex flex-col w-full gap-8 items-center  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded rounded-tl-[30px] rounded-br-[30px] py-12 px-8 hover:scale-105 duration-200  hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <div className="bg-primary bg-opacity-15 rounded rounded-br-[20px] p-2 text-primary w-fit">
            <Sandwich
              size={50}
              strokeWidth={1.3}
              className="scale-105 -translate-y-2 -translate-x-6"
            />
          </div>

          <h1 className="uppercase text-primary font-semibold text-2xl">
            Nos snacks !
          </h1>
          <div className="flex flex-col gap-2 items-center text-center text-xl">
            <h3>
              Savourez nos snacks sucrés et salés pour des pauses gourmandes et
              conviviales.
            </h3>
          </div>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary border-2 border-primary justify-self-end mt-auto"
          >
            Découvrir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
