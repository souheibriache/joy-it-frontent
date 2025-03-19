import Landing from "../../assets/landing.svg";
import { Button } from "../ui/button";

type Props = {};

const Hero = ({}: Props) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[url(/src/assets/landingpage_background.png)] bg-cover bg-center`}
    >
      <div className="flex flex-row gap-20 p-20 items-center container mx-auto">
        <div className="flex-1 flex flex-col items-start gap-5 py-20 justify-between h-[50vh] pr-40">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-bold font-bolota tracking-wide text-white uppercase">
              Rejoignez Joyit et transformez le bien-être de votre entreprise !
            </h1>
            <p className="text-xl text-white text-justify">
              Accédez à des services exclusifs de team building, bien-être et
              snacking pour renforcer la cohésion et la santé de vos équipes.
              Rejoignez-nous dès aujourd'hui !
            </p>
          </div>
          <Button className="bg-white text-primary hover:bg-secondary">
            Découvrir nos offres
          </Button>
        </div>
        <img className="h-[50vh] w-auto" src={Landing} />
      </div>
    </div>
  );
};

export default Hero;
