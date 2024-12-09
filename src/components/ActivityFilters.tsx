import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

type Props = {};

const ActivityFilters = ({}: Props) => {
  return (
    <div className="container mx-auto w-full h-full bg-white border border-gray-200 rounded-2xl -translate-y-1/4 shadow-2xl flex flex-col justify-between p-10 px-20">
      <h1 className="text-2xl font-bold text-purple">
        Pour vos teams bulding !
      </h1>
      <div className="flex flex-row flex-nowrap items-center justify-between">
        <div className="flex-col flex gap-5">
          <h2 className="text-xl font-semibold text-purple">Type d’activité</h2>
          <div className="flex flex-row gap-2 text-gray-600">
            <p className="">Choix possible</p>
            <ChevronDown />
          </div>
        </div>

        <div className="h-full w-0.5 bg-gray-500 rounded-lg"></div>

        <div className="flex-col flex gap-5">
          <h2 className="text-xl font-semibold text-purple">Type d’activité</h2>
          <div className="flex flex-row gap-2 text-gray-600">
            <p className="">Choix possible</p>
            <ChevronDown />
          </div>
        </div>

        <div className="h-full w-0.5 bg-gray-500 rounded-lg"></div>

        <div className="flex-col flex gap-5">
          <h2 className="text-xl font-semibold text-purple">Type d’activité</h2>
          <div className="flex flex-row gap-2 text-gray-600">
            <p className="">Choix possible</p>
            <ChevronDown />
          </div>
        </div>

        <div className="h-full w-0.5 bg-gray-500 rounded-lg"></div>

        <div className="flex-col flex gap-5">
          <h2 className="text-xl font-semibold text-purple">Type d’activité</h2>
          <div className="flex flex-row gap-2 text-gray-600">
            <p className="">Choix possible</p>
            <ChevronDown />
          </div>
        </div>

        <Button className="bg-purple hover:bg-secondarypurple text-lg font-semibold px-10 py-5">
          Envoyer
        </Button>
      </div>
    </div>
  );
};

export default ActivityFilters;
