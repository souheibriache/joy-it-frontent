import Phone from "../../assets/phone.png";

type Props = {};

const Advertisement = ({}: Props) => {
  return (
    <div className="flex-row w-[100vw] bg-gradient-to-tl from-primary from-30% to-white mt-10 md:mt-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-12 md:py-0">
        <div className="flex flex-col gap-6 items-center md:-translate-y-12 md:scale-110 md:ml-0 lg:ml-[50px] xl:ml-[100px] order-2 md:order-1 mt-8 md:mt-0">
          <img
            src={Phone || "/placeholder.svg"}
            alt="Phone"
            className="h-[250px] md:h-[300px] lg:h-[400px]"
          />
          <div
            className="w-[80%] h-[20px] md:h-[35px] rounded-[100%] blur-[10px]"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.31)" }}
          ></div>
        </div>

        <div className="flex flex-col text-white gap-6 md:gap-8 lg:gap-12 w-full md:w-1/2 order-1 md:order-2 text-center md:text-left">
          <h1
            className="text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide"
            style={{ fontFamily: "Bolota, sans-serif", fontWeight: "bold" }}
          >
            ​Prêt à commencer l'aventure avec Joyit ?​
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-light">
            <span className="font-semibold">En quelques clics,</span> organisez
            des activités pour vos équipes et améliorez leur bien-être au
            travail, Planifiez facilement grâce à notre outil collaboratif.
            Recevez des feedbacks pour ajuster vos choix. Explorez un catalogue
            d'activités, snacks et ateliers adaptés à vos besoins.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
