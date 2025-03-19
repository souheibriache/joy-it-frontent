import Phone from "../../assets/phone.png";
type Props = {};

const Advertisement = ({}: Props) => {
  return (
    <div className="flex-row w-full bg-gradient-to-tl from-primary from-30% to-white mt-20">
      <div className="container mx-auto flex flex-row items-center justify-between">
        <div className="flex flex-col gap-10 items-center -translate-y-12 scale-110 ml-[100px]">
          <img src={Phone} alt="Phone" className="h-[400px]" />
          <div
            className="w-[80%] h-[35px] rounded-[100%] blur-[10px]"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.31)" }}
          ></div>{" "}
        </div>

        <div className="flex flex-col text-white gap-12 w-1/2">
          <h1
            className="text-4xl uppercase tracking-wide"
            style={{ fontFamily: "Bolota, sans-serif", fontWeight: "bold" }}
          >
            ​Prêt à commencer l'aventure avec Joyit ?​
          </h1>
          <p className="text-xl font-light">
            <span className="font-semibold">En quelques clics,</span> organisez
            des activités pour vos équipes et améliorez leur bien-être au
            travail , Planifiez facilement grâce à notre outil collaboratif.,
            Recevez des feedbacks pour ajuster vos choix. Explorez un catalogue
            d’activités, snacks et ateliers adaptés à vos besoins.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
