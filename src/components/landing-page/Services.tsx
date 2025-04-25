"use client";

import type React from "react";
import { Sandwich, Trophy } from "lucide-react";
import yogaIcon from "../../assets/yoga-icon.svg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { ActivityType } from "@/types/activity";

type Props = {};

const ServiceCard = ({
  icon,
  title,
  description,
  note = "",
  activityType,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  note?: string;
  activityType?: ActivityType;
}) => {
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    if (activityType) {
      navigate(`/activities?type=${activityType}`);
    } else {
      navigate("/activities");
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 md:gap-8 items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded rounded-tl-[30px] rounded-br-[30px] py-8 md:py-12 px-6 md:px-8 duration-200 hover:scale-[1.02] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] h-full">
      <div className="bg-primary bg-opacity-15 rounded rounded-br-[20px] p-2 text-primary w-fit">
        {icon}
      </div>

      <h1 className="uppercase text-primary font-semibold text-xl md:text-2xl text-center">
        {title}
      </h1>
      <div className="flex flex-col gap-2 items-center text-center text-base md:text-lg lg:text-xl flex-grow">
        <h3>{description}</h3>
        {note && <h4 className="font-bold text-sm md:text-base">{note}</h4>}
      </div>
      <Button
        variant="outline"
        className="text-primary hover:text-white hover:bg-primary border-2 border-primary mt-auto"
        onClick={handleDiscoverClick}
      >
        Découvrir
      </Button>
    </div>
  );
};

const Services = ({}: Props) => {
  return (
    <div className="flex flex-col items-center gap-10 md:gap-16 lg:gap-20 container mx-auto px-4 md:px-8 lg:px-20">
      <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
        Nos services pour votre entreprise !
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full">
        <ServiceCard
          icon={
            <Trophy
              size={50}
              strokeWidth={1.3}
              className="scale-105 -translate-y-2 -translate-x-6"
            />
          }
          title="Partez à l'aventure !"
          description="Découvrez les activités de team-building."
          note="Les teams building sont disponible uniquement sur devis."
          activityType={ActivityType.TEAM_BUILDING}
        />

        <ServiceCard
          icon={
            <img
              src={yogaIcon || "/placeholder.svg"}
              className="scale-105 -translate-y-2 -translate-x-6 h-[50px] w-[50px]"
              alt="Yoga icon"
            />
          }
          title="Détendez vous !"
          description="Offrez-vous un moment de détente avec nos activités bien-être."
          activityType={ActivityType.BIEN_ETRE}
        />

        <ServiceCard
          icon={
            <Sandwich
              size={50}
              strokeWidth={1.3}
              className="scale-105 -translate-y-2 -translate-x-6"
            />
          }
          title="Nos snacks !"
          description="Savourez nos snacks sucrés et salés pour des pauses gourmandes et conviviales."
          activityType={ActivityType.NOURRITURE}
        />
      </div>
    </div>
  );
};

export default Services;
