import Landing from "../../assets/landing.svg";
import { Button } from "../ui/button";

type Props = {};

const Hero = ({}: Props) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[url(/src/assets/landingpage_background.png)] bg-cover bg-center`}
    >
      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 lg:gap-20 py-10 px-4 md:p-12 lg:p-20 items-center container mx-auto">
        <div className="flex-1 flex flex-col items-center md:items-start gap-5 py-6 md:py-10 lg:py-20 justify-between md:pr-0 lg:pr-10 xl:pr-40 text-center md:text-left">
          <div className="flex flex-col gap-4 md:gap-5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-bolota tracking-wide text-white uppercase">
              Rejoignez Joyit et transformez le bien-être de votre entreprise !
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white">
              Accédez à des services exclusifs de team building, bien-être et
              snacking pour renforcer la cohésion et la santé de vos équipes.
              Rejoignez-nous dès aujourd'hui !
            </p>
          </div>
          <Button className="bg-white text-primary hover:bg-secondary mt-4 md:mt-0">
            Découvrir nos offres
          </Button>
        </div>
        <img
          className="w-full max-w-[280px] md:max-w-none md:w-auto md:h-[40vh] lg:h-[50vh]"
          src={Landing || "/placeholder.svg"}
          alt="Joyit platform illustration"
        />
      </div>
    </div>
  );
};

export default Hero;
