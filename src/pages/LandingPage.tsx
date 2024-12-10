import { Button } from "@/components/ui/button";
import sophie from "../assets/people/Group 1063.png";
import thomas from "../assets/people/Rectangle 3097.png";
import foodCircle from "../assets/food-circle.png";
type Props = {};

const LandingPage = ({}: Props) => {
  return (
    <div className="flex flex-row container mx-auto h-[calc(100vh-100px)] w-full  overflow-hidden relative">
      <div className="flex-1 flex flex-col items-center gap-5 p-32 px-40 pt-52 ">
        <h1 className="text-4xl font-bold text-gray-900 text-justify ">
          Boostez le bien-être et la cohésion de vos équipes avec JoyIt !
        </h1>
        <p className="text-lg  text-gray-900 text-justify">
          Simplifiez l'organisation d'activités qui boostent le bien-être et la
          cohésion de vos équipes. Avec JoyIt, découvrez des solutions adaptées
          à vos besoins, gérées en toute simplicité grâce à une plateforme
          intuitive et un système de crédits flexible.
        </p>
        <Button
          variant="outline"
          className="border-purple border-2 text-purple font-semibold hover:text-secondarypurple hover:border-secondarypurple"
        >
          Découvrir nos activités
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center gap-32 p-32 pt-52">
        <div className="flex flex-col  p-8 pl-20 gap-2 rounded-[40px] bg-lightred bg-opacity-50 relative translate-x-20">
          <h1 className="text-xl font-bold">Thomas, Manager</h1>
          <p>" Des activités variées et un vrai gain de temps ! "</p>
          <div className="absolute top-0 left-0 -translate-y-20 -translate-x-24">
            <div className="relative z-10">
              <img
                src={thomas}
                alt="Thomas"
                className="w-36 rounded-full z-10 relative" /* Make image inside the border */
              />
              <div className="absolute inset-0 border border-black translate-x-5 translate-y-3 rounded-full z-0"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-8  pr-20 gap-2 rounded-[40px] bg-lightred bg-opacity-50 relative -translate-x-20 ">
          <h1 className="text-xl font-bold">Sophie, RH</h1>
          <p>“Simple, rapide et efficace. Les équipes adorent ! “</p>
          <div className="absolute top-0 right-0 -translate-y-20 translate-x-24">
            <div className="relative z-10">
              <img
                src={sophie}
                alt="Thomas"
                className="w-36 rounded-full z-10 relative" /* Make image inside the border */
              />
              <div className="absolute inset-0 border border-black translate-x-5 translate-y-3 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={foodCircle}
        className="absolute bottom-0 translate-y-1/2 mx-auto left-1/2 -translate-x-1/2 w-96"
      />
    </div>
  );
};

export default LandingPage;
