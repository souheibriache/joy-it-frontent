import Time from "../../assets/pourquoi-nous-choisir/time.png";
import Board from "../../assets/pourquoi-nous-choisir/board.png";
import Check from "../../assets/pourquoi-nous-choisir/check.png";
import Credit from "../../assets/pourquoi-nous-choisir/credit.png";

type Props = {};

const BenefitItem = ({ icon, text }: { icon: string; text: string }) => (
  <li className="flex flex-row gap-3 items-start md:items-center">
    <img
      src={icon || "/placeholder.svg"}
      alt=""
      className="w-8 md:w-10 h-auto mt-1 md:mt-0"
    />
    <p className="text-base md:text-lg lg:text-xl">{text}</p>
  </li>
);

const PourquoiChoisir = ({}: Props) => {
  return (
    <div className="bg-gradient-to-t from-[#30867D] to-primary w-full text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between w-full py-12 md:py-16 lg:py-20 gap-10 md:gap-16 lg:gap-20 px-4">
        <div className="flex flex-col gap-4 md:gap-5 justify-center flex-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase font-bold font-bolota text-center md:text-left">
            Pourquoi nous choisir ?
          </h1>
          <p className="text-base md:text-lg lg:text-xl -tracking-tighter text-center md:text-left">
            Chez <span className="font-semibold">JOY IT</span>, nous simplifions
            l'organisation de vos initiatives de bien-être au travail grâce à
            notre plateforme intuitive et flexible. Nous avons conçu une
            solution pensée pour motiver vos équipes et booster leur
            productivité au quotidien.
          </p>
        </div>

        <ul className="flex-1 flex flex-col gap-6 md:gap-8 lg:gap-10 text-lg">
          <BenefitItem
            icon={Check}
            text="Simplification de l'organisation des activités."
          />
          <BenefitItem
            icon={Board}
            text="Catalogue varié d'activités engageantes."
          />
          <BenefitItem
            icon={Credit}
            text="Renforcement de la cohésion et de la motivation des équipes."
          />
          <BenefitItem
            icon={Time}
            text="Gain de temps grâce à une plateforme intuitive."
          />
        </ul>
      </div>
    </div>
  );
};

export default PourquoiChoisir;
