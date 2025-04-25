import decathlon from "../../assets/partenaires/decathlon.png";
import foodles from "../../assets/partenaires/foodles.png";
import lesvergers from "../../assets/partenaires/lesvergers.png";
import kee from "../../assets/partenaires/kee.png";
import keizio from "../../assets/partenaires/keizio.png";

type Props = {};

const Partenaires = ({}: Props) => {
  const partners = [
    { img: decathlon, alt: "Decathlon" },
    { img: foodles, alt: "Foodles" },
    { img: lesvergers, alt: "lesvergers" },
    { img: kee, alt: "Kee" },
    { img: keizio, alt: "Keizio" },
  ];

  return (
    <div className="py-16 md:py-24 lg:py-32 flex items-center content-center w-full px-4">
      <div className="flex flex-col justify-center items-center container mx-auto gap-10 md:gap-16 lg:gap-20">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-center">
          Nos partenaires de qualité
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12 w-full mx-auto">
          {partners.map((partner, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={partner.img || "/placeholder.svg"}
                alt={partner.alt}
                className="h-8 sm:h-10 md:h-12 w-auto grayscale hover:grayscale-0 duration-200 hover:scale-105 self-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partenaires;
