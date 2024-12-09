import bike from "../assets/bike.png";
import food from "../assets/food.png";
import { Button } from "./ui/button";
import yogaIcon from "../assets/yoga-icon.svg";
import { Sandwich, Trophy } from "lucide-react";
type Props = {};

const Services = ({}: Props) => {
  return (
    <div className="container mx-auto flex flex-col justify-evenly h-screen items-center">
      <h1 className="text-4xl text-purple font-black">Explorer nos services</h1>
      <div className="flex flex-row w-full gap-20">
        <div className="flex flex-col flex-1 items-center text-center gap-5">
          <div className="relative ">
            <img src={bike} className="h-96 w-96" />
            <Trophy
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              size={75}
            />
          </div>
          <h4 className="text-xl font-semibold text-gray-700">
            Partez à l’aventure !
          </h4>
          <h5 className="text-xl text-gray-600 h-16">
            Découvrez les activités de team-building.
          </h5>
          <Button className="bg-purple hover:bg-purple w-40">Découvrir</Button>
        </div>

        <div className="flex flex-col flex-1 items-center text-center gap-5">
          <div className="relative ">
            <img src={bike} className="h-96 w-96" />
            <img
              src={yogaIcon}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <h4 className="text-xl font-semibold text-gray-700">
            Détendez vous !
          </h4>
          <h5 className="text-xl text-gray-600 h-16">
            Offrez-vous un moment de détente avec nos activités bien-être.
          </h5>
          <Button className="bg-purple hover:bg-purple w-40">Découvrir</Button>
        </div>

        <div className="flex flex-col flex-1 items-center text-center gap-5">
          <div className="relative ">
            <img src={food} className="h-96 w-96" />
            <Sandwich
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              size={75}
            />
          </div>
          <h4 className="text-xl font-semibold text-gray-700">Nos snacks !</h4>
          <h5 className="text-xl text-gray-600 h-16">
            Savourez nos snacks sucrés et salés pour des pauses gourmandes et
            conviviales.
          </h5>
          <Button className="bg-purple hover:bg-purple w-40">Découvrir</Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
